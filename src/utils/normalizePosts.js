// Normalize posts
const normalizePosts = (posts, source) => {
  // console.log(posts);
  return posts?.map(post => {
    const id = post.id || post.post_id || `${source}-${Math.random().toString(36).substring(0,12)}`;
    return {
      ...post,
      id,
      source,
      content: post.content || post.text || post.caption || post.message || post.title || '',
      date: post.date || post.timestamp || new Date().toISOString(),
      link: post.link || post.url || '#',
    };
  });
};

export default normalizePosts