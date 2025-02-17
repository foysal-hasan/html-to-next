'use client'
import { classifyPosts } from '@/lib/api/classify';
import { useAppDispatch } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';
import { setTelegramMentions } from '@/lib/features/posts/postsSlices';

const TelegramMentions = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTelegramPosts = async () => {
      try {
        const res = await fetch('/api/telegramPosts');
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
      }
    };

    fetchTelegramPosts();
  }, []);

  if (posts.length === 0) {
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
