'use client';
import DarkWebAndSocialMediaMentionsCard from '@/components/brandsense/DarkWebAndSocialMediaMentionsCard';
import { classifyPosts } from '@/lib/api/classify';
import {
  setDarkWebFacebookMentions,
  setDarkWebStealerMentions,
  setDarkWebXSSMentions,
  setFacebookMentions,
  setInstagramMentions,
  setTelegramMentions,
  setTwitterMentions,
} from '@/lib/features/posts/postsSlices';
import { setSearchQuery } from '@/lib/features/search/searchSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import filterPosts from '@/utils/filterPosts';
import normalizePosts from '@/utils/normalizePosts';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  darkwebFacebook,
  darkwebStealer,
  darkwebXss,
  facebook,
  instagram,
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

export default function RenderPosts({ domain, source }) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [visiblePosts, setVisiblePosts] = useState(5);

  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  const storePosts = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  // console.log('search: ', searchQuery);
  // console.log('domain: ', domain);
  // console.log('search === domain', searchQuery === domain);

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
        // telegram start
        if (source === telegram) {
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
          setPosts(classifiedPosts);
          setSelectedPost(classifiedPosts[0]);
        }
        // telegram end

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
          console.log('facebook posts: ', facebookPosts);

          const normalizedPosts = normalizePosts(facebookPosts, 'facebook');
          console.log('normalized: ', normalizedPosts);

          const classifiedPosts = await classifyPosts(normalizedPosts);

          console.log('classifiedPosts', classifiedPosts);
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
          console.log('twitter posts: ', twitterPosts);

          const normalizedPosts = normalizePosts(twitterPosts, 'twitter');
          console.log('normalized: ', normalizedPosts);

          const classifiedPosts = await classifyPosts(normalizedPosts);

          console.log('classifiedPosts', classifiedPosts);
          dispatch(setTwitterMentions(classifiedPosts));

          setPosts(classifiedPosts);
          setSelectedPost(classifiedPosts[0]);
        }
        // twitter end

        // darkwebFacebook start
        if (source === darkwebFacebook) {
          const darkwebFacebookRes = await fetch('/api/darkWebPosts', {
            method: 'POST',
            body: JSON.stringify({
              input: {
                keyword: keyword,
                amount: 20,
                from_date: '01/01/2025',
                to_date: '01/15/2025',
              },
              url: 'http://172.86.116.124:5002/scrape',
            }),
          });
          const darkwebFacebookPosts = await darkwebFacebookRes.json();
          console.log('darkweb Facebook posts: ', darkwebFacebookPosts);

          const normalizedPosts = normalizePosts(
            darkwebFacebookPosts,
            'darkwebfacebook',
          );
          console.log('normalized: ', normalizedPosts);

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
          console.log('darkweb Xss posts: ', darkwebXssPosts);

          const normalizedXssPosts = normalizePosts(
            darkwebXssPosts,
            'darkwebxss',
          );
          console.log('normalized Xss: ', normalizedXssPosts);

          const classifiedXssPosts = await classifyPosts(normalizedXssPosts);
          console.log('classifiedXssPosts', classifiedXssPosts);
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
          console.log('darkweb Stealer posts: ', darkwebStealerPosts);

          const normalizedPosts = normalizePosts(
            darkwebStealerPosts,
            'darkweb',
          );
          console.log('normalized: ', normalizedPosts);

          const classifiedPosts = await classifyPosts(normalizedPosts);
          console.log('classifiedPosts', classifiedPosts);
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
          setPosts(storePosts.telegramMentions);
          if (storePosts.telegramMentions?.length > 0) {
            setSelectedPost(storePosts.telegramMentions[0]);
          }
          break;
        case twitter:
          setPosts(storePosts.twitterMentions);
          if (storePosts.twitterMentions?.length > 0) {
            setSelectedPost(storePosts.twitterMentions[0]);
          }
          break;
        case facebook:
          setPosts(storePosts.facebookMentions);
          if (storePosts.facebookMentions?.length > 0) {
            setSelectedPost(storePosts.facebookMentions[0]);
          }
          break;
        case instagram:
          setPosts(storePosts.instagramMentions);
          if (storePosts.instagramMentions?.length > 0) {
            setSelectedPost(storePosts.instagramMentions[0]);
          }
          break;
        case darkwebFacebook:
          setPosts(storePosts.darkwebFacebookMentions);
          if (storePosts.darkwebFacebookMentions?.length > 0) {
            setSelectedPost(storePosts.darkwebFacebookMentions[0]);
          }
          break;
        case darkwebStealer:
          setPosts(storePosts.darkwebStealerMentions);
          if (storePosts.darkwebStealerMentions?.length > 0) {
            setSelectedPost(storePosts.darkwebStealerMentions[0]);
          }
          break;
        case darkwebXss:
          setPosts(storePosts.darkwebXSSMentions);
          if (storePosts.darkwebXSSMentions?.length > 0) {
            setSelectedPost(storePosts.darkwebXSSMentions[0]);
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
    default:
      sectionTitle = 'Posts';
  }

  console.log('Section Title: ', sectionTitle);

  const filteredPosts = posts ? filterPosts(posts, filters) : [];
  if (source == telegram && loading) {
    return (
      <div className="gap-1 px-6 flex flex-1 justify-center items-start py-5 min-h-screen">
        <div className="flex flex-col gap-10 w-[80%]">
          <div className="flex flex-col gap-4 mb-4 justify-end flex-1 items-center">
            {/* <h1 className="text-white mr-auto text-3xl  ml-3">{sectionTitle}</h1> */}
            <div className="flex items-center justify-center h-96">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
                <span className="text-white">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (posts?.length <= 0) return null;

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setVisiblePosts((prev) => prev + 5);
    }
  };

  return (
    <div className="gap-1 px-6 flex flex-1 justify-center items-start py-5 min-h-screen">
      <div className="flex flex-col gap-10 w-[80%]">
        <div className="flex gap-4 mb-4 justify-end flex-1 items-center">
          <h1 className="text-white mr-auto text-3xl  ml-3">{sectionTitle}</h1>
          <input
            type="date"
            placeholder="Start Date"
            className="border p-2 rounded"
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
          />
          <input
            type="date"
            placeholder="End Date"
            className="border p-2 rounded"
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
          />
          <select
            className="border p-2 rounded"
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
        <div className="flex gap-4">
          <div
            className="w-1/3 overflow-y-auto overflow-x-hidden custom-scrollbar "
            style={{ maxHeight: '75vh' }}
            onScroll={handleScroll}
          >
            {filteredPosts?.slice(0, visiblePosts).map((post, index) => (
              <div
                key={index}
                onClick={() => setSelectedPost(post)}
                className="bg-red-400 cursor-pointer"
              >
                <DarkWebAndSocialMediaMentionsCard
                  url={post.link}
                  date={post.date}
                  content={post.content}
                  risk={post.risk}
                />
              </div>
            ))}
          </div>
          <div className="w-2/3">
            {source == facebook && <FacebookPostPreview post={selectedPost} />}
            {source == twitter && <TwitterPostPreview post={selectedPost} />}
            {source == telegram && <TelegramPostPreview post={selectedPost} />}
            {source !== facebook &&
              source !== twitter &&
              source !== telegram &&
              selectedPost && (
                <div
                  className="p-4 rounded text-white break-all"
                  style={{ height: 'auto' }}
                >
                  <h2 className="text-xl font-bold mb-2">Post Preview</h2>
                  <p>
                    <strong>Date:</strong> {selectedPost.date}
                  </p>
                  <p>
                    <strong>Content:</strong> {selectedPost.content}
                  </p>
                  <p>
                    <strong>Risk:</strong> {selectedPost.risk}
                  </p>
                  <Link
                    href={selectedPost.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    View Post
                  </Link>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
