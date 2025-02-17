export const classifyPosts = async (posts) => {
  try {
    const response = await fetch('/api/classify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ posts }),
    });

    if (!response.ok) {
      // throw new Error(`Failed to classify posts: ${response.statusText}`);
      return []
    }

    const classifiedPosts = await response.json();
    
    // Merge risk classification with original posts
    return posts.map((post, index) => ({
      ...post,
      risk: classifiedPosts[index]?.risk || 'Unknown',
    }));
  } catch (error) {
    console.error('Error classifying posts:', error);
    return posts.map(post => ({ ...post, risk: 'Unknown' })); // Default to 'Unknown' risk if error occurs
  }
};
