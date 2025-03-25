'use client';
import { classifyPosts } from '@/lib/api/classify';
import { setDarkWebPosts } from '@/lib/features/posts/postsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import normalizePosts from '@/utils/normalizePosts';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from '../DarkWebAndSocialMediaMentionsCard';
import SectionTitle from '../SectionTitle';
import SectionLoader from '@/components/SectionLoader';

const DarkWebPosts = ({ keyword, search, onlyData }) => {
  const [posts, setPosts] = useState([]);
  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  const darkWebPosts = useAppSelector((state) => state.posts.darkWebPosts);

  useEffect(() => {
    if (searchQuery === search) {
      setPosts(darkWebPosts.slice(0, 3));
    }
  }, [searchQuery, search, darkWebPosts]);

  if (onlyData) {
    return null;
  }
  if (posts.length === 0)
    return <SectionLoader sectionTitle={'Dark Web Posts'} />;

  if (!posts || posts.length === 0 || onlyData) {
    return null;
  }

  return (
    <div>
      <SectionTitle>Dark Web Posts</SectionTitle>
      {posts?.map((post, index) => (
        <DarkWebAndSocialMediaMentionsCard key={index} {...post} />
      ))}
    </div>
  );
};

export default DarkWebPosts;
