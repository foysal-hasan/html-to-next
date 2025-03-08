'use client'
import SectionLoader from '@/components/SectionLoader';
import { classifyPosts } from '@/lib/api/classify';
import { setSearchExploitMentions, setSearchXss } from '@/lib/features/posts/postsSlices';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';


const SearchXss = ({ keyword, domain, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false)

  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  
  const postsMentions = useAppSelector(
      (state) => state.posts.searchXss,
    );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        // facebook
        const postsRes = await fetch('/api/stream', {
          method: 'POST',
          body: JSON.stringify({
            input:{
              "keyword":"Accounts",
              "start_date":"2025-01-01",
              "end_date":"2025-01-10"
          },
            url: 'http://172.86.116.124:5003/search_xss',
          }),
        });

        const postsResponse = await postsRes.json();
        console.log('facebook posts: ', postsResponse);
        if (!postsResponse || postsResponse?.length === 0) {
          setLoading(false);
          return;
        }

        const normalizedPosts = normalizePosts(postsResponse[0], 'posts');
        // console.log('normalized: ', normalizedPosts);
        
        const classifiedPosts = await classifyPosts(normalizedPosts);

        // console.log('classifiedPosts', classifiedPosts);
         dispatch(setSearchXss(classifiedPosts))
         
        setPosts(classifiedPosts.slice(0, 3)); // Show only 2-3 posts
      } catch (error) {
        console.error('Search API Error:', error);
      }finally{
        setLoading(false)
      }
    };

    if (searchQuery === domain) {
      setPosts(postsMentions.slice(0, 3));
    } else {
      fetchPosts();
    }
    
  }, [keyword, domain]);

  if (onlyData) {
    return null;
  }
  if(loading) return <SectionLoader sectionTitle={'Search XSS'} />
  
  if (!posts || posts.length === 0 || onlyData) {
    return null;
  }
  
  return (
    <div>
      <SectionTitle>Search XSS</SectionTitle>
      {posts.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  );
};

export default SearchXss;
