import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import SearchBar from '@/components/drug-card/SearchBar';
import DrugDetails from '@/components/drug-card/DrugDetails';
import SavedAndRecent from '@/components/drug-card/SavedAndRecent';
import { DrugLabel } from '@/types/fda';

export default function DrugSearchCard() {
  const [selectedDrug, setSelectedDrug] = useState<DrugLabel | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<DrugLabel[]>([]);
  const [savedDrugs, setSavedDrugs] = useState<DrugLabel[]>([]);

  useEffect(() => {
    // Load from localStorage
    const recent = localStorage.getItem('recentlyViewed');
    const saved = localStorage.getItem('savedDrugs');

    if (recent) {
      setRecentlyViewed(JSON.parse(recent));
      setHasSearched(true);
    }
    if (saved) {
      setSavedDrugs(JSON.parse(saved));
    }
  }, []);

  const handleDrugSelect = (drug: DrugLabel) => {
    setSelectedDrug(drug);

    // Add to recently viewed (max 10 items)
    const updated = [
      drug,
      ...recentlyViewed.filter(d => d.id !== drug.id)
    ].slice(0, 10);

    setRecentlyViewed(updated);
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
    setHasSearched(true);
  };

  const handleSaveDrug = (drug: DrugLabel) => {
    const isAlreadySaved = savedDrugs.some(d => d.id === drug.id);

    let updated;
    if (isAlreadySaved) {
      updated = savedDrugs.filter(d => d.id !== drug.id);
    } else {
      updated = [drug, ...savedDrugs];
    }

    setSavedDrugs(updated);
    localStorage.setItem('savedDrugs', JSON.stringify(updated));
  };

  const isSaved = (drugId?: string): boolean => {
    if (!drugId) return false;
    return savedDrugs.some(d => d.id === drugId);
  };

  const handleBackToHome = () => {
    setSelectedDrug(null);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Drug Search</h1>
              <p className="text-gray-500 mt-1">Search comprehensive FDA drug database for medical information</p>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-blue-700 text-sm font-medium">FDA Live Database</span>
            </div>
          </div>

          {/* Search Bar Container */}
          <div className="max-w-3xl">
            <SearchBar onDrugSelect={handleDrugSelect} />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {selectedDrug ? (
          <DrugDetails
            drug={selectedDrug}
            onBack={handleBackToHome}
            onSave={handleSaveDrug}
            isSaved={isSaved(selectedDrug.id)}
          />
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {!hasSearched ? (
              <div className="text-center py-24 bg-white rounded-3xl border border-gray-200 shadow-sm">
                <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Ready to search?
                </h2>
                <p className="text-gray-500 max-w-md mx-auto px-6">
                  Enter a brand name, generic name, or manufacturer to view detailed clinical data, safety warnings, and adverse reactions.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">e.g. Tylenol</span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">e.g. Advil</span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">e.g. Aspirin</span>
                </div>
              </div>
            ) : (
              <SavedAndRecent
                recentlyViewed={recentlyViewed}
                savedDrugs={savedDrugs}
                onDrugSelect={handleDrugSelect}
                onRemoveSaved={(drug) => handleSaveDrug(drug)}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
