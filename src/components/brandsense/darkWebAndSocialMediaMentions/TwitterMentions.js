'use client'
import { classifyPosts } from '@/lib/api/classify';
import { setTwitterMentions } from '@/lib/features/posts/postsSlices';
import { useAppDispatch } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';


const TwitterMentions = ({ keyword }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        // twitter
        const twitterRes = await fetch('/api/fetchApifyPosts', {
          method: 'POST',
          body: JSON.stringify({
            input: {
              searchTerms: [
                keyword, // replace with keyword domain
              ],
              sort: 'Latest',
              maxItems: 10,
            },
            url: 'apidojo/twitter-scraper-lite',
          }),
        });
        const twitterPosts = await twitterRes.json();
        console.log('twitter posts: ', twitterPosts);

        const normalizedPosts = normalizePosts(twitterPosts, 'twitter');
        console.log('normalized: ', normalizedPosts);
        
        const classifiedPosts = await classifyPosts(normalizedPosts);

        console.log('classifiedPosts', classifiedPosts);
        dispatch(setTwitterMentions(classifiedPosts))
    
        setPosts(classifiedPosts.slice(0, 3)); // Show only 2-3 posts
      } catch (error) {
        console.error('Instagram API Error:', error);
      }finally{
        setLoading(false)
      }
    };

    fetchPosts();
  }, [keyword]);

  if (posts.length === 0 || loading) {
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
