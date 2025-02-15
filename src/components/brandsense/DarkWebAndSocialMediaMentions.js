'use client';
import { setNormalizedPosts, setRisksForPosts } from '@/lib/features/posts/postsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CustomButton from './CustomButton';
import DarkWebAndSocialMediaMentionsCard from './DarkWebAndSocialMediaMentionsCard';
import SectionTitle from './SectionTitle';
import ExportRiskPDF from './download';


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

const DarkWebAndSocialMediaMentions = () => {
  const [loading, setLoading] = useState(true);
  const { posts } = useAppSelector(state => state.posts)

  const dispatch = useAppDispatch()

  const mentions = [
    {
      url: 'twitter.com/acme',
      date: '2022-01-02',
      text: 'Acme is a great company!',
    },
    {
      url: 'reddit.com/r/acme',
      date: '2022-01-02',
      text: 'Acme is a great company!',
    },
    {
      url: 'instagram.com/acme',
      date: '2022-01-02',
      text: 'Acme is a great company!',
    },
    {
      url: 'tiktok.com/@acme',
      date: '2022-01-02',
      text: 'Acme is a great company!',
    },
  ];

  const domain = 'google.com';

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
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <svg
          className="animate-spin h-20 w-20 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );
  }

  const filterPosts = (posts, limit = 5) => {
    console.log(posts);
    
    return posts.slice(0, limit);
  };

  return (
    <div className="border-[#3b4854] border-b-2 pb-8">
      <SectionTitle>Dark Web and Social Media Mentions</SectionTitle>
      <div className='max-w-4xl flex flex-col gap-10'>
      {filterPosts(posts)?.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard
          key={index}
          url={post.link}
          date={post.date}
          content={post.content}
          risk={post.risk}
        />
      ))}
      </div>
      <div className="flex gap-5 items-center justify-center mt-5">
        <Link href='/blogr'>
        <CustomButton text="View More" />
        </Link>
        <ExportRiskPDF />
      </div>
    </div>
  );
};

export default DarkWebAndSocialMediaMentions;
