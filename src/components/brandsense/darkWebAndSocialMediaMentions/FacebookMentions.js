'use client';
import SectionLoader from '@/components/SectionLoader';
import { classifyPosts } from '@/lib/api/classify';
import { setFacebookMentions } from '@/lib/features/posts/postsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';
import checkSearchQuery from '@/utils/checkSearchQuery';
import { useCallback } from 'react';

const FacebookMentions = ({ keyword, search, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const facebookMentions = useAppSelector(
    (state) => state.posts.facebookMentions,
  );

  const dispatch = useAppDispatch();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);

      // First fetch a small batch to display quickly
      let initialResponse = await fetch('/api/facebookPosts', {
        method: 'POST',
        body: JSON.stringify({
          keyword: keyword,
        }),
      });

      let initialPosts = await initialResponse.json();
      console.log(initialPosts);
      if (!initialPosts) {
        setLoading(false);
        return;
      }

      // Normalize and classify the initial posts for display
      let initialNormalizedPosts = normalizePosts(
        initialPosts?.results,
        'facebook',
      );
      let initialClassifiedPosts = await classifyPosts(initialNormalizedPosts);

      // // Display the first few posts immediately
      setPosts(initialClassifiedPosts.slice(0, 3));
      dispatch(setFacebookMentions(initialClassifiedPosts));

      if (initialNormalizedPosts?.results?.length > 0) {
        setLoading(false);
      }

      let count = initialPosts?.results?.length;

      // console.log(initialPosts?.cursor, facebookMentions?.length);
      // console.log(count);

      console.log(!initialPosts?.cursor && count < 100);
      while (initialPosts?.cursor && count < 100) {
        console.log('inside while');

        // First fetch a small batch to display quickly
        initialResponse = await fetch('/api/facebookPosts', {
          method: 'POST',
          body: JSON.stringify({
            keyword: keyword,
            cursor: initialPosts.cursor,
          }),
        });

        initialPosts = await initialResponse.json();
        if (!initialPosts) {
          setLoading(false);
          return;
        }

        // Normalize and classify the initial posts for display
        initialNormalizedPosts = normalizePosts(
          initialPosts?.results,
          'facebook',
        );
        initialClassifiedPosts = await classifyPosts(initialNormalizedPosts);
        dispatch(setFacebookMentions(initialClassifiedPosts));

        count += initialPosts?.results?.length;
      }

      // initialPosts = initialPosts?.posts;

      // if (!initialPosts || initialPosts.length === 0) {
      //   setLoading(false);
      //   return;
      // }

      // // Normalize and classify the initial posts for display
      // const initialNormalizedPosts = normalizePosts(initialPosts, 'facebook');
      // const initialClassifiedPosts = await classifyPosts(
      //   initialNormalizedPosts,
      // );

      // // Display the first few posts immediately
      // setPosts(initialClassifiedPosts.slice(0, 3));
      // dispatch(setFacebookMentions(initialClassifiedPosts));

      // Then fetch all posts in the background
      // const fullResponse = await fetch('/api/facebookPosts', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     keyword: keyword,
      //     fetchAll: true,
      //   }),
      // });

      // let allPosts = await fullResponse.json();
      // allPosts = allPosts?.posts;

      // if (allPosts && allPosts.length > 0) {
      //   // Normalize and classify all posts
      //   const allNormalizedPosts = normalizePosts(allPosts, 'facebook');
      //   const allClassifiedPosts = await classifyPosts(allNormalizedPosts);

      //   // Store all posts in Redux
      //   dispatch(setFacebookMentions(allClassifiedPosts));
      // } else {
      //   // If no additional posts were found, store the initial ones
      //   dispatch(setFacebookMentions(initialClassifiedPosts));
      // }
    } catch (error) {
      console.error('Facebook API Error:', error);
    } finally {
      setLoading(false);
    }
  }, [keyword, dispatch]);

  useEffect(() => {
    if (checkSearchQuery(searchQuery, search)) {
      setPosts(facebookMentions.slice(0, 3));
    } else {
      fetchPosts();
    }
  }, [search, searchQuery, facebookMentions, fetchPosts]);

  if (onlyData) {
    return null;
  }
  if (posts.length == 0)
    return <SectionLoader sectionTitle={'Facebook Mentions'} />;

  if (!posts || posts.length === 0 || onlyData) {
    return null;
  }

  return (
    <div>
      <SectionTitle>Facebook Mentions</SectionTitle>
      {posts.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  );
};

export default FacebookMentions;
