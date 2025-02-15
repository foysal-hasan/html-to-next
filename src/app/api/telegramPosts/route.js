export async function GET(req) {
  try {
    const response = await fetch(
      `https://api.tgstat.ru/posts/search?token=${process.env.TelegramToken}&q=coinbase&startDate=Today&limit=10&offset=100&peerType=all&hideForwards=0&hideDeleted=0&strongSearch=0&extended=1`,
    );
    const data = await response.json();
    return Response.json(data?.response?.items);
  } catch (error) {
    console.log(error);

    return Response.json([]);
  }
}
