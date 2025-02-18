'use client'
import { classifyPosts } from '@/lib/api/classify';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';
import { setDarkWebFacebookMentions } from '@/lib/features/posts/postsSlices'


const DarkwebFacebookPosts = ({ keyword, domain }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false)

  const searchQuery = useAppSelector((state) => state.search.searchQuery);
    
    const darkWebFacebookMentions = useAppSelector(
        (state) => state.posts.darkWebFacebookMentions,
      );

  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true)
    const fetchPosts = async () => {
      try {
        // Dark Web - Facebook
        const darkwebFacebookRes = await fetch('/api/darkWebPosts', {
          method: 'POST',
          body: JSON.stringify({
            input: {
              keyword: keyword,
              amount: 20,
              from_date: '01/01/2025',
              to_date: '01/15/2025',
            },
            url: 'http://172.86.116.124:5002/scrape',
          }),
        });
        const darkwebFacebookPosts = await darkwebFacebookRes.json();
        console.log('darkweb Facebook posts: ', darkwebFacebookPosts);

        const normalizedPosts = normalizePosts(darkwebFacebookPosts, 'darkwebfacebook');
        console.log('normalized: ', normalizedPosts);

        const classifiedPosts = await classifyPosts(normalizedPosts);
        console.log('classifiedPosts', classifiedPosts);
        dispatch(setDarkWebFacebookMentions(classifiedPosts))


        setPosts(classifiedPosts.slice(0, 3)); // Show only 2-3 posts
      } catch (error) {
        console.error('Dark Web API Error:', error);
      }finally{
        setLoading(false)
      }
    };

    if (searchQuery === domain) {
      setPosts(darkWebFacebookMentions.slice(0, 3));
    } else {
      fetchPosts();
    }
  }, [keyword]);


  if (posts.length === 0 || loading) {
    return null;
  }

  return (
    <div>
      <SectionTitle>Dark Web Facebook Mentions</SectionTitle>
      {posts.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  )
};

export default DarkwebFacebookPosts;
