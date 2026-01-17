export const fetchPlaces = async (lat, lon, tags) => {
  const radius = 1500; // meters

  const query = `
    [out:json];
    (
      ${tags
        .map(
          (tag) =>
            `node["amenity"="${tag}"](around:${radius},${lat},${lon});`
        )
        .join("")}
    );
    out;
  `;

  const url = "https://overpass-api.de/api/interpreter";

  const response = await fetch(url, {
    method: "POST",
    body: query,
  });

  const data = await response.json();
  return data.elements;
};
