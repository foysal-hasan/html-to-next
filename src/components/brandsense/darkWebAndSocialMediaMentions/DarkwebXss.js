'use client'
import { classifyPosts } from '@/lib/api/classify';
import { useAppDispatch } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';
import { setDarkWebXSSMentions } from '@/lib/features/posts/postsSlices';

const DarkwebXSSPosts = ({ keyword }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
      // Dark Web - XSS
      const darkwebXssRes = await fetch('/api/darkWebPosts', {
        method: 'POST',
        body: JSON.stringify({
        input: {
          keyword: keyword,
          // start_date: '2025-01-01',
          // end_date: '2025-01-10',
        },
        url: 'http://172.86.116.124:5004/search_xss',
        }),
      });
      const darkwebXssPosts = await darkwebXssRes.json();
      console.log('darkweb Xss posts: ', darkwebXssPosts);

      const normalizedXssPosts = normalizePosts(darkwebXssPosts, 'darkwebxss');
      console.log('normalized Xss: ', normalizedXssPosts);

      const classifiedXssPosts = await classifyPosts(normalizedXssPosts);
      console.log('classifiedXssPosts', classifiedXssPosts);
      dispatch(setDarkWebXSSMentions(classifiedXssPosts))


      setPosts(prevPosts => [...prevPosts, ...classifiedXssPosts.slice(0, 3)]); // Show only 2-3 posts
      } catch (error) {
      console.error('Dark Web API Error:', error);
      }finally{
        setLoading(false)
      }
    };

    fetchPosts();
  }, [keyword]);


  if (posts.length === 0 || loading) {
    return null;
  }

  return (
    <div>
      <SectionTitle>Dark Web Stealer Mentions</SectionTitle>
      {posts.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  )
};

export default DarkwebXSSPosts;
