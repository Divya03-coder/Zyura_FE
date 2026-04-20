import { Clock, Bookmark, X } from 'lucide-react';
import DrugImage from './DrugImage';
import { DrugLabel } from '../../types/fda';

interface SavedAndRecentProps {
  recentlyViewed: DrugLabel[];
  savedDrugs: DrugLabel[];
  onDrugSelect: (drug: DrugLabel) => void;
  onRemoveSaved: (drug: DrugLabel) => void;
}

export default function SavedAndRecent({ 
  recentlyViewed, 
  savedDrugs, 
  onDrugSelect,
  onRemoveSaved 
}: SavedAndRecentProps) {
  const getDrugDisplayName = (drug: DrugLabel) => {
    const brandName = drug.openfda?.brand_name?.[0];
    const genericName = drug.openfda?.generic_name?.[0];
    
    if (brandName && genericName) {
      return { primary: brandName, secondary: genericName };
    }
    return { primary: brandName || genericName || 'Unknown Drug', secondary: null as string | null };
  };

  const DrugCard = ({ drug, onRemove, showRemove = false }: { drug: DrugLabel; onRemove?: (drug: DrugLabel) => void; showRemove?: boolean }) => {
    const { primary, secondary } = getDrugDisplayName(drug);

    return (
      <div
        onClick={() => onDrugSelect(drug)}
        className="relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group"
      >
        {showRemove && onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(drug);
            }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 sm:opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        
        <div className="flex items-start gap-3">
          <DrugImage drug={drug} size="medium" className="flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 mb-1 truncate">{primary}</div>
            {secondary && (
              <div className="text-sm text-gray-600 mb-2 truncate">({secondary})</div>
            )}
            {drug.openfda?.manufacturer_name?.[0] && (
              <div className="text-xs text-gray-500 truncate">
                {drug.openfda.manufacturer_name[0]}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Saved Drugs */}
      {savedDrugs.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Bookmark className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Saved Drugs</h2>
            <span className="text-sm text-gray-500">({savedDrugs.length})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedDrugs.map((drug, index) => (
              <DrugCard
                key={drug.id || index}
                drug={drug}
                onRemove={onRemoveSaved}
                showRemove={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">Recently Viewed</h2>
            <span className="text-sm text-gray-500">({recentlyViewed.length})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentlyViewed.map((drug, index) => (
              <DrugCard
                key={drug.id || index}
                drug={drug}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {savedDrugs.length === 0 && recentlyViewed.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
           <Bookmark className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <p className="text-gray-600 font-medium">No saved or recently viewed drugs yet.</p>
          <p className="text-sm text-gray-500 mt-2">Start searching to build your collection!</p>
        </div>
      )}
    </div>
  );
}
