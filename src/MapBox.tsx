import { MapProvider, PlacesProvider } from "./context";
import { Home } from "./screens";

export const MapBox = () => {
  return (
    <PlacesProvider>
      <MapProvider>
        <Home />
      </MapProvider>
    </PlacesProvider>
  );
};
