'use client';
import SectionLoader from '@/components/SectionLoader';
import { classifyPosts } from '@/lib/api/classify';
import { setDarkWebFacebookMentions } from '@/lib/features/posts/postsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';
import checkSearchQuery from '@/utils/checkSearchQuery';
import { useCallback } from 'react';

const DarkwebFacebookPosts = ({ keyword, search, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const darkWebFacebookMentions = useAppSelector(
    (state) => state.posts.darkWebFacebookMentions,
  );

  const dispatch = useAppDispatch();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);

      // Dark Web - Facebook
      const darkwebFacebookRes = await fetch('/api/darkWebPosts', {
        method: 'POST',
        body: JSON.stringify({
          input: {
            keyword: keyword,
            amount: 500,
            from_date: '01/01/2025',
            to_date: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }),
          },
          url: 'http://172.86.116.124:5002/scrape',
        }),
      });
      const darkwebFacebookPosts = await darkwebFacebookRes.json();
      // console.log('darkweb Facebook posts: ', darkwebFacebookPosts);
      if (!darkwebFacebookPosts || darkwebFacebookPosts.length === 0) {
        setLoading(false);
        return;
      }

      const normalizedPosts = normalizePosts(
        darkwebFacebookPosts,
        'darkwebfacebook',
      );
      // console.log('normalized: ', normalizedPosts);

      // classify 10 posts at a time using the classifyPosts function
      let isFirstBatch = true;
      for (let i = 0; i < normalizedPosts.length; i += 10) {
        const batch = normalizedPosts.slice(i, i + 10);
        const classifiedPosts = await classifyPosts(batch);
        // console.log('classifiedPosts', classifiedPosts);
        dispatch(setDarkWebFacebookMentions(classifiedPosts));
  
        if (isFirstBatch) {
          setPosts(classifiedPosts.slice(0, 3)); // Show only 2-3 posts
          isFirstBatch = false;
          setLoading(false);
        }
        
      }

      // const classifiedPosts = await classifyPosts(normalizedPosts);
      // // console.log('classifiedPosts', classifiedPosts);
      // dispatch(setDarkWebFacebookMentions(classifiedPosts));

      // setPosts(classifiedPosts.slice(0, 3)); // Show only 2-3 posts
    } catch (error) {
      console.error('Dark Web API Error:', error);
    } finally {
      setLoading(false);
    }
  }, [keyword, dispatch]);

  useEffect(() => {
    if (checkSearchQuery(searchQuery, search)) {
      setPosts(darkWebFacebookMentions.slice(0, 3));
    } else {
      fetchPosts();
    }
  }, [search, searchQuery, darkWebFacebookMentions, fetchPosts]);

  if (onlyData) {
    return null;
  }
  if (loading)
    return <SectionLoader sectionTitle={'Dark Web Facebook Mentions'} />;
  if (!posts || posts.length === 0 || onlyData) {
    return null;
  }

  return (
    <div>
      <SectionTitle>Dark Web Facebook Mentions</SectionTitle>
      {posts.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  );
};

export default DarkwebFacebookPosts;
