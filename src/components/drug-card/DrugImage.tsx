import { useState, useEffect } from 'react';
import { Pill, Droplet, Syringe, Wind, Eye, Ear, Activity } from 'lucide-react';
import { DrugLabel } from '../../types/fda';

interface DrugImageProps {
  drug: DrugLabel;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function DrugImage({ drug, size = 'medium', className = '' }: DrugImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDrugImage = async () => {
      // Skip loading for now due to CORS restrictions
      // In production, this would go through a backend proxy
      setIsLoading(false);
      setError(true);
      setImageUrl(null);
    };

    fetchDrugImage();
  }, [drug]);

  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-24 h-24',
    large: 'w-48 h-48',
  };

  const iconSizes = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-24 w-24',
  };

  // Get icon based on route of administration
  const getRouteIcon = () => {
    const route = drug.openfda?.route?.[0]?.toUpperCase() || '';

    // Map routes to appropriate icons
    if (route.includes('ORAL')) {
      return Pill; // Pills/tablets/capsules for oral medications
    } else if (route.includes('TOPICAL') || route.includes('CUTANEOUS') || route.includes('TRANSDERMAL')) {
      return Droplet; // Droplet for creams, ointments, patches
    } else if (route.includes('INJECTION') || route.includes('INTRAVENOUS') || route.includes('INTRAMUSCULAR') || route.includes('SUBCUTANEOUS')) {
      return Syringe; // Syringe for injections and IV medications
    } else if (route.includes('INHALATION') || route.includes('RESPIRATORY') || route.includes('NASAL')) {
      return Wind; // Wind for inhalers and nasal sprays
    } else if (route.includes('OPHTHALMIC')) {
      return Eye; // Eye icon for eye drops and ointments
    } else if (route.includes('OTIC') || route.includes('AURICULAR')) {
      return Ear; // Ear icon for ear drops
    } else if (route.includes('RECTAL') || route.includes('VAGINAL')) {
      return Activity; // Activity for suppositories
    } else {
      return Pill; // Default to pill icon for unknown routes
    }
  };

  // Generate a consistent color based on drug name
  const getColorFromDrugName = () => {
    const drugName = drug.openfda?.brand_name?.[0] || drug.openfda?.generic_name?.[0] || '';
    const colors = [
      'from-blue-100 to-blue-200',
      'from-green-100 to-green-200',
      'from-purple-100 to-purple-200',
      'from-pink-100 to-pink-200',
      'from-indigo-100 to-indigo-200',
      'from-cyan-100 to-cyan-200',
      'from-teal-100 to-teal-200',
      'from-orange-100 to-orange-200',
    ];

    const iconColors = [
      'text-blue-400',
      'text-green-400',
      'text-purple-400',
      'text-pink-400',
      'text-indigo-400',
      'text-cyan-400',
      'text-teal-400',
      'text-orange-400',
    ];

    const hash = drugName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = hash % colors.length;

    return { gradient: colors[index], icon: iconColors[index] };
  };

  const { gradient, icon } = getColorFromDrugName();
  const RouteIcon = getRouteIcon();

  if (isLoading) {
    return (
      <div className={`${sizeClasses[size]} ${className} bg-gray-100 rounded-lg flex items-center justify-center animate-pulse`}>
        <RouteIcon className={`${iconSizes[size]} text-gray-300`} />
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`${sizeClasses[size]} ${className} bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center shadow-sm`}>
        <RouteIcon className={`${iconSizes[size]} ${icon}`} />
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${className} bg-white rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center`}>
      <img
        src={imageUrl}
        alt="Drug product"
        className="w-full h-full object-contain p-1"
        onError={() => setError(true)}
      />
    </div>
  );
}
