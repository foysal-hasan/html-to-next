'use client';
import DarkWebAndSocialMediaMentionsCard from '@/components/brandsense/DarkWebAndSocialMediaMentionsCard';
import { classifyPosts } from '@/lib/api/classify';
import {
  setDarkWebFacebookMentions,
  setDarkWebStealerMentions,
  setDarkWebXSSMentions,
  setFacebookMentions,
  setInstagramMentions,
  setPostsMentions,
  setTelegramMentions,
  setTwitterMentions,
} from '@/lib/features/posts/postsSlices';
import { setSearchQuery } from '@/lib/features/search/searchSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import filterPosts from '@/utils/filterPosts';
import normalizePosts from '@/utils/normalizePosts';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SectionLoader from '../SectionLoader';
import {
  darkwebFacebook,
  darkwebStealer,
  darkwebXss,
  facebook,
  instagram,
  postsMentions,
  telegram,
  twitter,
} from './enum';

const FacebookPostPreview = ({ post }) => {
  return (
    <div
      className="p-4 rounded text-white break-all"
      style={{ height: 'auto' }}
    >
      <h2 className="text-xl font-bold mb-2">Post Preview</h2>
      {post?.image && (
        <img src={post?.image?.uri} alt="Post Image" className="my-4" />
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

const TelegramPostPreview = ({ post }) => {
  return (
    <div
      className="p-4 rounded text-white break-all"
      style={{ height: 'auto' }}
    >
      <h2 className="text-xl font-bold mb-2">Post Preview</h2>
      {post?.media?.file_url && (
        <img src={post.media.file_url} alt="Post Image" className="my-4" />
      )}
      <p>
        <strong>Date:</strong> {new Date(post?.date * 1000).toLocaleString()}
      </p>
      <p>
        <strong>Content:</strong>{' '}
        <span dangerouslySetInnerHTML={{ __html: post?.content }} />
      </p>
      <p>
        <strong>Risk:</strong> {post?.risk}
      </p>

      <Link
        href={`https://${post?.link || ''}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500"
      >
        View Post
      </Link>
    </div>
  );
};


const PostsMentionPreview = ({ post }) => {
  return (
    <div
      className="p-4 rounded text-white break-all"
      style={{ height: 'auto' }}
    >
      <h2 className="text-xl font-bold mb-2">Post Preview</h2>
      {post?.images && (
        <div className="my-4 grid grid-cols-1 gap-2">
          {post.images.map((image, index) => (
            <img
              key={index}
              src={image?.thumb}
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

export default function RenderPosts({ domain, source }) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [visiblePosts, setVisiblePosts] = useState(5);

  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  const storePosts = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  // console.log('search: ', searchQuery);
  // console.log('domain: ', domain);
  // console.log('search === domain', searchQuery === domain);
  console.log('dark web fecbook', storePosts?.darkWebFacebookMentions);

  const keyword = domain.split('.')[0];

  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    riskLevel: '',
  });

  useEffect(() => {
    console.log('working', keyword);
    setPosts([]);
    const fetchPosts = async () => {
      try {
        setLoading(true);

        // instagram start
        if (source === instagram) {
          const res = await fetch('/api/fetchApifyPosts', {
            method: 'POST',
            body: JSON.stringify({
              input: { search: keyword, searchType: 'hashtag', searchLimit: 1 },
              url: 'apify/instagram-search-scraper',
            }),
          });

          const rawPosts = await res.json();
          console.log('raw posts: ', rawPosts);

          if (!rawPosts || rawPosts.length === 0) {
            setLoading(false);
            return;
          }

          const normalizedPosts = normalizePosts(
            rawPosts[0]?.topPosts || [],
            'instagram',
          );
          console.log('normalized: ', normalizedPosts);

          const classifiedPosts = await classifyPosts(normalizedPosts);

          console.log('classifiedPosts', classifiedPosts);
          dispatch(setInstagramMentions(classifiedPosts));

          setPosts(classifiedPosts);
          setSelectedPost(classifiedPosts[0]);
        }
        // instagram end

        // facebook start
        if (source === facebook) {
          const facebookRes = await fetch('/api/fetchApifyPosts', {
            method: 'POST',
            body: JSON.stringify({
              input: {
                query: keyword, // replace with domain keyword
                search_type: 'posts',
                recent_posts: true,
                max_posts: 10,
                max_retries: 5,
                proxy: {
                  useApifyProxy: true,
                },
              },
              url: 'danek/facebook-search-rental',
            }),
          });

          const facebookPosts = await facebookRes.json();
          // console.log('facebook posts: ', facebookPosts);

          if (!facebookPosts || facebookPosts.length === 0) {
            setLoading(false);
            return;
          }

          const normalizedPosts = normalizePosts(facebookPosts, 'facebook');
          // console.log('normalized: ', normalizedPosts);

          const classifiedPosts = await classifyPosts(normalizedPosts);

          // console.log('classifiedPosts', classifiedPosts);
          dispatch(setFacebookMentions(classifiedPosts));

          setPosts(classifiedPosts);
          setSelectedPost(classifiedPosts[0]);
        }
        // facebook end

        // twitter start
        if (source === twitter) {
          // twitter
          const twitterRes = await fetch('/api/fetchApifyPosts', {
            method: 'POST',
            body: JSON.stringify({
              input: {
                searchTerms: [
                  keyword, // replace with keyword domain
                ],
                sort: 'Latest',
                maxItems: 10,
              },
              url: 'apidojo/twitter-scraper-lite',
            }),
          });
          const twitterPosts = await twitterRes.json();
          // console.log('twitter posts: ', twitterPosts);
          if (!twitterPosts || twitterPosts.length === 0) {
            setLoading(false);
            return;
          }

          const normalizedPosts = normalizePosts(twitterPosts, 'twitter');
          // console.log('normalized: ', normalizedPosts);

          const classifiedPosts = await classifyPosts(normalizedPosts);

          // console.log('classifiedPosts', classifiedPosts);
          dispatch(setTwitterMentions(classifiedPosts));

          setPosts(classifiedPosts);
          setSelectedPost(classifiedPosts[0]);
        }
        // twitter end

        // telegram start
        if (source === telegram) {
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
          setPosts(classifiedPosts);
          setSelectedPost(classifiedPosts[0]);
        }
        // telegram end

        // Posts start
        if (source === postsMentions) {
          const postsRes = await fetch('/api/fetchApifyPosts', {
            method: 'POST',
            body: JSON.stringify({
              input: {
                queries: [keyword],
                limit: 20,
                sort: 'latest',
                proxyConfiguration: {
                  useApifyProxy: true,
                  apifyProxyGroups: [],
                },
              },
              url: 'U9JtSIIjR6gyldBIN',
            }),
          });
          const postsResponse = await postsRes.json();
          // console.log('twitter posts: ', twitterPosts);
          if (!postsResponse || postsResponse.length === 0) {
            setLoading(false);
            return;
          }

          const normalizedPosts = normalizePosts(postsResponse, 'posts');
          // console.log('normalized: ', normalizedPosts);

          const classifiedPosts = await classifyPosts(normalizedPosts);

          // console.log('classifiedPosts', classifiedPosts);
          dispatch(setPostsMentions(classifiedPosts));

          setPosts(classifiedPosts);
          setSelectedPost(classifiedPosts[0]);
        }
        // posts end

        // darkwebFacebook start
        if (source === darkwebFacebook) {
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
          console.log('classifiedPosts', classifiedPosts);
          dispatch(setDarkWebFacebookMentions(classifiedPosts));

          setPosts(classifiedPosts);
          setSelectedPost(classifiedPosts[0]);
        }
        // darkwebFacebook end

        // darkwebXss start
        if (source === darkwebXss) {
          const darkwebXssRes = await fetch('/api/darkWebPosts', {
            method: 'POST',
            body: JSON.stringify({
              input: {
                keyword: keyword,
                start_date: '2025-01-01',
                end_date: '2025-01-10',
              },
              url: 'http://172.86.116.124:5004/search_xss',
            }),
          });
          const darkwebXssPosts = await darkwebXssRes.json();
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
          dispatch(setDarkWebXSSMentions(classifiedXssPosts));

          setPosts(classifiedXssPosts);
          setSelectedPost(classifiedXssPosts[0]);
        }
        // darkwebXss end

        // darkwebStealer start
        if (source === darkwebStealer) {
          const darkwebStealerRes = await fetch('/api/darkWebPosts', {
            method: 'POST',
            body: JSON.stringify({
              input: {
                keyword: keyword,
                start_date: '2025-01-01',
                end_date: '2025-01-10',
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

          const normalizedPosts = normalizePosts(
            darkwebStealerPosts,
            'darkweb',
          );
          // console.log('normalized: ', normalizedPosts);

          const classifiedPosts = await classifyPosts(normalizedPosts);
          // console.log('classifiedPosts', classifiedPosts);
          dispatch(setDarkWebStealerMentions(classifiedPosts));

          setPosts(classifiedPosts);
          setSelectedPost(classifiedPosts[0]);
        }
        // darkwebStealer end
      } catch (error) {
        console.log(error);
        console.log('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery === domain) {
      switch (source) {
        case telegram:
          if (storePosts.telegramMentions?.length > 0) {
            setPosts(storePosts.telegramMentions);
            setSelectedPost(storePosts.telegramMentions[0]);
          }
          break;
        case twitter:
          if (storePosts.twitterMentions?.length > 0) {
            setPosts(storePosts.twitterMentions);
            setSelectedPost(storePosts.twitterMentions[0]);
          }
          break;
        case postsMentions:
          if (storePosts.postsMentions?.length > 0) {
            setPosts(storePosts.postsMentions);
            setSelectedPost(storePosts.postsMentions[0]);
          }
          break;
        case facebook:
          if (storePosts.facebookMentions?.length > 0) {
            setPosts(storePosts.facebookMentions);
            setSelectedPost(storePosts.facebookMentions[0]);
          }
          break;
        case instagram:
          if (storePosts.instagramMentions?.length > 0) {
            setPosts(storePosts.instagramMentions);
            setSelectedPost(storePosts.instagramMentions[0]);
          }
          break;
        case darkwebFacebook:
          if (storePosts.darkWebFacebookMentions?.length > 0) {
            console.log(storePosts.darkWebFacebookMentions);

            setPosts(storePosts.darkWebFacebookMentions);
            setSelectedPost(storePosts.darkWebFacebookMentions[0]);
          }
          break;
        case darkwebStealer:
          if (storePosts.darkWebStealerMentions?.length > 0) {
            setPosts(storePosts.darkWebStealerMentions);
            setSelectedPost(storePosts.darkWebStealerMentions[0]);
          }
          break;
        case darkwebXss:
          if (storePosts.darkWebXSSMentions?.length > 0) {
            setPosts(storePosts.darkWebXSSMentions);
            setSelectedPost(storePosts.darkWebXSSMentions[0]);
          }
          break;
        default:
          setPosts([]);
          setSelectedPost(null);
      }
      setLoading(false);
    } else {
      dispatch(setSearchQuery(domain));
      fetchPosts();
    }

    // if (searchQuery !== domain) {
    //   dispatch(setSearchQuery(domain));
    //   fetchPosts();
    // }
  }, [domain]);

  // useEffect(()=>{
  //   console.log('---------------------------------');
  //   console.log('i am = ', searchQuery === domain && source == telegram);
  //   console.log(storePosts.telegramMentions);

  //   console.log('---------------------------------');

  //   if (searchQuery === domain && source == telegram) {
  //     setPosts(storePosts.telegramMentions)
  //   }
  // }, [])

  let sectionTitle = '';

  switch (source) {
    case telegram:
      sectionTitle = 'Telegram';
      break;
    case twitter:
      sectionTitle = 'Twitter';
      break;
    case facebook:
      sectionTitle = 'Facebook';
      break;
    case instagram:
      sectionTitle = 'Instagram';
      break;
    case darkwebFacebook:
      sectionTitle = 'Darkweb Facebook';
      break;
    case darkwebStealer:
      sectionTitle = 'Darkweb Stealer';
      break;
    case darkwebXss:
      sectionTitle = 'Darkweb XSS';
      break;
    case postsMentions:
      sectionTitle = 'Posts Mentions';
      break;
    default:
      sectionTitle = 'Posts';
  }

  console.log('Section Title: ', sectionTitle);
  console.log('loading = ', loading);

  const filteredPosts = posts ? filterPosts(posts, filters) : [];
  console.log(posts);

  if (loading) return <SectionLoader sectionTitle={sectionTitle} />;

  if (!posts || posts?.length <= 0) return null;

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
              {sectionTitle}
            </h1>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <input
                type="date"
                placeholder="Start Date"
                className="bg-gray-700 text-white border-gray-600 p-2 rounded-md flex-1 sm:flex-none min-w-[140px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              />
              <input
                type="date"
                placeholder="End Date"
                className="bg-gray-700 text-white border-gray-600 p-2 rounded-md flex-1 sm:flex-none min-w-[140px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              />
              <select
                className="bg-gray-700 text-white border-gray-600 p-2 rounded-md flex-1 sm:flex-none min-w-[140px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setFilters({ ...filters, riskLevel: e.target.value })}
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
              className="lg:col-span-1 h-[calc(100vh-12rem)] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
              onScroll={handleScroll}
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
            <div className="lg:col-span-2 bg-gray-800 rounded-lg overflow-hidden min-h-[calc(100vh-12rem)]">
              {source === facebook && <FacebookPostPreview post={selectedPost} />}
              {source === twitter && <TwitterPostPreview post={selectedPost} />}
              {source === telegram && <TelegramPostPreview post={selectedPost} />}
              {source === postsMentions && <PostsMentionPreview post={selectedPost} />}
              {source !== facebook &&
                source !== twitter &&
                source !== telegram &&
                source !== postsMentions &&
                selectedPost && (
                  <div className="p-6 text-white">
                    <h2 className="text-2xl font-bold mb-6">Post Preview</h2>
                    <div className="space-y-6">
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <strong className="block text-gray-300 mb-2">Date</strong>
                        <p>{selectedPost.date}</p>
                      </div>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <strong className="block text-gray-300 mb-2">Content</strong>
                        <p className="break-words">{selectedPost.content}</p>
                      </div>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <strong className="block text-gray-300 mb-2">Risk Level</strong>
                        <p className={`inline-block px-3 py-1 rounded-full ${
                          selectedPost.risk === 'high' ? 'bg-red-500/20 text-red-300' :
                          selectedPost.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {selectedPost.risk}
                        </p>
                      </div>
                      <Link
                        href={selectedPost.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Original Post
                      </Link>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}