import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ position, places }) => {
  return (
    <MapContainer
      center={position}
      zoom={14}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <Marker position={position}>
        <Popup>You are here 📍</Popup>
      </Marker>

      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lon]}
        >
          <Popup>{place.tags.name || "Unnamed place"}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
