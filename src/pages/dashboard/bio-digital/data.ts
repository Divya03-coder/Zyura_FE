export interface BioModel {
  id: string;
  title: string;
  category:
    | "Cardiology"
    | "Neurology"
    | "Orthopedics"
    | "Pulmonology"
    | "Gastroenterology"
    | "Anatomy"
    | string;
  thumbnail: string; // URL for the card image
  modelUrl: string; // The BioDigital embed URL
  description: string;
  details: string; // Detailed text info
  relatedImages: string[]; // For the slider/related views
  raw?: any; // To store the full response if needed
}

export const bioModels: BioModel[] = []; // Initialized as empty, data comes from API
