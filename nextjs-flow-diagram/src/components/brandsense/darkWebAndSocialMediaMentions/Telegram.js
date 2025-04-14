'use client';
import SectionLoader from '@/components/SectionLoader';
import { classifyPosts } from '@/lib/api/classify';
import { setTelegramMentions } from '@/lib/features/posts/postsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useCallback, useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';
import checkSearchQuery from '@/utils/checkSearchQuery';

const TelegramMentions = ({ keyword, search, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const dispatch = useAppDispatch();
  // console.log('from telegram page: ', keyword);

  const telegramMentions = useAppSelector(
    (state) => state.posts.telegramMentions,
  );

  // useEffect(() => {
  //   if (searchQuery === domain) {
  //     setPosts(telegramMentions.slice(0, 3));
  //   }
  // }, [searchQuery, domain, telegramMentions]);

  // wrap in useCallback to prevent re-rendering
  const fetchTelegramPosts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/telegramPosts', {
        method: 'POST',
        body: JSON.stringify({
          keyword,
        }),
      });
      const rawPosts = await res.json();
      // console.log('telegram posts', rawPosts);
      if (!rawPosts || rawPosts.length === 0) {
        setLoading(false);
        return;
      }

      const normalizedPosts = normalizePosts(rawPosts, 'telegram');
      // console.log('normalized: ', normalizedPosts);

      const classifiedPosts = await classifyPosts(normalizedPosts);

      // console.log('classifiedPosts', classifiedPosts);
      dispatch(setTelegramMentions(classifiedPosts));

      setPosts(classifiedPosts.slice(0, 3)); // Show only 2-3 posts
    } catch (error) {
      console.error('Telegram API Error:', error);
    } finally {
      setLoading(false);
    }
    //
  }, [keyword, dispatch]);

  useEffect(() => {
    // const fetchTelegramPosts = async () => {
    //   try {
    //     setLoading(true);
    //     const res = await fetch('/api/telegramPosts', {
    //       method: 'POST',
    //       body: JSON.stringify({
    //         keyword,
    //       }),
    //     });
    //     const rawPosts = await res.json();
    //     // console.log('telegram posts', rawPosts);
    //     if (!rawPosts || rawPosts.length === 0) {
    //       setLoading(false);
    //       return;
    //     }

    //     const normalizedPosts = normalizePosts(rawPosts, 'telegram');
    //     // console.log('normalized: ', normalizedPosts);

    //     const classifiedPosts = await classifyPosts(normalizedPosts);

    //     // console.log('classifiedPosts', classifiedPosts);
    //     dispatch(setTelegramMentions(classifiedPosts));

    //     setPosts(classifiedPosts.slice(0, 3)); // Show only 2-3 posts
    //   } catch (error) {
    //     console.error('Telegram API Error:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    //   //
    // };

    // if (searchQuery  === search) {
    //   setPosts(telegramMentions.slice(0, 3));
    // } else if (telegramMentions?.length == 0) {
    //   fetchTelegramPosts();
    // }

    // Extract domains from searchQuery without .com, .ru, etc.

    if (checkSearchQuery(searchQuery, search)) {
      setPosts(telegramMentions.slice(0, 3));
    } else {
      console.log(searchQuery, search);

      fetchTelegramPosts();
    }
  }, [
    keyword,
    search,
    searchQuery,
    telegramMentions,
    dispatch,
    fetchTelegramPosts,
  ]);

  if (onlyData) {
    return null;
  }

  if (loading) return <SectionLoader sectionTitle={'Telegram Mentions'} />;

  if (!posts || posts.length === 0 || onlyData) {
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
