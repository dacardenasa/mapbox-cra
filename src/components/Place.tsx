type PlaceProps = {
  isPlaceSelected: boolean;
  name: string;
  placeFormatted: string;
  drawRoute: () => void;
  onPlaceClick: () => void;
};

export const Place = ({
  name,
  placeFormatted,
  isPlaceSelected = false,
  drawRoute,
  onPlaceClick
}: PlaceProps) => {
  return (
    <li
      className={`${
        isPlaceSelected && "active"
      } list-group-item list-group-item-action pointer`}
      onClick={onPlaceClick}
    >
      <h6>{name}</h6>
      <p style={{ fontSize: 12 }}>{placeFormatted}</p>
      <button
        onClick={drawRoute}
        className={`btn ${
          isPlaceSelected ? "btn-outline-light" : "btn-outline-primary"
        } btn-sm`}
      >
        Draw route
      </button>
    </li>
  );
};
