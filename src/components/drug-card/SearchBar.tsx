import { useState, useEffect, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import DrugImage from './DrugImage';
import { searchDrugLabels } from '../../services/fdaApi';
import { DrugLabel } from '../../types/fda';

interface SearchBarProps {
  onDrugSelect: (drug: DrugLabel) => void;
}

export default function SearchBar({ onDrugSelect }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<DrugLabel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchDrugs = async () => {
      if (searchTerm.length < 2) {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await searchDrugLabels(searchTerm, 10);

        if (response?.results && response.results.length > 0) {
          setResults(response.results);
          setShowDropdown(true);
        } else {
          setResults([]);
          setShowDropdown(false);
        }
      } catch (error) {
        console.error('Error searching drugs:', error);
        setResults([]);
        setShowDropdown(false);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchDrugs, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSelectDrug = (drug: DrugLabel) => {
    onDrugSelect(drug);
    setSearchTerm('');
    setShowDropdown(false);
  };

  const getDrugDisplayName = (drug: DrugLabel): string => {
    const brandName = drug.openfda?.brand_name?.[0];
    const genericName = drug.openfda?.generic_name?.[0];

    if (brandName && genericName) {
      return `${brandName} (${genericName})`;
    }
    return brandName || genericName || 'Unknown Drug';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by generic name, brand name..."
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 animate-spin" />
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto">
          {results.map((drug, index) => (
            <div
              key={drug.id || index}
              onClick={() => handleSelectDrug(drug)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <DrugImage drug={drug} size="small" />
              <div className="flex-1">
                <div className="font-medium text-gray-900">
                  {getDrugDisplayName(drug)}
                </div>
                {drug.openfda?.manufacturer_name?.[0] && (
                  <div className="text-sm text-gray-500">
                    {drug.openfda.manufacturer_name[0]}
                  </div>
                )}
                {drug.openfda?.product_ndc?.[0] && (
                  <div className="text-xs text-gray-400">
                    NDC: {drug.openfda.product_ndc[0]}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showDropdown && searchTerm.length >= 2 && results.length === 0 && !isLoading && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-4 text-center text-gray-500">
          No results found for "{searchTerm}"
        </div>
      )}
    </div>
  );
}
