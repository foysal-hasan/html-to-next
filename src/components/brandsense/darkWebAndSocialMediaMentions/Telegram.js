'use client';
import { classifyPosts } from '@/lib/api/classify';
import { setTelegramMentions } from '@/lib/features/posts/postsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';

const TelegramMentions = ({ keyword, domain }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const dispatch = useAppDispatch();
  console.log('from telegram page: ', keyword);

  const telegramMentions = useAppSelector(
    (state) => state.posts.telegramMentions,
  );

  // useEffect(() => {
  //   if (searchQuery === domain) {
  //     setPosts(telegramMentions.slice(0, 3));
  //   }
  // }, [searchQuery, domain, telegramMentions]);

  useEffect(() => {
    const fetchTelegramPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/telegramPosts', {
          method: 'POST',
          body: JSON.stringify({
            keyword,
          }),
        });
        const rawPosts = await res.json();
        console.log('telegram posts', rawPosts);

        const normalizedPosts = normalizePosts(rawPosts, 'telegram');
        console.log('normalized: ', normalizedPosts);

        const classifiedPosts = await classifyPosts(normalizedPosts);

        console.log('classifiedPosts', classifiedPosts);
        dispatch(setTelegramMentions(classifiedPosts));

        setPosts(classifiedPosts.slice(0, 3)); // Show only 2-3 posts
      } catch (error) {
        console.error('Telegram API Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery === domain) {
      setPosts(telegramMentions.slice(0, 3));
      setLoading(false)
    } else {
      fetchTelegramPosts();
      setLoading(false)
    }
  }, [keyword, domain]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (posts.length === 0 ) {
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
