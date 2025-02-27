'use client';
import SectionLoader from '@/components/SectionLoader';
import { classifyPosts } from '@/lib/api/classify';
import { setDarkWebFacebookMentions } from '@/lib/features/posts/postsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';

const DarkwebFacebookPosts = ({ keyword, domain, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const darkWebFacebookMentions = useAppSelector(
    (state) => state.posts.darkWebFacebookMentions,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        // Dark Web - Facebook
        const darkwebFacebookRes = await fetch('/api/darkWebPosts', {
          method: 'POST',
          body: JSON.stringify({
            input: {
              keyword: keyword,
              amount: 20,
              from_date: '01/01/2000',
              to_date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }),
            },
            url: 'http://172.86.116.124:5002/scrape',
          }),
        });
        const darkwebFacebookPosts = await darkwebFacebookRes.json();
        // console.log('darkweb Facebook posts: ', darkwebFacebookPosts);
        if (!darkwebFacebookPosts || darkwebFacebookPosts.length === 0) {
          setLoading(false);
          return;
        }


        const normalizedPosts = normalizePosts(
          darkwebFacebookPosts,
          'darkwebfacebook',
        );
        // console.log('normalized: ', normalizedPosts);

        const classifiedPosts = await classifyPosts(normalizedPosts);
        // console.log('classifiedPosts', classifiedPosts);
        dispatch(setDarkWebFacebookMentions(classifiedPosts));

        setPosts(classifiedPosts.slice(0, 3)); // Show only 2-3 posts
      } catch (error) {
        console.error('Dark Web API Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery === domain) {
      setPosts(darkWebFacebookMentions.slice(0, 3));
    } else {
      fetchPosts();
    }
  }, [keyword]);

  
  if (onlyData) {
    return null;
  }
  if (loading) return <SectionLoader sectionTitle={'Dark Web Facebook Mentions'} />;
  if (!posts || posts.length === 0 || onlyData) {
    return null;
  }
  
  return (
    <div>
      <SectionTitle>Dark Web Facebook Mentions</SectionTitle>
      {posts.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  );
};

export default DarkwebFacebookPosts;
