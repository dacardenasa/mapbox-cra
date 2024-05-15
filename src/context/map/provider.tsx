import { useContext, useEffect, useReducer } from "react";

import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";
import { MapContext } from "./context";
import { MapReducer } from "./reducer";
import { PlacesContext } from "../places/context";
import { mapBoxApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE = {
  isMapReady: false,
  map: undefined,
  markers: []
};

interface Props {
  children: React.ReactNode;
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  const setMap = (map: Map) => {
    const popUp = new Popup().setHTML(`
        <h4>I am here</h4>
        <p>In some place in the world</p>
    `);
    new Marker().setLngLat(map.getCenter()).setPopup(popUp).addTo(map);
    dispatch({ type: "setMap", payload: map });
  };

  const getRouteBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const response = await mapBoxApi.get<DirectionsResponse>(
      `/directions/v5/mapbox/driving/${start.join(",")};${end.join(",")}`,
      {
        params: {
          alternatives: true,
          geometries: "geojson",
          overview: "full",
          steps: false
        }
      }
    );
    const { distance, duration, geometry } = response.data.routes[0];
    const { coordinates } = geometry;
    let kms = distance / 1000;
    kms = Math.round(kms + 100);
    kms /= 100;
    const minutes = Math.floor(duration / 60);
    console.info({ kms, minutes });

    const bounds = new LngLatBounds(start, start);

    for (const coordinate of coordinates) {
      const newCoordinate: [number, number] = [coordinate[0], coordinate[1]];
      bounds.extend(newCoordinate);
    }

    state.map?.fitBounds(bounds, { padding: 200 });

    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates
            }
          }
        ]
      }
    };

    if (state.map?.getLayer("RouteString")) {
      state.map.removeLayer("RouteString");
      state.map.removeSource("RouteString");
    }

    state.map?.addSource("RouteString", sourceData);

    state.map?.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        "line-cap": "round",
        "line-join": "round"
      },
      paint: {
        "line-color": "black",
        "line-width": 3
      }
    });
  };

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.geometry.coordinates;
      const popUp = new Popup().setHTML(`
        <h6>${place.properties.name}</h6>
        <p><${place.properties.name_preferred}</p>
      `);
      const newMarker = new Marker()
        .setPopup(popUp)
        .setLngLat([lng, lat])
        .addTo(state.map!);
      newMarkers.push(newMarker);
    }
    dispatch({ type: "setMarkers", payload: newMarkers });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  useEffect(() => {
    if (!places.length) {
      if (state.map?.getLayer("RouteString")) {
        state.map.removeLayer("RouteString");
        state.map.removeSource("RouteString");
      }
    }
  }, [places, state.map]);

  return (
    <MapContext.Provider value={{ ...state, setMap, getRouteBetweenPoints }}>
      {children}
    </MapContext.Provider>
  );
};
