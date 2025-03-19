'use client';

import { useEffect } from 'react';

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

const Test = () => {
  // const url =
  //   'https://facebook-scraper3.p.rapidapi.com/search/posts?query=facebook';
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'x-rapidapi-key': 'JCencKSLCumshF194505UMZ3fVOjp1GA57EjsnaTRyaHjVY8Z7',
  //     'x-rapidapi-host': 'facebook-scraper3.p.rapidapi.com',
  //   },
  // };

  // try {
  //   const response = await fetch(url, options);
  //   const result = await response.json();
  //   console.log(result);
  // } catch (error) {
  //   console.error(error);
  // }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/boardreader', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword: 'google',
          amount: 10,
        }),
      });
      const result = await response.json();
      console.log(result);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Search Results</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default Test;
