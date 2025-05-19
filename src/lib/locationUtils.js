
// Check if a query is a valid location
export const isLocation = async (query) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`
    );
    const data = await res.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("isLocation error:", error);
    return null;
  }
};

// Get lat/lon coordinates of a location
export const getCoordinates = async (location) => {
  const result = await isLocation(location);
  if (!result) return null;

  return {
    lat: parseFloat(result.lat),
    lon: parseFloat(result.lon),
    display_name: result.display_name,
  };
};

// Filter posts that contain the location text
export const filterPostsByLocation = async (locationQuery) => {
  const location = await isLocation(locationQuery);
  if (!location) {
    console.log(`❌ No location found for: ${locationQuery}`);
    return [];
  }

  console.log(location);

  console.log(`📍 Location found: ${location.display_name}`);

  return posts.filter((post) =>
    // post.content.toLowerCase().includes(locationQuery)
    post['location'] = locationQuery
  );
};

// Enhance posts by detecting location from their content
export const enhancePostsWithLocation = async (posts) => {
  const updatedPosts = [];

  for (const post of posts) {
    if (post.location == 'Unknown' || post.location == null) {
      // If already has location, just keep it
      // updatedPosts.push(post);
      continue;
    }

    const result = await isLocation(post.location);

    if (result) {
      updatedPosts.push({
        ...post,
        location: result.display_name,
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
      });
    } else {
      updatedPosts.push(post); // Keep as-is if location not found
    }
  }

  return updatedPosts;
};

