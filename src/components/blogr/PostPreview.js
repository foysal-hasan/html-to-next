import Link from 'next/link';

const PostPreview = ({ post }) => {
  
  if (!post) return null;

  return (
    <div className="p-6 bg-gray-800 rounded-lg text-white break-words min-h-[calc(100vh-12rem)] lg:col-span-2">


      <h2 className="text-2xl font-bold mb-6">Post Preview</h2>
      <div className="space-y-6">
        {/* Title */}
        {post?.title && (
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <strong className="block text-gray-300 mb-2">Title</strong>
            <p>{post?.title}</p>
          </div>
        )}

        {post?.thread_title && (
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <strong className="block text-gray-300 mb-2">Title</strong>
            <p>{post?.thread_title}</p>
          </div>
        )}
        
        {/* Date */}
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <strong className="block text-gray-300 mb-2">Date</strong>
          <p>{post?.date ? new Date(post?.date).toLocaleString() : 'N/A'}</p>
          {/* <p>{post?.date}</p> */}
        </div>

        {/* Images or Media */}
        {post?.image || post?.media || post?.images || post?.media?.file_url ? (
          <div className="bg-gray-700/50  rounded-lg">
            <div className="grid grid-cols-2 gap-2">
              {post?.image && <img src={post?.image?.uri} alt="Post Image" className="rounded p-4" />}
              {post?.media?.file_url && <img src={post?.media?.file_url} alt="Post Image" className="rounded" />}
              {post?.media && Array.isArray(post?.media) &&
                post?.media.map((img, index) => (
                  <img key={index} src={img} alt={`Media ${index + 1}`} className="rounded p-4" />
                ))}
              {post?.images &&
                post?.images.map((img, index) => (
                  <img key={index} src={img?.thumb} alt={`Image ${index + 1}`} className="rounded p-4" />
                ))}
            </div>
          </div>
        ) : null}

        
        {/* Content */}
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <strong className="block text-gray-300 mb-2">Content</strong>
          {post?.content ? (
            <p dangerouslySetInnerHTML={{ __html: post?.content }} />
          ) : (
            <p>No content available</p>
          )}
        </div>
        
        {/* Risk Level */}
        {post?.risk && (
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <strong className="block text-gray-300 mb-2">Risk Level</strong>
            <p
              className={`inline-block px-3 py-1 rounded-full ${
                post?.risk === 'high' ? 'bg-red-500/20 text-red-300' :
                post?.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-green-500/20 text-green-300'
              }`}
            >
              {post?.risk}
            </p>
          </div>
        )}

        
        {/* Link to Original Post */}
        {post?.link && (
          <Link
            href={post?.link.startsWith('http') ? post?.link : `https://${post?.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Original Post
          </Link>
        )}
      </div>
    </div>
  );
};

export default PostPreview;
