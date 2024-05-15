import { createContext } from "react";
import { Feature } from "../../interfaces/places";

export interface PlacesContextProps {
  isLoading: boolean;
  isLoadingPlaces: boolean;
  userLocation?: [number, number] | null;
  places: Feature[];
  searchPlacesByTerm: (query: string) => void
}

export const PlacesContext = createContext<PlacesContextProps>(
  {} as PlacesContextProps
);
