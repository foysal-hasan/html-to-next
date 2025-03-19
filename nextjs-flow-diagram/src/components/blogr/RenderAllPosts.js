'use client';
import { fetchTwitterPosts } from '@/hooks/fetchposts/twitterPosts';
import { reset } from '@/lib/features/posts/postsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import filterPosts from '@/utils/filterPosts';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchTelegramPosts } from '../../hooks/fetchposts/telegram';
import DarkWebAndSocialMediaMentionsCard from '../brandsense/DarkWebAndSocialMediaMentionsCard';
import SectionLoader from '../SectionLoader';
import PostPreview from './PostPreview';
import ExportRiskPDF from '../brandsense/download';

const TwitterPostPreview = ({ post }) => {
  return (
    <div
      className="p-4 rounded text-white break-all"
      style={{ height: 'auto' }}
    >
      <h2 className="text-xl font-bold mb-2">Post Preview</h2>
      {post?.media && post.media?.length > 0 && (
        <div className="my-4 grid grid-cols-2 gap-2">
          {post.media.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Post Image ${index + 1}`}
              className="my-2"
            />
          ))}
        </div>
      )}
      <p>
        <strong>Date:</strong> {post?.date}
      </p>
      <p>
        <strong>Content:</strong> {post?.content}
      </p>
      <p>
        <strong>Risk:</strong> {post?.risk}
      </p>

      <Link
        href={post?.link || ''}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500"
      >
        View Post
      </Link>
    </div>
  );
};

export default function RenderPostsPage({ domain }) {
  const allPosts = useAppSelector((state) => state.posts.allPosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    riskLevel: '',
    source: '',
  });

  console.log('selected post: ', selectedPost);

  useEffect(() => {
    setSelectedPost(allPosts[0]);
  }, [domain, allPosts]);

  if (allPosts?.length <= 0) return <SectionLoader sectionTitle={'Posts'} />;

  console.log('all posts: ', allPosts);

  const filteredPosts = allPosts ? filterPosts(allPosts, filters) : [];
  // console.log(allPosts);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setVisiblePosts((prev) => prev + 5);
    }
  };

  return (
    <main className="w-full min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10">
        <div className="flex justify-end mb-6">
          <ExportRiskPDF />
        </div>
        <div className="flex flex-col space-y-6">
          {/* Header and Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-800/50 p-4 rounded-lg">
            <h1 className="text-white text-2xl sm:text-3xl font-bold">
              Posts:
            </h1>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <input
                type="date"
                placeholder="Start Date"
                className="bg-gray-700 text-white border-gray-600 p-2 rounded-md flex-1 sm:flex-none min-w-[140px] focus:ring-2 focus:ring-blue-500 focus:border-transparent [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                onChange={(e) =>
                  setFilters({ ...filters, startDate: e.target.value })
                }
              />
              <input
                type="date"
                placeholder="End Date"
                className="bg-gray-700 text-white border-gray-600 p-2 rounded-md flex-1 sm:flex-none min-w-[140px] focus:ring-2 focus:ring-blue-500 focus:border-transparent [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                onChange={(e) =>
                  setFilters({ ...filters, endDate: e.target.value })
                }
              />
              <select
                className="bg-gray-700 text-white border-gray-600 p-2 rounded-md flex-1 sm:flex-none min-w-[140px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) =>
                  setFilters({ ...filters, riskLevel: e.target.value })
                }
              >
                <option value="">All Risks</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <select
                className="bg-gray-700 text-white border-gray-600 p-2 rounded-md flex-1 sm:flex-none min-w-[140px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) =>
                  setFilters({ ...filters, source: e.target.value })
                }
              >
                <option value="">All Sources</option>
                {/* <option value="telegram">Telegram</option>
                <option value="twitter">Twitter</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="darkwebxss">Dark Web XSS</option>
                <option value="breachforum">Breach Forum</option>
                <option value="darkwebfacebook">Dark Web Facebook</option> */}
                <option value="Instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="telegram">Telegram</option>
                <option value="twitter">Twitter</option>
                <option value="vk">VK</option>
                {/* <option value="darkweb">Dark Web Stealer</option>
                <option value="darkwebxss">Dark Web XSS</option> */}
                <option value="posts">Posts</option>
                <option value="searchExploit">Search Exploit</option>
                <option value="searchXss">Search XSS</option>
                <option value="breachforum">Breachforum</option>
              </select>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Posts List */}
            <div
              className="lg:col-span-1 max-h-[calc(100vh-12rem)] overflow-y-auto overflow-x-hidden pr-2"
              onScroll={handleScroll}
              style={{
                scrollbarColor: '#2dd4bf #1f2937',
              }}
            >
              <div className="space-y-4">
                {filteredPosts?.slice(0, visiblePosts).map((post, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedPost(post)}
                    className="cursor-pointer"
                  >
                    <DarkWebAndSocialMediaMentionsCard
                      url={post.link}
                      date={post.date}
                      content={post.content}
                      risk={post.risk}
                      id={post.id}
                      selectedPost={selectedPost?.id}
                      page={'blogr'}
                    />
                  </div>
                ))}
              </div>
            </div>

            <PostPreview post={selectedPost} />
          </div>
        </div>
      </div>
    </main>
  );
}
