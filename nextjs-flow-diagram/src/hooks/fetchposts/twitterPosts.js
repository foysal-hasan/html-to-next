const { classifyPosts } = require('@/lib/api/classify');
const { setTwitterMentions } = require('@/lib/features/posts/postsSlices');
const { default: normalizePosts } = require('@/utils/normalizePosts');

export const fetchTwitterPosts = (keyword, dispatch) => {
  return async () => {
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
      return [];
    }

    const normalizedPosts = normalizePosts(twitterPosts, 'twitter');
    // console.log('normalized: ', normalizedPosts);

    const classifiedPosts = await classifyPosts(normalizedPosts);

    // console.log('classifiedPosts', classifiedPosts);
    dispatch(setTwitterMentions(classifiedPosts));
    return classifiedPosts;
  };
};
