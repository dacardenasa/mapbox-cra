import { ChangeEvent, useContext, useRef } from "react";
import { MapContext, PlacesContext } from "../context";
import { SearchResults } from "./SearchResults";

export const SearchBar = () => {
  const { isMapReady } = useContext(MapContext);
  const { searchPlacesByTerm, userLocation } = useContext(PlacesContext);
  const debounceRef = useRef<NodeJS.Timeout>();

  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm(event.target.value);
    }, 350);
  };

  if (isMapReady && userLocation) {
    return (
      <div className="search-container">
        <input
          type="text"
          className="form-control"
          placeholder="Search place"
          onChange={onQueryChange}
        />
        <SearchResults />
      </div>
    );
  }
  return null;
};
