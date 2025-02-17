'use client'
import { classifyPosts } from '@/lib/api/classify';
import { useAppDispatch } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';
import { setFacebookMentions } from '@/lib/features/posts/postsSlices';


const FacebookMentions = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // facebook
        const facebookRes = await fetch('/api/fetchApifyPosts', {
          method: 'POST',
          body: JSON.stringify({
            input: {
              query: 'google', // replace with domain keyword
              search_type: 'posts',
              recent_posts: true,
              max_posts: 10,
              max_retries: 5,
              proxy: {
          useApifyProxy: true,
              },
            },
            url: 'danek/facebook-search-rental',
          }),
        });

        const facebookPosts = await facebookRes.json();
        console.log('facebook posts: ', facebookPosts);

        const normalizedPosts = normalizePosts(facebookPosts, 'facebook');
        console.log('normalized: ', normalizedPosts);
        
        const classifiedPosts = await classifyPosts(normalizedPosts);

        console.log('classifiedPosts', classifiedPosts);
         dispatch(setFacebookMentions(classifiedPosts))

        setPosts(classifiedPosts.slice(0, 3)); // Show only 2-3 posts
      } catch (error) {
        console.error('Instagram API Error:', error);
      }
    };

    fetchPosts();
  }, []);

  if (posts.length === 0) {
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
