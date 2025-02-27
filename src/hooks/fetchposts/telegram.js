const { classifyPosts } = require("@/lib/api/classify");
const { setTelegramMentions } = require("@/lib/features/posts/postsSlices");
const { default: normalizePosts } = require("@/utils/normalizePosts");

export const fetchTelegramPosts = (keyword, dispatch) => {
  return async () => {
      const res = await fetch('/api/telegramPosts', {
        method: 'POST',
        body: JSON.stringify({
          keyword,
        }),
      });
      const rawPosts = await res.json();
      // console.log('telegram posts', rawPosts);
      if (!rawPosts || rawPosts.length === 0) {
        return[];
      }

      const normalizedPosts = normalizePosts(rawPosts, 'telegram');
      // console.log('normalized: ', normalizedPosts);

      const classifiedPosts = await classifyPosts(normalizedPosts);

      // console.log('classifiedPosts', classifiedPosts);
      dispatch(setTelegramMentions(classifiedPosts));
      return classifiedPosts
  }
}