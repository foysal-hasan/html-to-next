import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const icons = {
  darkweb: '/assets/dark-web.png',
  facebook: '/assets/fb.png',
  Instagram: '/assets/instagram.png',
  twitter: '/assets/x.png',
  telegram: '/assets/telegram.png',
  threads: '/assets/threads.png',
  default: '/assets/post.png',
};

// posts;
// posts;
// ;
// twitter;

const getIconBySource = (source) => {
  switch (source) {
    case 'darkwebxss':
    case 'darkweb':
    case 'searchXss':
    case 'darkWebPosts':
      return (
        <Image src={icons.darkweb} alt="darkweb Icon" width={50} height={50} />
      );
    case 'darkwebfacebook':
    case 'facebook':
      return (
        <Image
          src={icons.facebook}
          alt="facebook Icon"
          width={50}
          height={50}
        />
      );
    case 'Instagram':
      return (
        <Image
          src={icons.Instagram}
          alt="Instagram Icon"
          width={50}
          height={50}
        />
      );
    case 'twitter':
      return (
        <Image src={icons.twitter} alt="twitter Icon" width={50} height={50} />
      );
    case 'telegram':
      return (
        <Image
          src={icons.telegram}
          alt="telegram Icon"
          width={50}
          height={50}
        />
      );
    case 'threads':
    case 'searchExploit':
      return (
        <Image src={icons.threads} alt="threads Icon" width={50} height={50} />
      );
    default:
      return (
        <Image src={icons.default} alt="Link Icon" width={50} height={50} />
      );
  }
};

const PostPreview = ({ post }) => {
  const [selectedTab, setSelectedTab] = useState('english');
  const [translations, setTranslations] = useState({
    english: post?.content,
    russian: '',
    arabic: '',
  });
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedTitles, setTranslatedTitles] = useState({
    english: post?.title,
    russian: '',
    arabic: '',
  });

  const [isTranslatingTitle, setIsTranslatingTitle] = useState(false);

  useEffect(() => {
    const translateContent = async () => {
      try {
        setIsTranslating(true);
        const response = await fetch('/api/translate-language', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: post?.content,
          }),
        });

        const data = await response.json();
        // console.log('from post preview', data);
        setTranslations({
          english: data.english,
          russian: data.russian,
          arabic: data.arabic,
        });
      } catch (error) {
        console.error('Translation error:', error);
      } finally {
        setIsTranslating(false);
      }
    };

    if (post?.content) {
      translateContent();
    }
  }, [post?.content]);

  useEffect(() => {
    const translateTitle = async () => {
      setIsTranslatingTitle(true);
      try {
        const response = await fetch('/api/translate-tittle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: post?.title,
          }),
        });
        const data = await response.json();
        setTranslatedTitles({
          english: data.english,
          russian: data.russian,
          arabic: data.arabic,
        });
      } catch (err) {
        console.error('Translation error:', err);
      } finally {
        setIsTranslatingTitle(false);
      }
    };

    if (post?.title) {
      translateTitle();
    }
  }, [post?.title]);

  if (!post) return null;

  const renderContent = () => {
    switch (selectedTab) {
      case 'english':
        return translations.english;
      case 'russian':
        return translations.russian;
      case 'arabic':
        return translations.arabic;
      default:
        return translations.english;
    }
  };

  const renderTitle = () => {
    switch (selectedTab) {
      case 'english':
        return translatedTitles.english;
      case 'russian':
        return translatedTitles.russian;
      case 'arabic':
        return translatedTitles.arabic;
      default:
        return translatedTitles.english;
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg text-white break-words min-h-[calc(100vh-12rem)] lg:col-span-2">
      <h2 className="text-2xl font-bold mb-6">Post Preview</h2>
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              selectedTab === 'english'
                ? 'bg-gradient-to-r from-teal-400 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 focus:outline-none  focus:ring-teal-500'
                : 'bg-gray-700'
            }`}
            onClick={() => setSelectedTab('english')}
          >
            English
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              selectedTab === 'russian'
                ? 'bg-gradient-to-r from-teal-400 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 focus:outline-none  focus:ring-teal-500'
                : 'bg-gray-700'
            }`}
            onClick={() => setSelectedTab('russian')}
          >
            Russian
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              selectedTab === 'arabic'
                ? 'bg-gradient-to-r from-teal-400 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 focus:outline-none  focus:ring-teal-500'
                : 'bg-gray-700'
            }`}
            onClick={() => setSelectedTab('arabic')}
          >
            Arabic
          </button>
        </div>

        {/* Date */}
        <div className="bg-gray-700/50 p-4 rounded-lg flex flex-col sm:flex-row  gap-6 sm:justify-between">
          <div className="flex items-center flex-1">
            {getIconBySource(post?.source)}
          </div>
          <div className="flex-1">
            <strong className="block text-gray-300 mb-2 capitalize">
              Source
            </strong>
            <p>
              {post?.source?.slice(0, 1)?.toUpperCase() +
                post?.source?.slice(1)}
            </p>
          </div>
          <div className="flex-1">
            <strong className="block text-gray-300 mb-2">Date</strong>
            <p>
              {post?.date ? new Date(post?.date).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>

        {/* Title */}
        {/* {post?.thread_title && (
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <strong className="block text-gray-300 mb-2">Title</strong>
            <p dangerouslySetInnerHTML={{ __html: post?.thread_title }} />
          </div>
        )}

        {post?.source !== 'searchExploit' && (
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <strong className="block text-gray-300 mb-2">Title</strong>
            {post?.title ? (
              <p dangerouslySetInnerHTML={{ __html: post?.title }} />
            ) : (
              <p
                dangerouslySetInnerHTML={{
                  __html: post?.content.substring(0, 80) + '...',
                }}
              />
            )}
          </div>
        )} */}

        {/* {post?.title && (
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <strong className="block text-gray-300 mb-2">Title</strong>
            <p
              dangerouslySetInnerHTML={{
                __html: renderTitle(post?.translatedTitle),
              }}
            />
          </div>
        )} */}

        {/* start author info */}
        {post?.source === 'Instagram' && (
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="flex gap-4 justify-between">
              <div className="flex-1">
                <strong className="block text-gray-300 mb-2">Username</strong>
                <p dangerouslySetInnerHTML={{ __html: post?.ownerUsername }} />
              </div>

              <div className="flex-1">
                <strong className="block text-gray-300 mb-2">Full Name</strong>
                <p dangerouslySetInnerHTML={{ __html: post?.ownerFullName }} />
              </div>
            </div>
          </div>
        )}

        {post?.source === 'facebook' && (
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="flex gap-4 justify-between">
              <div className="flex-1">
                <strong className="block text-gray-300 mb-2">Name</strong>
                <p dangerouslySetInnerHTML={{ __html: post?.author?.name }} />
              </div>
            </div>
          </div>
        )}

        {post?.source === 'twitter' && (
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="flex gap-4 justify-between">
              <div className="flex items-center gap-2 flex-1">
                <img
                  src={post?.author?.profilePicture}
                  alt="Profile Image"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex-1">
                <strong className="block text-gray-300 mb-2">Username</strong>
                <p
                  dangerouslySetInnerHTML={{ __html: post?.author?.userName }}
                />
              </div>

              <div className="flex-1">
                <strong className="block text-gray-300 mb-2">Full Name</strong>
                <p dangerouslySetInnerHTML={{ __html: post?.author?.name }} />
              </div>
            </div>
          </div>
        )}

        {post?.source === 'posts' && (
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="flex gap-4 justify-between">
              <div className="flex items-center gap-2 flex-1">
                <img
                  src={post?.authorAvatar}
                  alt="Profile Image"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex-1">
                <strong className="block text-gray-300 mb-2">Username</strong>
                <p dangerouslySetInnerHTML={{ __html: post?.authorUsername }} />
              </div>

              <div className="flex-1">
                <strong className="block text-gray-300 mb-2">Full Name</strong>
                <p dangerouslySetInnerHTML={{ __html: post?.authorName }} />
              </div>
            </div>
          </div>
        )}

        {/* darkwebfacebook */}
        {(post?.source === 'darkwebfacebook' ||
          post?.source === 'darkwebxss') && (
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="flex gap-4 justify-between">
              <div className="flex-1">
                <strong className="block text-gray-300 mb-2">Username</strong>
                <p
                  dangerouslySetInnerHTML={{
                    __html: post?.posted_by?.split(' ')[1],
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* vk */}
        {post?.source === 'vk' && (
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="flex gap-4 justify-between">
              <div className="flex items-center gap-2 flex-1">
                <img
                  src={post?.author?.avatar}
                  alt="Profile Image"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex-1">
                <strong className="block text-gray-300 mb-2">Full Name</strong>
                <p dangerouslySetInnerHTML={{ __html: post?.author?.name }} />
              </div>
            </div>
          </div>
        )}

        {/* SearchExploit */}
        {post?.source === 'searchExploit' && (
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="flex gap-4 justify-between">
              <div className="flex-1">
                <strong className="block text-gray-300 mb-2">Username</strong>
                <p
                  dangerouslySetInnerHTML={{
                    __html: post?.username,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* SearchXss */}
        {post?.source === 'searchXss' && (
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="flex gap-4 justify-between">
              <div className="flex-1">
                <strong className="block text-gray-300 mb-2">Username</strong>
                <p
                  dangerouslySetInnerHTML={{
                    __html: post?.author,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* darkWebPosts */}
        {post?.source === 'darkWebPosts' &&
          (post?.author || post?.username) && (
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="flex gap-4 justify-between">
                <div className="flex-1">
                  <strong className="block text-gray-300 mb-2">Username</strong>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post?.author || post?.username,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

        {/* end author info */}

        <div className="bg-gray-700/50 p-4 rounded-lg">
          <strong className="block text-gray-300 mb-2">Title</strong>
          {isTranslatingTitle ? (
            <div className="flex items-center justify-center py-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : renderTitle() ? (
            <p
              dangerouslySetInnerHTML={{
                __html: renderTitle(),
              }}
            />
          ) : (
            <p>No content available</p>
          )}
        </div>

        {/* Images or Media */}
        {post?.source !== 'Instagram' &&
        (post?.image ||
          post?.media ||
          post?.images ||
          post?.media?.file_url) ? (
          <div className="bg-gray-700/50  rounded-lg">
            <div
              className={`grid ${
                post?.images?.length > 1 ||
                (post?.media &&
                  Array.isArray(post?.media) &&
                  post?.media.length > 1)
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : 'grid-cols-1'
              } gap-4 place-items-center`}
            >
              {post?.image && (
                <div className="flex justify-center w-full mx-auto">
                  <img
                    src={post?.image?.uri}
                    alt="Post Image"
                    className="rounded w-full h-full object-cover"
                  />
                </div>
              )}
              {post?.media?.file_url && (
                <div className="flex justify-center w-full  mx-auto flex-wrap">
                  <img
                    src={post?.media?.file_url}
                    alt="Post Image"
                    className="rounded w-full h-full object-cover"
                  />
                </div>
              )}
              {post?.media &&
                Array.isArray(post?.media) &&
                post?.media.map((img, index) => (
                  <div
                    key={index}
                    className="flex justify-center w-full mx-auto flex-wrap gap-8"
                  >
                    <img
                      src={img}
                      alt={`Media ${index + 1}`}
                      className="rounded w-full h-full object-cover"
                    />
                  </div>
                ))}
              {post?.images &&
                post?.images.map((img, index) => (
                  <div
                    key={index}
                    className="flex justify-center w-full mx-auto flex-wrap gap-4"
                  >
                    <img
                      src={img?.thumb}
                      alt={`Image ${index + 1}`}
                      className="rounded w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
        ) : null}

        {/* Content */}
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <strong className="block text-gray-300 mb-2">Content</strong>
          {isTranslating ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : renderContent(post?.translatedContent) ? (
            <p
              dangerouslySetInnerHTML={{
                __html: renderContent(post?.translatedContent),
              }}
            />
          ) : (
            <p>No content available</p>
          )}
        </div>

        {/* <div className="bg-gray-700/50 p-4 rounded-lg">
          <strong className="block text-gray-300 mb-2">Content</strong>
          <p
            dangerouslySetInnerHTML={{
              __html: renderContent(post?.translatedContent),
            }}
          />
        </div> */}

        {/* Risk Level */}
        {post?.risk && (
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <strong className="block text-gray-300 mb-2">Risk Level</strong>
            <p
              className={`inline-block px-3 py-1 rounded-full ${
                post?.risk === 'high'
                  ? 'bg-red-500/20 text-red-300'
                  : post?.risk === 'medium'
                  ? 'bg-yellow-500/20 text-yellow-300'
                  : 'bg-green-500/20 text-green-300'
              }`}
            >
              {post?.risk}
            </p>
          </div>
        )}

        {/* Link to Original Post */}
        {post?.link && (
          <Link
            href={
              post?.link.startsWith('http')
                ? post?.link
                : `https://${post?.link}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-2 bg-blue-600  hover:bg-blue-700 transition-colors bg-gradient-to-r from-teal-400 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            View Original Post
          </Link>
        )}
      </div>
    </div>
  );
};

export default PostPreview;
