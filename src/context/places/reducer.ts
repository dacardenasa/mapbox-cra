import { Feature } from "../../interfaces/places";
import { PlacesState } from "./provider";

type PlacesAction =
  | { type: "setUserLocation"; payload: [number, number] }
  | { type: "setLoadingPlaces" }
  | { type: "setUserPlaces"; payload: Feature[] };

export const placesReducer = (
  state: PlacesState,
  action: PlacesAction
): PlacesState => {
  switch (action.type) {
    case "setUserLocation":
      return { ...state, isLoading: false, userLocation: action.payload };
    case "setLoadingPlaces":
      return { ...state, isLoadingPlaces: true, places: [] };
    case "setUserPlaces":
      return { ...state, places: action.payload, isLoadingPlaces: false };
    default:
      return state;
  }
};
