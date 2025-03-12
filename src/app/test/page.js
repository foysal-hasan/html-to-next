// 'use client';
// import { useEffect, useState } from 'react';

// const FacebookMentions = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         setLoading(true);
//         // facebook
//         const facebookRes = await fetch('/api/fetchApifyPosts', {
//           method: 'POST',
//           body: JSON.stringify({
//             input: {
//               hashtags: ['google'],
//               resultsType: 'posts',
//               resultsLimit: 20,
//             },
//             url: 'apify/instagram-hashtag-scraper',
//           }),
//         });

//         const facebookPosts = await facebookRes.json();
//         // console.log('facebook posts: ', facebookPosts);
//         if (!facebookPosts || facebookPosts.length === 0) {
//           setLoading(false);
//           return;
//         }

//         console.log('posts => ', facebookPosts);
//         setPosts(facebookPosts);
//       } catch (error) {
//         console.error('Instagram API Error:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (loading) return <h1>loading...</h1>;

//   return (
//     <div>
//       <h1>hello world</h1>
//       {/* display as objects raw data*/}
//       {JSON.stringify(posts.slice(0, 3))}
//     </div>
//   );
// };

// export default FacebookMentions;

async function test() {
  try {
    const res = await fetch('http://107.189.26.43:5004/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: 'Facebook',
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('API Error:', errorData);
      return <div>Error: {errorData.error}</div>;
    }

    const data = await res.json();
    console.log('data', data);

    return (
      <div>
        <h1>Search Results</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  } catch (error) {
    console.error('Request failed:', error);
    return <div>Error: Failed to fetch data</div>;
  }
}

export default test;
