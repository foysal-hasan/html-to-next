const filterPosts = (posts, filters = {}, limit = null) => {
  const { startDate, endDate, riskLevel, source } = filters;

  const filtered = posts.filter((post) => {
    // if (startDate && new Date(post.date) <= new Date(startDate)) return false;

    if (startDate) {
      const startDateObj = new Date(startDate);
      startDateObj.setDate(startDateObj.getDate() - 1);
      if (new Date(post.date) <= startDateObj) return false;
    }

    if (endDate) {
      const endDateObj = new Date(endDate);
      endDateObj.setDate(endDateObj.getDate() + 1);
      if (new Date(post.date) >= endDateObj) return false;
    }
    // console.log('post.date', post.date, 'endDate', endDate);
    // if (source === '') {
    //   return true;
    // }

    if (source && post.source !== source) return false;
    if (riskLevel && post.risk !== riskLevel) return false;
    return true;
  });

  return limit ? filtered.slice(0, limit) : filtered;
};

export default filterPosts;
