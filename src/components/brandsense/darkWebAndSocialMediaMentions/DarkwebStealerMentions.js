'use client'
import { classifyPosts } from '@/lib/api/classify';
import { useAppDispatch } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';
import { setDarkWebStealerMentions } from '@/lib/features/posts/postsSlices';

const DarkwebStealerMentions = ({ keyword }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false)


  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchDarkWebStealerPosts = async () => {
      try {
        setLoading(true)
        const darkwebStealerRes = await fetch('/api/darkWebPosts', {
          method: 'POST',
          body: JSON.stringify({
            input: {
              keyword: keyword,
            },
            url: 'http://172.86.116.124:5003/search',
          }),
        });
        const darkwebStealerPosts = await darkwebStealerRes.json();
        console.log('darkweb Stealer posts: ', darkwebStealerPosts);

        const normalizedPosts = normalizePosts(darkwebStealerPosts, 'darkweb');
        console.log('normalized: ', normalizedPosts);

        const classifiedPosts = await classifyPosts(normalizedPosts);
        console.log('classifiedPosts', classifiedPosts);
        dispatch(setDarkWebStealerMentions(classifiedPosts))


        setPosts(classifiedPosts.slice(0, 3)); // Show only 2-3 posts
      } catch (error) {
        console.error('Dark Web API Error:', error);
      }finally{
        setLoading(false)
      }
    };

    fetchDarkWebStealerPosts();
  }, [keyword]);

if (posts.length === 0 || loading) {
    return null;
  }

  return (
    <div>
      <SectionTitle>Dark Web Stealer Mentions</SectionTitle>
      {posts.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  )
};

export default DarkwebStealerMentions;
