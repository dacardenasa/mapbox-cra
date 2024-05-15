import { useEffect, useReducer } from "react";
import { PlacesContext } from "./context";
import { placesReducer } from "./reducer";
import { getUserLocation } from "../../helpers";
import { mapBoxApi } from "../../apis";
import { Feature, PlacesResponse } from "../../interfaces/places";

export interface PlacesState {
  isLoading: boolean;
  isLoadingPlaces: boolean;
  places: Feature[];
  userLocation?: [number, number] | null;
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  isLoadingPlaces: false,
  places: [],
  userLocation: null
};

interface Props {
  children: React.ReactNode;
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((response) =>
      dispatch({ type: "setUserLocation", payload: response })
    );
  }, []);

  const searchPlacesByTerm = async (query: string) => {
    if (!query.length) {
      dispatch({ type: "setUserPlaces", payload: [] });
      return;
    }
    dispatch({ type: "setLoadingPlaces" });
    const { data } = await mapBoxApi.get<PlacesResponse>(
      "/search/geocode/v6/forward",
      {
        params: { q: query, proximity: state.userLocation?.join(","), limit: 5 }
      }
    );
    dispatch({ type: "setUserPlaces", payload: data.features });
  };

  return (
    <PlacesContext.Provider value={{ ...state, searchPlacesByTerm }}>
      {children}
    </PlacesContext.Provider>
  );
};
