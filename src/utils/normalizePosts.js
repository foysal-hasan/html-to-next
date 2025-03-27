const months = {
  янв: '01',
  фев: '02',
  мар: '03',
  апр: '04',
  май: '05',
  июн: '06',
  июл: '07',
  авг: '08',
  сен: '09',
  окт: '10',
  ноя: '11',
  дек: '12',
};

function convertRussianDate(dateStr) {
  try {
    const [day, monthRus, yearTime] = dateStr.trim().split(' ');
    const [year, time] = yearTime.split(' в ');
    const month = months[monthRus.toLowerCase().slice(0, 3)];

    const formattedStr = `${year}-${month}-${day}`;
    const date = new Date(formattedStr);

    return date.toISOString(); // or return date.toLocaleString(), etc.
  } catch (e) {
    return new Date().toISOString();
  }
}

function normalizedDate(source, date, dateFormater) {
  if (source === 'telegram' || source === 'facebook') {
    // console.log('date', date);
    // const timestamp = date; // Unix timestamp in seconds
    const newDate = new Date(date * 1000); // Convert to millisecond
    return newDate.toISOString();
  } else if (dateFormater === 'threads') {
    // Extract first date from threads date_posted format
    const dateMatch = date.match(/(\d{2}-\d{2}-\d{4})/);
    if (dateMatch) {
      const [month, day, year] = dateMatch[0].split('-');
      // console.log('date', month + '-' + day + '-' + year);
      return new Date(`${day}-${month}-${year}`).toISOString();
    }
    return new Date().toISOString();
  } else if (dateFormater === 'breachforum') {
    // try to parse the date if it is not working return current date
    try {
      const newDate = date.split('at')[0];
      return new Date(newDate).toISOString();
    } catch (error) {
      // console.log('error', error);
      return new Date().toISOString();
    }
  } else if (dateFormater === 'searchRamp') {
    return convertRussianDate(date);
  }
  return date;
}

// Normalize posts
const normalizePosts = (posts, source, dateFormater) => {
  // console.log('posts from normalized', posts);

  //   {
  //     "thread_title": "Traders TwitterAccounts - Badge",
  //     "username": "rs6mtm",
  //     "published_topic_in": "[Социальные сети] - аккаунты, группы, взлом, рассылки",
  //     "posted_on": "7 февраля",
  //     "thread_link": "https://forum.exploit.in/topic/253905/?tab=comments#comment-1538861",
  //     "thread_content": "4 Accounts in total\nVerification badge, Access to email and some socials (github, facebook, youtube)\n400.0K - 800.0k Followers\nGeo (US)\n  Price can be negotiated / %"
  // }

  // console.log(posts);
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
        (dateFormater === 'searchRamp'
          ? post?.content.join('\n')
          : post?.content) ||
        post?.text ||
        post?.caption ||
        post?.message ||
        post?.title ||
        post?.post_body ||
        post?.thread_content ||
        post?.hidden_content?.join() ||
        '',
      date: normalizedDate(
        source,
        post?.postItem?.postDate ||
          post?.caption?.created_at ||
          post?.createdAt ||
          post?.date ||
          post?.timestamp ||
          post?.date_posted ||
          post?.post_date ||
          new Date().toISOString(),
        dateFormater,
      ),
      // post?.postItem?.postDate ||
      // post?.caption?.created_at ||
      // post.createdAt ||
      // post.date ||
      // post.timestamp ||
      // new Date().toISOString(),
      link:
        post?.thread_url ||
        post?.link?.uri ||
        post?.thread_link ||
        post?.link ||
        post?.url ||
        '#',
      title:
        post?.thread_title ||
        post?.title ||
        (
          post?.postItem?.text ||
          post?.caption?.text ||
          post?.link?.description ||
          post?.content ||
          post?.text ||
          post?.caption ||
          post?.message ||
          post?.post_body ||
          post?.thread_content ||
          post?.hidden_content?.join()
        )?.substring(0, 80) ||
        '',
    };
  });
};

export default normalizePosts;
