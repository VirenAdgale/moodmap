const PlaceCard = ({ place, distance }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "6px",
      }}
    >
      <h3>{place.tags.name || "Unnamed place"}</h3>
      <p>Type: {place.tags.amenity}</p>
      <p>Distance: {distance} km</p>
    </div>
  );
};

export default PlaceCard;
