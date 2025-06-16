'use client';
import SectionLoader from '@/components/SectionLoader';
import { classifyPosts } from '@/lib/api/classify';
import { setPostsMentions } from '@/lib/features/posts/postsSlices';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';
import checkSearchQuery from '@/utils/checkSearchQuery';
import { useCallback } from 'react';

const BlueSky = ({ keywords, search, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const postsMentions = useAppSelector((state) => state.posts.postsMentions);

  const dispatch = useAppDispatch();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      // facebook
      const postsRes = await fetch('/api/fetchApifyPosts', {
        method: 'POST',
        body: JSON.stringify({
          input: {
            queries: keywords,
            limit: 500,
            sort: 'latest',
            proxyConfiguration: {
              useApifyProxy: true,
              apifyProxyGroups: [],
            },
          },
          url: 'U9JtSIIjR6gyldBIN',
        }),
      });

      const postsResponse = await postsRes.json();
      // console.log('facebook posts: ', postsResponse);
      if (!postsResponse || postsResponse.length === 0) {
        setLoading(false);
        return;
      }

      const normalizedPosts = normalizePosts(postsResponse, 'bluesky');
      // console.log('normalized: ', normalizedPosts);

      const classifiedPosts = await classifyPosts(normalizedPosts);

      // console.log('classifiedPosts', classifiedPosts);
      dispatch(setPostsMentions(classifiedPosts));

      setPosts(classifiedPosts.slice(0, 3)); // Show only 2-3 posts
    } catch (error) {
      console.error('Instagram API Error:', error);
    } finally {
      setLoading(false);
    }
  }, [keywords, dispatch]);

  useEffect(() => {
    if (checkSearchQuery(searchQuery, search)) {
      setPosts(postsMentions.slice(0, 3));
    } else {
      fetchPosts();
    }
  }, [search, searchQuery, postsMentions, fetchPosts]);

  if (onlyData) {
    return null;
  }
  if (loading) return <SectionLoader sectionTitle={'Bluesky Mentions'} />;

  if (!posts || posts.length === 0 || onlyData) {
    return null;
  }

  return (
    <div>
      <SectionTitle>Bluesky Mentions</SectionTitle>
      {posts.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  );
};

export default BlueSky;
