// function normalizeLocation(postId, rawResponse) {
//     // Try to handle malformed responses with numbered keys
//     if (rawResponse && typeof rawResponse === 'object' && '0' in rawResponse) {
//       const first = rawResponse['0']; // get first location
//       return {
//         latitude: first.latitude ?? null,
//         longitude: first.longitude ?? null,
//         location: first.location ?? null,
//       };
//     }
  
//     return {
//       latitude: rawResponse.latitude ?? null,
//       longitude: rawResponse.longitude ?? null,
//       location: rawResponse.location ?? null,
//     };
//   }
  

export const classifyLocations = async (posts) => {
    try {
      if (posts?.length == 0) {
        return [];
      }
      const response = await fetch('/api/classify-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ posts }),
      });
  
      if (!response.ok) {
        // throw new Error(`Failed to classify posts: ${response.statusText}`);
        return [];
      }
  
      const classifiedPosts = await response.json();
  
      // Merge risk classification with original posts
      return posts.map((post, index) => ({
        ...post,
        location: classifiedPosts[index]?.location || 'Unknown',
        // latitude: classifiedPosts[index]?.latitude || null,
        // longitude: classifiedPosts[index]?.longitude || null,
        // ...normalizeLocation(post.id, classifiedPosts[index]),
    
      }));
    } catch (error) {
      console.error('Error classifying posts:', error);
      return posts.map((post) => ({
        ...post,
        location: 'Unknown',
        latitude:  null,
        longitude: null,
      })); // Default to 'Unknown' risk if error occurs
    }
  };
  