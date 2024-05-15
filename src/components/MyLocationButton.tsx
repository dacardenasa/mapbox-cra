import { useContext } from "react";
import { MapContext, PlacesContext } from "../context";

export const MyLocationButton = () => {
  const { map, isMapReady } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);
  const onClick = () => {
    map?.flyTo({ zoom: 14, center: userLocation! });
  };

  if (isMapReady && userLocation) {
    return (
      <button
        className="btn btn-primary"
        onClick={onClick}
        style={{ position: "fixed", top: 20, right: 20, zIndex: 999 }}
      >
        My location
      </button>
    );
  }
  return null;
};
