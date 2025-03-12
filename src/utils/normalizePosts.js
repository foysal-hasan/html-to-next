// Normalize posts
const normalizePosts = (posts, source) => {
  // console.log('posts from normalized', posts);

  //   {
  //     "thread_title": "Traders TwitterAccounts - Badge",
  //     "username": "rs6mtm",
  //     "published_topic_in": "[Социальные сети] - аккаунты, группы, взлом, рассылки",
  //     "posted_on": "7 февраля",
  //     "thread_link": "https://forum.exploit.in/topic/253905/?tab=comments#comment-1538861",
  //     "thread_content": "4 Accounts in total\nVerification badge, Access to email and some socials (github, facebook, youtube)\n400.0K - 800.0k Followers\nGeo (US)\n  Price can be negotiated / %"
  // }
  console.log(posts);
  return posts?.map((post) => {
    const id =
      post.id ||
      post.post_id ||
      `${source}-${Math.random().toString(36).substring(0, 12)}`;
    return {
      ...post,
      id,
      source,
      content:
        post?.postItem?.text ||
        post?.caption?.text ||
        post?.link?.description ||
        post.content ||
        post.text ||
        post.caption ||
        post.message ||
        post.title ||
        post?.thread_content ||
        post?.hidden_content?.join() ||
        '',
      date:
        post?.postItem?.postDate ||
        post?.caption?.created_at ||
        post.createdAt ||
        post.date ||
        post.timestamp ||
        new Date().toISOString(),
      link: post?.link?.uri || post.thread_link || post.link || post.url || '#',
    };
  });
};

export default normalizePosts;
