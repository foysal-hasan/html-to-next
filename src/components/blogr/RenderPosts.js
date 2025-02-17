'use client';
import filterPosts from '@/utils/filterPosts';
import { setNormalizedPosts, setRisksForPosts } from '@/lib/features/posts/postsSlices';
import { setSearchQuery } from '@/lib/features/search/searchSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '@/components/brandsense/DarkWebAndSocialMediaMentionsCard';


// const useFetchPosts = (domain) => {
//   const [loading, setLoading] = useState(true);
//   const { posts } = useAppSelector(state => state.posts);
//   const searchQuery = useAppSelector(state => state.search.searchQuery);
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const telegramRes = await fetch('/api/telegramPosts');
//         const telegramPosts = await telegramRes.json();
//         console.log('telegram posts', telegramPosts);

//         const normalizedPosts = [
//           ...normalizePosts(telegramPosts, 'telegram'),
//         ];

//         console.log('normalized posts: ', normalizedPosts);
//         dispatch(setNormalizedPosts(normalizedPosts));

//         const riskAnalysisResult = await fetch('/api/classify', {
//           method: 'POST',
//           body: JSON.stringify({ posts: normalizedPosts })
//         });

//         const response = await riskAnalysisResult.json();
//         dispatch(setRisksForPosts(response || []));
//         console.log(response);

//       } catch (error) {
//         console.log(error);
//         console.log('Something went wrong');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (searchQuery !== domain) {
//       dispatch(setSearchQuery(domain));
//       fetchPosts();
//     }

//   }, [domain, dispatch, searchQuery]);

//   return { loading, posts };
// };

// export default useFetchPosts;



// Normalize posts
const normalizePosts = (posts, source) => {
  // console.log(posts);
  return posts?.map(post => {
    const id = post.id || post.post_id || `${source}-${Math.random().toString(36).substring(0,12)}`;
    return {
      ...post,
      id,
      source,
      content: post.text || post.caption || post.message || '',
      date: post.date || post.timestamp || new Date().toISOString(),
      link: post.link || post.url || '#',
    };
  });
};



export default function RenderPosts({ domain }) {
  const [loading, setLoading] = useState(true);
  const { posts } = useAppSelector(state => state.posts)
  const searchQuery = useAppSelector(state => state.search.searchQuery)
  const dispatch = useAppDispatch()
  console.log('search: ', searchQuery);
  console.log('domain: ', domain);

  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    riskLevel: ''
  });


    useEffect(() => {
      const fetchPosts = async () => {
        try {
          // instagram
          /*
        const instagramRes = await fetch('/api/fetchApifyPosts', {
            method: 'POST',
            body: JSON.stringify({
              input: {
                search: 'restaurant',
                searchType: 'hashtag',
                searchLimit: 1,
              },
              url: 'apify/instagram-search-scraper',
            }),
          });
          let instagramPosts = []
          const instagramPostsOuter = await instagramRes.json();
          if(instagramPostsOuter.length > 0) instagramPosts = instagramPostsOuter[0]?.topPosts || []
          console.log('instagram posts: ', instagramPosts);
          
          // twitter
          const twitterRes = await fetch('/api/fetchApifyPosts', {
            method: 'POST',
            body: JSON.stringify({
              input: {
                searchTerms: [
            domain, // replace with keyword domain
                ],
                sort: 'Latest',
                maxItems: 10,
              },
              url: 'apidojo/twitter-scraper-lite',
            }),
          });
          const twitterPosts = await twitterRes.json();
          console.log('twitter posts: ', twitterPosts);
  
  
          // facebook
          const facebookRes = await fetch('/api/fetchApifyPosts', {
            method: 'POST',
            body: JSON.stringify({
              input: {
                query: domain, // replace with domain keyword
                search_type: 'posts',
                recent_posts: true,
                max_posts: 10,
                max_retries: 5,
                proxy: {
            useApifyProxy: true,
                },
              },
              url: 'danek/facebook-search-rental',
            }),
          });
  
          const facebookPosts = await facebookRes.json();
  
  
  
          // Dark Web - Facebook
          const darkwebFacebookRes = await fetch('/api/darkWebPosts', {
            method: 'POST',
            body: JSON.stringify({
              input: {
                keyword: 'facebook',
                amount: 10,
                from_date: '01/01/2025',
                to_date: '01/15/2025',
              },
              url: 'http://172.86.116.124:5002/scrape',
            }),
          });
          const darkwebFacebookPosts = await darkwebFacebookRes.json();
          console.log('darkweb Facebook posts: ', darkwebFacebookPosts);
          //Dark Web - XSS
          const darkwebXssRes = await fetch('/api/darkWebPosts', {
            method: 'POST',
            body: JSON.stringify({
              input: {
                keyword: 'Accounts',
                start_date: '2025-01-01',
                end_date: '2025-01-10',
              },
              url: 'http://172.86.116.124:5004/search_xss',
            }),
          });
          const darkwebXssPosts = await darkwebXssRes.json();
          console.log('darkweb Xss posts: ', darkwebXssPosts);
          // Dark Web - Stealer
          const darkwebStealerRes = await fetch('/api/darkWebPosts', {
            method: 'POST',
            body: JSON.stringify({
              input: {
                keyword: 'Stealer',
              },
              url: 'http://172.86.116.124:5003/search',
            }),
          });
          const darkwebStealerPosts = await darkwebStealerRes.json();
          console.log('darkweb Stealer posts: ', darkwebStealerPosts);
  */
          
          // telegram
          const telegramRes = await fetch('/api/telegramPosts');
          const telegramPosts = await telegramRes.json();
          console.log('telegram posts', telegramPosts);
  
          
  
          // const allPosts = [
          //   [...normalizedPosts, ],
          // ]
  
          const normalizedPosts = [
            // ...normalizePosts(instagramPosts, 'instagram'),
            // ...normalizePosts(twitterPosts, 'twitter'),
            // ...normalizePosts(facebookPosts, 'facebook'),
            // ...normalizePosts(darkwebFacebookPosts, 'darkweb-facebook'),
            // ...normalizePosts(darkwebXssPosts, 'darkweb-xss'),
            // ...normalizePosts(darkwebStealerPosts, 'darkweb-stealer'),
            ...normalizePosts(telegramPosts, 'telegram'),
          ];
  
  
          // Dispatch to Redux store
          // dispatch(setPosts(posts));
          console.log('normalized posts: ', normalizedPosts)
          dispatch(setNormalizedPosts(normalizedPosts))
         
  console.log('it\'s working');
  
    const riskAnalysisResult = await fetch('/api/classify', {
      method: 'POST',
      body: JSON.stringify({ posts: normalizedPosts})
    })
  
    const response = await riskAnalysisResult.json()
    dispatch(setRisksForPosts(response || []))
    console.log(response);
    
  
  
        } catch (error) {
          console.log(error);
          
          console.log('Something went wrong');
        } finally {
          setLoading(false);
        }
      };
  
      if (searchQuery !== domain) {
        dispatch(setSearchQuery(domain))
        fetchPosts();
      }
      
    }, [domain]);

  const filteredPosts = filterPosts(posts, filters);

  return (
    <div className="gap-1 px-6 flex flex-1 justify-center items-start py-5">
      <div className='max-w-4xl flex flex-col gap-10'>
        <div className="flex gap-4 mb-4 justify-end flex-1">
          <input
            type="date"
            placeholder="Start Date"
            className="border p-2 rounded"
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          />
          <input
            type="date"
            placeholder="End Date"
            className="border p-2 rounded"
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          />
          <select
            className="border p-2 rounded"
            onChange={(e) => setFilters({ ...filters, riskLevel: e.target.value })}
          >
            <option value="">All Risks</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        {filteredPosts?.map((post, index) => (
          <DarkWebAndSocialMediaMentionsCard
            key={index}
            url={post.link}
            date={post.date}
            content={post.content}
            risk={post.risk}
          />
        ))}
      </div>
    </div>
  );
}
