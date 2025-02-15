
 const filterPosts = (posts, filters = {}, limit = null) => {
  const { startDate, endDate, riskLevel, source } = filters;

  const filtered = posts
    .filter(post => {
      if (startDate && new Date(post.date) < new Date(startDate)) return false;
      if (endDate && new Date(post.date) > new Date(endDate)) return false;
      if (source && post.source !== source) return false;
      if (riskLevel && post.risk !== riskLevel) return false;
      return true;
    });

  return limit ? filtered.slice(0, limit) : filtered;
};

export default filterPosts