const filterPosts = (posts, filters = {}, limit = null) => {
  const { startDate, endDate, riskLevel, source, category } = filters;

  const filtered = posts.filter((post) => {
    const postDate = new Date(post.date);

    const postDateAtMidnight = new Date(postDate);
    postDateAtMidnight.setHours(0, 0, 0, 0);

    if (startDate) {
      const startDateObj = new Date(startDate);
      startDateObj.setHours(0, 0, 0, 0);
      if (postDateAtMidnight < startDateObj) return false;
    }

    if (endDate) {
      const endDateObj = new Date(endDate);
      endDateObj.setHours(0, 0, 0, 0);
      if (postDateAtMidnight > endDateObj) return false;
    }

    // if (startDate && new Date(post.date) <= new Date(startDate)) return false;

    // if (startDate) {
    //   const startDateObj = new Date(startDate);
    //   startDateObj.setDate(startDateObj.getDate() - 1);
    //   if (new Date(post.date) <= startDateObj) return false;
    // }

    // if (endDate) {
    //   const endDateObj = new Date(endDate);
    //   endDateObj.setDate(endDateObj.getDate() + 1);
    //   if (new Date(post.date) >= endDateObj) return false;
    // }
    // console.log('post.date', post.date, 'endDate', endDate);
    // if (source === '') {
    //   return true;
    // }

    // if (startDate) {
    //   const startDateObj = new Date(startDate).toDateString();
    //   const postDate = new Date(post.date).toDateString();
    //   console.log('postDate', postDate, 'startDateObj', startDateObj);
    //   console.log('postDate <= startDateObj', postDate <= startDateObj);
    //   console.log('======================');
    //   if (postDate <= startDateObj) return false;
    // }

    // if (endDate) {
    //   const endDateObj = new Date(endDate).toDateString();
    //   const postDate = new Date(post.date).toDateString();
    //   // console.log('postDate', postDate, 'endDateObj', endDateObj);
    //   if (postDate >= endDateObj) return false;
    // }

    if (source && post.source !== source) return false;
    if (riskLevel && post.risk !== riskLevel) return false;
    if (category && post.category !== category) return false;
    return true;
  });

  return limit ? filtered.slice(0, limit) : filtered;
};

export default filterPosts;
