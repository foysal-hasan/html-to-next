'use client'
import { classifyPosts } from '@/lib/api/classify';
import { useAppDispatch } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';
import { setInstagramMentions } from '@/lib/features/posts/postsSlices';


const InstagramMentions = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const res = await fetch('/api/fetchApifyPosts', {
          method: 'POST',
          body: JSON.stringify({
            input: { search: 'google', searchType: 'hashtag', searchLimit: 1 },
            url: 'apify/instagram-search-scraper',
          }),
        });

        const rawPosts = await res.json();
        console.log('raw posts: ', rawPosts);
        
        const normalizedPosts = normalizePosts(rawPosts[0]?.topPosts || [], 'instagram');
        console.log('normalized: ', normalizedPosts);
        
        const classifiedPosts = await classifyPosts(normalizedPosts);

        console.log('classifiedPosts', classifiedPosts);
        dispatch(setInstagramMentions(classifiedPosts))

        setPosts(classifiedPosts.slice(0, 3)); // Show only 2-3 posts
      } catch (error) {
        console.error('Instagram API Error:', error);
      }
    };

    fetchInstagramPosts();
  }, []);

  if (posts.length === 0) {
    return null;
  }
  return (
    <div>
      <SectionTitle>Instagram Mentions</SectionTitle> 
      {posts.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  );
};

export default InstagramMentions;
