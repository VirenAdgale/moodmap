import { useEffect, useState } from "react";
import Map from "./components/Map";
import PlaceCard from "./components/PlaceCard";
import useUserLocation from "./hooks/useUserLocation";
import { moodConfig } from "./utils/moodConfig";
import { fetchPlaces } from "./utils/fetchPlaces";
import { calculateDistance } from "./utils/distance";

function App() {
  const { position, error } = useUserLocation();
  const [mood, setMood] = useState("work");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!position) return;

    const loadPlaces = async () => {
      setLoading(true);
      const data = await fetchPlaces(
        position[0],
        position[1],
        moodConfig[mood].tags
      );
      setPlaces(data);
      setLoading(false);
    };

    loadPlaces();
  }, [position, mood]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>MoodMap</h1>
      <p>Mood-based Nearby Places Recommender</p>

      {error && <p>{error}</p>}

      <select onChange={(e) => setMood(e.target.value)}>
        {Object.keys(moodConfig).map((key) => (
          <option key={key} value={key}>
            {moodConfig[key].label}
          </option>
        ))}
      </select>

      {position && <Map position={position} places={places} />}

      <h2>Nearby Places</h2>

      {loading && <p>Finding places near you...</p>}

      {!loading && places.length === 0 && (
        <p>No places found for this mood.</p>
      )}

      {!loading &&
        places.map((place) => {
          const distance = calculateDistance(
            position[0],
            position[1],
            place.lat,
            place.lon
          );

          return (
            <PlaceCard
              key={place.id}
              place={place}
              distance={distance}
            />
          );
        })}
    </div>
  );
}

export default App;
