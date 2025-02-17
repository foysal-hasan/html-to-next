'use client'
import { classifyPosts } from '@/lib/api/classify';
import { setTelegramMentions } from '@/lib/features/posts/postsSlices';
import { useAppDispatch } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';

const TelegramMentions = ({ keyword }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch();
  console.log("from telegram page: ", keyword);
  

  useEffect(() => {
    const fetchTelegramPosts = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/telegramPosts', {
          method: 'POST',
          body: JSON.stringify({
            keyword
          })
        });
        const rawPosts = await res.json();
        console.log('telegram posts', rawPosts);
        
        const normalizedPosts = normalizePosts(rawPosts, 'telegram');
        console.log('normalized: ', normalizedPosts);
        
        const classifiedPosts = await classifyPosts(normalizedPosts);

        console.log('classifiedPosts', classifiedPosts);
        dispatch(setTelegramMentions(classifiedPosts))
  
        setPosts(classifiedPosts.slice(0, 3)); // Show only 2-3 posts
      } catch (error) {
        console.error('Telegram API Error:', error);
      }finally{
        setLoading(false)
      }
    };

    fetchTelegramPosts();
  }, [keyword]);

  if (posts.length === 0 || loading) {
    return null;
  }

  return (
    <div>
      <SectionTitle>Telegram Mentions</SectionTitle> 
      {posts.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  );
};

export default TelegramMentions;
