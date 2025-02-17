'use client'
import { classifyPosts } from '@/lib/api/classify';
import { useAppDispatch } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';
import { setDarkWebXSSMentions } from '@/lib/features/posts/postsSlices';

const DarkwebXSSPosts = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {

      // Dark Web - XSS
      const darkwebXssRes = await fetch('/api/darkWebPosts', {
        method: 'POST',
        body: JSON.stringify({
        input: {
          keyword: 'google',
          start_date: '2025-01-01',
          end_date: '2025-01-10',
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
      }
    };

    fetchPosts();
  }, []);


  if (posts.length === 0) {
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
