'use client';
import SectionLoader from '@/components/SectionLoader';
import { classifyPosts } from '@/lib/api/classify';
import { setFacebookMentions } from '@/lib/features/posts/postsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';

const FacebookMentions = ({ keyword, domain, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const facebookMentions = useAppSelector(
    (state) => state.posts.facebookMentions,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // facebook
        const facebookRes = await fetch('/api/fetchApifyPosts', {
          method: 'POST',
          body: JSON.stringify({
            input: {
              query: keyword, // replace with domain keyword
              search_type: 'posts',
              recent_posts: true,
              max_posts: 100,
              max_retries: 5,
              proxy: {
                useApifyProxy: true,
              },
            },
            url: 'danek/facebook-search-rental',
          }),
        });

        const facebookPosts = await facebookRes.json();
        // console.log('facebook posts: ', facebookPosts);
        if (!facebookPosts || facebookPosts.length === 0) {
          setLoading(false);
          return;
        }

        const normalizedPosts = normalizePosts(facebookPosts, 'facebook');
        // console.log('normalized: ', normalizedPosts);

        const classifiedPosts = await classifyPosts(normalizedPosts);

        // console.log('classifiedPosts', classifiedPosts);
        dispatch(setFacebookMentions(classifiedPosts));

        setPosts(classifiedPosts.slice(0, 3)); // Show only 2-3 posts
      } catch (error) {
        console.error('Instagram API Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery === domain) {
      setPosts(facebookMentions.slice(0, 3));
    } else {
      fetchPosts();
    }
  }, [keyword, domain]);

  if (onlyData) {
    return null;
  }
  if (loading) return <SectionLoader sectionTitle={'Facebook Mentions'} />;

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
