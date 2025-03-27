'use client';
import SectionLoader from '@/components/SectionLoader';
import { classifyPosts } from '@/lib/api/classify';
import { setInstagramMentions } from '@/lib/features/posts/postsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';

const InstagramMentions = ({ keywords, search, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const instagramMentions = useAppSelector(
    (state) => state.posts.instagramMentions,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/fetchApifyPosts', {
          method: 'POST',
          body: JSON.stringify({
            input: {
              hashtags: keywords,
              resultsType: 'posts',
              resultsLimit: 100,
            },
            url: 'apify/instagram-hashtag-scraper',
          }),
        });

        const rawPosts = await res.json();
        // console.log('rawPosts', rawPosts);
        if (!rawPosts || rawPosts.length === 0) {
          setLoading(false);
          return;
        }

        const normalizedPosts = normalizePosts(rawPosts || [], 'Instagram');

        // console.log('normalizedPosts', normalizedPosts);
        const classifiedPosts = await classifyPosts(normalizedPosts);
        dispatch(setInstagramMentions(classifiedPosts));

        setPosts(classifiedPosts.slice(0, 3)); // Show only 2-3 posts
      } catch (error) {
        console.error('Instagram API Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery === search) {
      setPosts(instagramMentions?.slice(0, 3));
    } else {
      fetchInstagramPosts();
    }
  }, [keywords, search, searchQuery, instagramMentions, dispatch]);

  if (onlyData) {
    return null;
  }
  if (loading) return <SectionLoader sectionTitle={'Instagram Mentions'} />;

  if (!posts || posts.length === 0 || onlyData) {
    return null;
  }

  return (
    <div>
      <SectionTitle>Instagram Mentions</SectionTitle>
      {posts?.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  );
};

export default InstagramMentions;
