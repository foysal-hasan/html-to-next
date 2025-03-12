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

// const fetchInstagramPosts =  (keyword)=> {
//   return async () => {
//       const res = await fetch('/api/fetchApifyPosts', {
//         method: 'POST',
//         body: JSON.stringify({
//           input: { search: keyword, searchType: 'hashtag', searchLimit: 1 },
//           url: 'apify/instagram-search-scraper',
//         }),
//       });

//       const rawPosts = await res.json();
//       console.log('raw posts: ', rawPosts);

//       if (!rawPosts || rawPosts.length === 0) {
//         setLoading(false);
//         return;
//       }

//       const normalizedPosts = normalizePosts(
//         rawPosts[0]?.topPosts || [],
//         'instagram',
//       );
//       // console.log('normalized: ', normalizedPosts);

//       const classifiedPosts = await classifyPosts(normalizedPosts);

//       // console.log('classifiedPosts', classifiedPosts);

//       return classifiedPosts;
//     }
//   }

//   const fetchTelegramPosts = (keyword, dispatch) => {
//     return async () => {
//         const res = await fetch('/api/telegramPosts', {
//           method: 'POST',
//           body: JSON.stringify({
//             keyword,
//           }),
//         });
//         const rawPosts = await res.json();
//         // console.log('telegram posts', rawPosts);
//         if (!rawPosts || rawPosts.length === 0) {
//           setLoading(false);
//           return;
//         }

//         const normalizedPosts = normalizePosts(rawPosts, 'telegram');
//         // console.log('normalized: ', normalizedPosts);

//         const classifiedPosts = await classifyPosts(normalizedPosts);

//         console.log('classifiedPosts', classifiedPosts);
//         dispatch(setTelegramMentions(classifiedPosts));
//       }
//       // telegram end
// }

export default function RenderPostsPage({ domain }) {
  const allPosts = useAppSelector((state) => state.posts.allPosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    riskLevel: '',
  });

  console.log('selected post: ', selectedPost);
  // const dispatch = useAppDispatch()

  // useEffect(()=>{
  //   dispatch(reset())
  // }, [domain])

  useEffect(() => {
    setSelectedPost(allPosts[0]);
  }, [domain, allPosts]);

  if (allPosts?.length <= 0) return <SectionLoader sectionTitle={'Posts'} />;

  console.log('all posts: ', allPosts);

  const filteredPosts = allPosts ? filterPosts(allPosts, filters) : [];
  console.log(allPosts);

  // if (!allPosts || allPosts?.length <= 0) return null;

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
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Posts List */}
            <div
              className="lg:col-span-1 max-h-[calc(100vh-12rem)] overflow-y-auto overflow-x-hidden pr-2"
              onScroll={handleScroll}
              style={{
                // scrollbarWidth: 'thin',
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

            {/* Preview Panel */}
            {/* <div className="lg:col-span-2 bg-gray-800 rounded-lg overflow-hidden min-h-[calc(100vh-12rem)]">
                  <div className="p-6 text-white">
                    <h2 className="text-2xl font-bold mb-6">Post Preview</h2>
                    <div className="space-y-6">
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <strong className="block text-gray-300 mb-2">Date</strong>
                        <p>{selectedPost?.date}</p>
                      </div>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <strong className="block text-gray-300 mb-2">Content</strong>
                        <p className="break-words">{selectedPost?.content}</p>
                      </div>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <strong className="block text-gray-300 mb-2">Risk Level</strong>
                        <p className={`inline-block px-3 py-1 rounded-full ${
                          selectedPost?.risk === 'high' ? 'bg-red-500/20 text-red-300' :
                          selectedPost?.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {selectedPost?.risk}
                        </p>
                      </div>
                      <Link
                        href={`https://${selectedPost?.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Original Post
                      </Link>
                    </div>
                  </div>

            </div> */}
            <PostPreview post={selectedPost} />
          </div>
        </div>
      </div>
    </main>
  );
}
