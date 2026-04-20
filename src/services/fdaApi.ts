import {
    DrugLabelResponse,
    AdverseEventResponse,
    DrugRecallResponse,
    NDCResponse,
    AdverseEventStats,
    RecallSummary,
    DrugLabel,
    AdverseEvent
} from '../types/fda';

const FDA_API_BASE = 'https://api.fda.gov';

// Simple in-memory cache with expiration
interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

class SimpleCache {
    private cache = new Map<string, CacheEntry<any>>();
    private readonly TTL = 5 * 60 * 1000; // 5 minutes

    get<T>(key: string): T | null {
        const entry = this.cache.get(key);
        if (!entry) return null;

        if (Date.now() - entry.timestamp > this.TTL) {
            this.cache.delete(key);
            return null;
        }

        return entry.data;
    }

    set<T>(key: string, data: T): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    clear(): void {
        this.cache.clear();
    }
}

const cache = new SimpleCache();

// Rate limiting tracker
let requestCount = 0;
let windowStart = Date.now();

function checkRateLimit(): void {
    const now = Date.now();
    const elapsed = now - windowStart;

    // Reset counter every minute
    if (elapsed >= 60000) {
        requestCount = 0;
        windowStart = now;
    }

    // FDA allows 240 requests per minute for unauthenticated requests
    if (requestCount >= 200) { // Keep a buffer
        console.warn('Approaching FDA API rate limit. Consider implementing request queuing.');
    }

    requestCount++;
}

// Generic API fetch with error handling
async function fetchFDA<T>(url: string, cacheKey?: string): Promise<T | null> {
    // Check cache first
    if (cacheKey) {
        const cached = cache.get<T>(cacheKey);
        if (cached) {
            return cached;
        }
    }

    checkRateLimit();

    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                return null; // No data found
            }
            throw new Error(`FDA API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json() as T;

        // Cache the result
        if (cacheKey) {
            cache.set(cacheKey, data);
        }

        return data;
    } catch (error) {
        console.error('FDA API fetch error:', error);
        throw error;
    }
}

/**
 * Search for drug labels by name
 * Searches across brand name, generic name, and substance name
 */
export async function searchDrugLabels(query: string, limit: number = 10): Promise<DrugLabelResponse | null> {
    if (!query || query.length < 2) {
        return null;
    }

    const searchQuery = encodeURIComponent(query);
    const cacheKey = `labels:${query}:${limit}`;

    try {
        // Try comprehensive search first
        const url = `${FDA_API_BASE}/drug/label.json?search=openfda.brand_name:"${searchQuery}"+openfda.generic_name:"${searchQuery}"+openfda.substance_name:"${searchQuery}"&limit=${limit}`;
        return await fetchFDA<DrugLabelResponse>(url, cacheKey);
    } catch (error) {
        // Fallback to simpler search
        try {
            const fallbackUrl = `${FDA_API_BASE}/drug/label.json?search=${searchQuery}&limit=${limit}`;
            return await fetchFDA<DrugLabelResponse>(fallbackUrl, cacheKey);
        } catch (fallbackError) {
            console.error('Both drug label searches failed:', fallbackError);
            return null;
        }
    }
}

/**
 * Get drug label by specific ID
 */
export async function getDrugLabelById(id: string): Promise<DrugLabel | null> {
    const cacheKey = `label:${id}`;

    try {
        const url = `${FDA_API_BASE}/drug/label.json?search=id:"${encodeURIComponent(id)}"&limit=1`;
        const response = await fetchFDA<DrugLabelResponse>(url, cacheKey);
        return response?.results?.[0] || null;
    } catch (error) {
        console.error('Error fetching drug label by ID:', error);
        return null;
    }
}

/**
 * Get adverse events for a drug
 * Returns aggregated statistics about reported adverse events
 */
export async function getDrugAdverseEvents(drugName: string, limit: number = 100): Promise<AdverseEventResponse | null> {
    if (!drugName || drugName.length < 2) {
        return null;
    }

    const searchQuery = encodeURIComponent(drugName);
    const cacheKey = `adverse:${drugName}:${limit}`;

    try {
        const url = `${FDA_API_BASE}/drug/event.json?search=patient.drug.medicinalproduct:"${searchQuery}"&limit=${limit}`;
        return await fetchFDA<AdverseEventResponse>(url, cacheKey);
    } catch (error) {
        console.error('Error fetching adverse events:', error);
        return null;
    }
}

/**
 * Process adverse events into displayable statistics
 */
export function processAdverseEvents(response: AdverseEventResponse | null): AdverseEventStats {
    const stats: AdverseEventStats = {
        totalReports: 0,
        commonReactions: [],
        ageDistribution: { pediatric: 0, adult: 0, elderly: 0 },
        genderDistribution: { male: 0, female: 0, unknown: 0 },
        seriousOutcomes: { death: 0, hospitalization: 0, lifeThreatening: 0, disability: 0 }
    };

    if (!response?.results?.length) {
        return stats;
    }

    stats.totalReports = response.meta?.results?.total || response.results.length;

    const reactionCounts = new Map<string, number>();

    response.results.forEach((event: AdverseEvent) => {
        // Count reactions
        event.patient?.reaction?.forEach(reaction => {
            if (reaction.reactionmeddrapt) {
                const count = reactionCounts.get(reaction.reactionmeddrapt) || 0;
                reactionCounts.set(reaction.reactionmeddrapt, count + 1);
            }
        });

        // Age distribution
        const age = parseInt(event.patient?.patientonsetage || '0');
        if (age > 0) {
            if (age < 18) stats.ageDistribution.pediatric++;
            else if (age < 65) stats.ageDistribution.adult++;
            else stats.ageDistribution.elderly++;
        }

        // Gender distribution
        const sex = event.patient?.patientsex;
        if (sex === '1') stats.genderDistribution.male++;
        else if (sex === '2') stats.genderDistribution.female++;
        else stats.genderDistribution.unknown++;

        // Serious outcomes
        if (event.seriousnessdeath === '1') stats.seriousOutcomes.death++;
        if (event.seriousnesshospitalization === '1') stats.seriousOutcomes.hospitalization++;
        if (event.seriousnesslifethreatening === '1') stats.seriousOutcomes.lifeThreatening++;
        if (event.seriousnessdisabling === '1') stats.seriousOutcomes.disability++;
    });

    // Get top 10 reactions
    stats.commonReactions = Array.from(reactionCounts.entries())
        .map(([reaction, count]) => ({ reaction, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    return stats;
}

/**
 * Get drug recalls and enforcement actions
 */
export async function getDrugRecalls(drugName: string, limit: number = 50): Promise<DrugRecallResponse | null> {
    if (!drugName || drugName.length < 2) {
        return null;
    }

    const searchQuery = encodeURIComponent(drugName);
    const cacheKey = `recalls:${drugName}:${limit}`;

    try {
        // Search in product description and openfda fields
        const url = `${FDA_API_BASE}/drug/enforcement.json?search=product_description:"${searchQuery}"+openfda.brand_name:"${searchQuery}"+openfda.generic_name:"${searchQuery}"&limit=${limit}`;
        return await fetchFDA<DrugRecallResponse>(url, cacheKey);
    } catch (error) {
        console.error('Error fetching drug recalls:', error);
        return null;
    }
}

/**
 * Process recalls into summary statistics
 */
export function processRecalls(response: DrugRecallResponse | null): RecallSummary {
    const summary: RecallSummary = {
        activeRecalls: 0,
        classI: 0,
        classII: 0,
        classIII: 0,
        recentRecalls: []
    };

    if (!response?.results?.length) {
        return summary;
    }

    response.results.forEach(recall => {
        // Count active recalls (no termination date or status is ongoing)
        if (!recall.termination_date || recall.status === 'Ongoing') {
            summary.activeRecalls++;
        }

        // Count by classification
        if (recall.classification === 'Class I') summary.classI++;
        else if (recall.classification === 'Class II') summary.classII++;
        else if (recall.classification === 'Class III') summary.classIII++;
    });

    // Get most recent recalls
    summary.recentRecalls = response.results
        .sort((a, b) => {
            const dateA = a.recall_initiation_date || '';
            const dateB = b.recall_initiation_date || '';
            return dateB.localeCompare(dateA);
        })
        .slice(0, 5);

    return summary;
}

/**
 * Get NDC (National Drug Code) information
 */
export async function getNDCInfo(productNDC: string): Promise<NDCResponse | null> {
    if (!productNDC) {
        return null;
    }

    const cacheKey = `ndc:${productNDC}`;

    try {
        const url = `${FDA_API_BASE}/drug/ndc.json?search=product_ndc:"${encodeURIComponent(productNDC)}"&limit=1`;
        return await fetchFDA<NDCResponse>(url, cacheKey);
    } catch (error) {
        console.error('Error fetching NDC info:', error);
        return null;
    }
}

/**
 * Search NDC by drug name
 */
export async function searchNDCByName(drugName: string, limit: number = 10): Promise<NDCResponse | null> {
    if (!drugName || drugName.length < 2) {
        return null;
    }

    const searchQuery = encodeURIComponent(drugName);
    const cacheKey = `ndc-search:${drugName}:${limit}`;

    try {
        const url = `${FDA_API_BASE}/drug/ndc.json?search=brand_name:"${searchQuery}"+generic_name:"${searchQuery}"&limit=${limit}`;
        return await fetchFDA<NDCResponse>(url, cacheKey);
    } catch (error) {
        console.error('Error searching NDC:', error);
        return null;
    }
}

/**
 * Clear the cache (useful for testing or manual refresh)
 */
export function clearCache(): void {
    cache.clear();
}

/**
 * Get comprehensive drug information from multiple endpoints
 */
export async function getComprehensiveDrugInfo(drugName: string, brandName?: string) {
    const searchName = brandName || drugName;

    const [labels, adverseEvents, recalls, ndcInfo] = await Promise.allSettled([
        searchDrugLabels(searchName, 1),
        getDrugAdverseEvents(searchName, 100),
        getDrugRecalls(searchName, 50),
        searchNDCByName(searchName, 10)
    ]);

    return {
        label: labels.status === 'fulfilled' ? labels.value?.results?.[0] : null,
        adverseEvents: adverseEvents.status === 'fulfilled' ? adverseEvents.value : null,
        adverseStats: adverseEvents.status === 'fulfilled'
            ? processAdverseEvents(adverseEvents.value)
            : null,
        recalls: recalls.status === 'fulfilled' ? recalls.value : null,
        recallSummary: recalls.status === 'fulfilled'
            ? processRecalls(recalls.value)
            : null,
        ndc: ndcInfo.status === 'fulfilled' ? ndcInfo.value : null
    };
}
