'use client';
import { classifyPosts } from '@/lib/api/classify';
import { setTwitterMentions } from '@/lib/features/posts/postsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useCallback, useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';
import SectionLoader from '@/components/SectionLoader';
import checkSearchQuery from '@/utils/checkSearchQuery';

const TwitterMentions = ({ keywords, search, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  const twitterMentions = useAppSelector(
    (state) => state.posts.twitterMentions,
  );

  const dispatch = useAppDispatch();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      // twitter
      const twitterRes = await fetch('/api/fetchApifyPosts', {
        method: 'POST',
        body: JSON.stringify({
          input: {
            searchTerms: keywords,
            sort: 'Latest',
            maxItems: 100,
          },
          url: 'apidojo/twitter-scraper-lite',
        }),
      });
      const twitterPosts = await twitterRes.json();
      // console.log('twitter posts: ', twitterPosts);
      if (!twitterPosts || twitterPosts.length === 0) {
        setLoading(false);
        return;
      }

      const normalizedPosts = normalizePosts(twitterPosts, 'twitter');
      // console.log('normalized: ', normalizedPosts);

      const classifiedPosts = await classifyPosts(normalizedPosts);

      // console.log('classifiedPosts', classifiedPosts);
      dispatch(setTwitterMentions(classifiedPosts));

      setPosts(classifiedPosts.slice(0, 3)); // Show only 2-3 posts
    } catch (error) {
      // console.error('Instagram API Error:', error);
    } finally {
      setLoading(false);
    }
  }, [keywords, dispatch]);

  useEffect(() => {
    if (checkSearchQuery(searchQuery, search)) {
      setPosts(twitterMentions.slice(0, 3));
    } else {
      fetchPosts();
    }
  }, [search, searchQuery, twitterMentions, fetchPosts]);

  if (onlyData) {
    return null;
  }
  if (loading) return <SectionLoader sectionTitle={'Twitter Mentions'} />;

  if (!posts || posts.length === 0 || onlyData) {
    return null;
  }

  return (
    <div>
      <SectionTitle>Twitter Mentions</SectionTitle>
      {posts.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  );
};

export default TwitterMentions;
