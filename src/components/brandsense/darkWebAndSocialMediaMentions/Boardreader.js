'use client';
import { classifyPosts } from '@/lib/api/classify';
import {
  setBoardreader,
  setDarkWebXSSMentions,
} from '@/lib/features/posts/postsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';
import SectionLoader from '@/components/SectionLoader';

const Boardreader = ({ keyword, search, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const darkWebXSSMentions = useAppSelector((state) => state.posts.boardreader);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Dark Web - XSS
        // const darkwebXssRes = await fetch('/api/darkWebPosts', {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     input: {
        //       keyword: keyword,
        //       amount: 10,
        //       from_date: '01/01/2025',
        //       to_date: new Date()
        //         .toLocaleDateString('en-US', {
        //           month: '2-digit',
        //           day: '2-digit',
        //           year: 'numeric',
        //         })
        //         .replace(/\//g, '/'), // Format: MM/DD/YYYY
        //     },
        //     url: 'http://107.189.26.43:5002/scrape',
        //   }),
        // });

        const darkwebXssRes = await fetch('/api/boardreader', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            keyword: keyword,
          }),
        });

        let darkwebXssPosts = await darkwebXssRes.json();
        darkwebXssPosts = darkwebXssPosts?.posts;
        // console.log('darkweb Xss posts: ', darkwebXssPosts);

        if (!darkwebXssPosts || darkwebXssPosts.length === 0) {
          setLoading(false);
          return;
        }

        const normalizedXssPosts = normalizePosts(
          darkwebXssPosts,
          'darkwebxss',
        );
        // console.log('normalized Xss: ', normalizedXssPosts);

        const classifiedXssPosts = await classifyPosts(normalizedXssPosts);
        // console.log('classifiedXssPosts', classifiedXssPosts);
        dispatch(setBoardreader(classifiedXssPosts));

        // setPosts((prevPosts) => [
        //   ...prevPosts,
        //   ...classifiedXssPosts.slice(0, 3),
        // ]); // Show only 2-3 posts

        setPosts(classifiedXssPosts.slice(0, 3));
      } catch (error) {
        console.error('Dark Web API Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery === search) {
      setPosts(darkWebXSSMentions.slice(0, 3));
    } else {
      fetchPosts();
    }
  }, [keyword, search, searchQuery, darkWebXSSMentions, dispatch]);

  if (onlyData) {
    return null;
  }
  if (loading) return <SectionLoader sectionTitle={'Boardreader'} />;

  if (!posts || posts.length === 0 || onlyData) {
    return null;
  }

  return (
    <div>
      <SectionTitle>Boardreader</SectionTitle>
      {posts?.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  );
};

export default Boardreader;
