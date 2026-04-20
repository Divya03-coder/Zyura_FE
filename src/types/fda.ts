// TypeScript type definitions for FDA API responses

// OpenFDA common fields
export interface OpenFDA {
    brand_name?: string[];
    generic_name?: string[];
    manufacturer_name?: string[];
    product_type?: string[];
    route?: string[];
    substance_name?: string[];
    product_ndc?: string[];
    application_number?: string[];
    spl_id?: string[];
    rxcui?: string[];
    pharm_class_epc?: string[];
    pharm_class_moa?: string[];
}

// Drug Label API Response
export interface DrugLabel {
    id?: string;
    set_id?: string;
    effective_time?: string;
    version?: string;

    // OpenFDA fields
    openfda?: OpenFDA;

    // Label sections
    indications_and_usage?: string[];
    dosage_and_administration?: string[];
    dosage_forms_and_strengths?: string[];
    contraindications?: string[];
    warnings_and_cautions?: string[];
    warnings_and_precautions?: string[];
    adverse_reactions?: string[];
    drug_interactions?: string[];
    use_in_specific_populations?: string[];
    pregnancy?: string[];
    pediatric_use?: string[];
    geriatric_use?: string[];
    overdosage?: string[];
    description?: string[];
    clinical_pharmacology?: string[];
    mechanism_of_action?: string[];
    pharmacodynamics?: string[];
    pharmacokinetics?: string[];
    nonclinical_toxicology?: string[];

    // Warnings
    boxed_warning?: string[];
    warnings?: string[];
    precautions?: string[];

    // Additional info
    information_for_patients?: string[];
    how_supplied?: string[];
    storage_and_handling?: string[];
    package_label_principal_display_panel?: string[];
}

export interface DrugLabelResponse {
    meta?: {
        disclaimer?: string;
        terms?: string;
        license?: string;
        last_updated?: string;
        results?: {
            skip: number;
            limit: number;
            total: number;
        };
    };
    results?: DrugLabel[];
}

// Adverse Events API Response
export interface Patient {
    patientonsetage?: string;
    patientonsetageunit?: string;
    patientsex?: string;
    patientweight?: string;
    drug?: PatientDrug[];
    reaction?: PatientReaction[];
}

export interface PatientDrug {
    medicinalproduct?: string;
    drugcharacterization?: string;
    drugindication?: string;
    actiondrug?: string;
    drugstartdate?: string;
    drugenddate?: string;
    openfda?: OpenFDA;
}

export interface PatientReaction {
    reactionmeddrapt?: string;
    reactionoutcome?: string;
}

export interface AdverseEvent {
    safetyreportid?: string;
    receivedate?: string;
    receiptdate?: string;
    serious?: string;
    seriousnessdeath?: string;
    seriousnesshospitalization?: string;
    seriousnesslifethreatening?: string;
    seriousnessdisabling?: string;
    transmissiondate?: string;
    patient?: Patient;
    sender?: {
        senderorganization?: string;
    };
    primarysource?: {
        qualification?: string;
        reportercountry?: string;
    };
}

export interface AdverseEventResponse {
    meta?: {
        disclaimer?: string;
        terms?: string;
        license?: string;
        last_updated?: string;
        results?: {
            skip: number;
            limit: number;
            total: number;
        };
    };
    results?: AdverseEvent[];
}

// Drug Recall/Enforcement API Response
export interface DrugRecall {
    country?: string;
    city?: string;
    state?: string;
    reason_for_recall?: string;
    status?: string;
    distribution_pattern?: string;
    product_quantity?: string;
    recall_initiation_date?: string;
    classification?: string;
    openfda?: OpenFDA;
    product_description?: string;
    code_info?: string;
    voluntary_mandated?: string;
    initial_firm_notification?: string;
    recall_number?: string;
    product_type?: string;
    event_id?: string;
    recalling_firm?: string;
    report_date?: string;
    termination_date?: string;
}

export interface DrugRecallResponse {
    meta?: {
        disclaimer?: string;
        terms?: string;
        license?: string;
        last_updated?: string;
        results?: {
            skip: number;
            limit: number;
            total: number;
        };
    };
    results?: DrugRecall[];
}

// NDC Directory API Response
export interface NDCProduct {
    product_ndc?: string;
    generic_name?: string;
    labeler_name?: string;
    brand_name?: string;
    active_ingredients?: Array<{
        name: string;
        strength: string;
    }>;
    finished?: boolean;
    packaging?: Array<{
        package_ndc: string;
        description: string;
        marketing_start_date?: string;
        marketing_end_date?: string;
        sample?: boolean;
    }>;
    listing_expiration_date?: string;
    openfda?: OpenFDA;
    marketing_category?: string;
    dosage_form?: string;
    spl_id?: string;
    product_type?: string;
    route?: string[];
    marketing_start_date?: string;
    marketing_end_date?: string;
    product_id?: string;
    application_number?: string;
    brand_name_base?: string;
    pharm_class?: string[];
}

export interface NDCResponse {
    meta?: {
        disclaimer?: string;
        terms?: string;
        license?: string;
        last_updated?: string;
        results?: {
            skip: number;
            limit: number;
            total: number;
        };
    };
    results?: NDCProduct[];
}

// Aggregated data types for display
export interface AdverseEventStats {
    totalReports: number;
    commonReactions: Array<{
        reaction: string;
        count: number;
    }>;
    ageDistribution: {
        pediatric: number;
        adult: number;
        elderly: number;
    };
    genderDistribution: {
        male: number;
        female: number;
        unknown: number;
    };
    seriousOutcomes: {
        death: number;
        hospitalization: number;
        lifeThreatening: number;
        disability: number;
    };
}

export interface RecallSummary {
    activeRecalls: number;
    classI: number;
    classII: number;
    classIII: number;
    recentRecalls: DrugRecall[];
}
