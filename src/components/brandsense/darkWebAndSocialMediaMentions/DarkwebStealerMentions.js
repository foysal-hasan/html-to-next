'use client';
import { classifyPosts } from '@/lib/api/classify';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';
import { setDarkWebStealerMentions } from '@/lib/features/posts/postsSlices';
import SectionLoader from '@/components/SectionLoader';

const DarkwebStealerMentions = ({ keyword, domain, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const darkWebStealerMentions = useAppSelector(
    (state) => state.posts.darkWebStealerMentions,
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchDarkWebStealerPosts = async () => {
      try {
        setLoading(true);
        const darkwebStealerRes = await fetch('/api/darkWebPosts', {
          method: 'POST',
          body: JSON.stringify({
            input: {
              keyword: keyword,
              from_date: '01/01/2025',
              to_date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }),
            },
            url: 'http://172.86.116.124:5003/search',
          }),
        });
        const darkwebStealerPosts = await darkwebStealerRes.json();
        // console.log('darkweb Stealer posts: ', darkwebStealerPosts);

        if (!darkwebStealerPosts || darkwebStealerPosts.length === 0) {
          setLoading(false);
          return;
        }

        const normalizedPosts = normalizePosts(darkwebStealerPosts, 'darkweb');
        // console.log('normalized: ', normalizedPosts);

        const classifiedPosts = await classifyPosts(normalizedPosts);
        // console.log('classifiedPosts', classifiedPosts);
        dispatch(setDarkWebStealerMentions(classifiedPosts));

        setPosts(classifiedPosts.slice(0, 3)); // Show only 2-3 posts
      } catch (error) {
        console.error('Dark Web API Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery === domain) {
      setPosts(darkWebStealerMentions.slice(0, 3));
    } else {
      fetchDarkWebStealerPosts();
    }
  }, [keyword]);

  if (onlyData) {
    return null;
  }

  if (loading)
    return <SectionLoader sectionTitle={'Dark Web Stealer Mentions'} />;
  if (!posts || posts.length === 0 || onlyData) {
    return null;
  }

  return (
    <div>
      <SectionTitle>Dark Web Stealer Mentions</SectionTitle>
      {posts.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  );
};

export default DarkwebStealerMentions;
