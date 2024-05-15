import { useContext, useEffect, useState } from "react";
import { MapContext, PlacesContext } from "../context";
import { Place, PlacesLoader } from "./";

type OnPlaceClickArgs = {
  lng: number;
  lat: number;
  placeId: string;
};

export const SearchResults = () => {
  const [selectedPlaceId, setSelectedPlaceId] = useState("");

  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRouteBetweenPoints } = useContext(MapContext);

  const onPlaceClick = ({ lng, lat, placeId }: OnPlaceClickArgs) => {
    setSelectedPlaceId(placeId);
    map?.flyTo({
      zoom: 14,
      center: [lng, lat]
    });
  };

  const drawRoute = ({ lng, lat }: Pick<OnPlaceClickArgs, "lng" | "lat">) => {
    if (!userLocation) return;
    getRouteBetweenPoints(userLocation, [lng, lat]);
  };

  useEffect(() => {
    if (!places.length) {
      setSelectedPlaceId("");
    }
  }, [places]);

  if (isLoadingPlaces) {
    return <PlacesLoader />;
  }

  if (places.length === 0) {
    return <></>;
  }

  return (
    <ul className="list-group mt-3">
      {places.map((place) => {
        const [lng, lat] = place.geometry.coordinates;
        return (
          <Place
            key={place.id}
            isPlaceSelected={place.id === selectedPlaceId}
            name={place.properties.name}
            placeFormatted={place.properties.place_formatted}
            onPlaceClick={() => onPlaceClick({ lng, lat, placeId: place.id })}
            drawRoute={() => drawRoute({ lng, lat })}
          />
        );
      })}
    </ul>
  );
};
