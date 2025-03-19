// import translate from 'translate-google';

// export const translateText = async (text, toLang) => {
//   try {
//     const translatedText = await translate(text, { to: toLang });
//     return translatedText;
//   } catch (error) {
//     console.error('Error translating text:', error);
//     throw error;
//   }
// };

// // // Example usage
// // translateText('I speak Chinese 我很好!', 'en', 'bn')
// //   .then(res => {
// //     console.log(res);
// //   })
// //   .catch(err => {
// //     console.error(err);
// //   });

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
      return [];
    }

    const classifiedPosts = await response.json();

    // Merge risk classification with original posts
    return posts.map((post, index) => ({
      ...post,
      risk: classifiedPosts[index]?.risk || 'Unknown',
      language: classifiedPosts[index]?.language || 'others',
      // russianContent: classifiedPosts[index]?.russianContent || 'Unknown',
      // arabicContent: classifiedPosts[index]?.arabicContent || 'Unknown',
      // englishContent: classifiedPosts[index]?.englishContent || 'Unknown',
      // content: classifiedPosts[index]?.englishContent || 'Unknown',
    }));
  } catch (error) {
    console.error('Error classifying posts:', error);
    return posts.map((post) => ({
      ...post,
      risk: 'Unknown',
      language: 'others',
    })); // Default to 'Unknown' risk if error occurs
  }
};
