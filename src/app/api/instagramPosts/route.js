export async function POST(req) {
  const body = await req.json();
  // console.log(body);

  try {
    const response = await fetch(
      `https://real-time-instagram-scraper-api1.p.rapidapi.com/v1/posts_by_keyword?query=${body.query}`,
      {
        headers: {
          'x-rapidapi-key': process.env.rapidapi_key,
          'x-rapidapi-host': 'real-time-instagram-scraper-api1.p.rapidapi.com',
        },
      },
    );
    const data = await response.json();
    // console.log(data?.data?.items);

    return Response.json(data?.data?.items);
  } catch (error) {
    // console.log(error);

    return Response.json([]);
  }
}
