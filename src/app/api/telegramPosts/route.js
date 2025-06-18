// export async function POST(req) {
//   const body = await req.json();
//   // console.log(body);

//   try {
//     const response = await fetch(
//       `https://api.tgstat.ru/posts/search?token=${process.env.TelegramToken}&q=${body?.keyword}&startDate=Today&limit=50&offset=0&peerType=all&hideForwards=0&hideDeleted=0&strongSearch=0&extended=1`,
//     );
//     const data = await response.json();
//     console.log('data', data);
//     return Response.json(data?.response?.items);
//   } catch (error) {
//     // console.log(error);
//     return Response.json([]);
//   }
// }

export async function POST(req) {
  const body = await req.json();
  const allPosts = [];
  const token = process.env.TelegramToken;
  const keyword = body?.keyword;

  try {
    for (let offset = 0; offset < 500; offset += 50) {
      const response = await fetch(
        `https://api.tgstat.ru/posts/search?token=${token}&q=${keyword}&startDate=Today&limit=50&offset=${offset}&peerType=all&hideForwards=0&hideDeleted=0&strongSearch=0&extended=1`
      );

      const data = await response.json();

      // Optional: check if there are actually items in this page
      if (data?.response?.items?.length === 0) break;

      allPosts.push(...data.response.items);
    }

    return Response.json(allPosts);
  } catch (error) {
    console.error('API error:', error);
    return Response.json([]);
  }
}
