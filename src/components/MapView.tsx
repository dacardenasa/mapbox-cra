import { useContext, useLayoutEffect, useRef } from "react";
import { Map } from "mapbox-gl";

import { MapContext, PlacesContext } from "../context";
import { Loading } from "./";

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);
  const mapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapRef.current!, // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: userLocation!, // starting position [lng, lat]
        zoom: 14 // starting zoom
      });
      setMap(map);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      ref={mapRef}
      style={{
        backgroundColor: "red",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0
      }}
    >
      <h1>{userLocation?.join(",")}</h1>
    </div>
  );
};
