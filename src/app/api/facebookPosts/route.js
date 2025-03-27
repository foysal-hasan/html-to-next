import { infiniteQueryOptions } from '@tanstack/react-query';

export async function POST(req) {
  const body = await req.json();
  // console.log('body', body);

  try {
    const response = await fetch(
      `https://facebook-scraper3.p.rapidapi.com/search/posts?query=${body?.keyword}`,
      {
        headers: {
          'x-rapidapi-key':
            'JCencKsLCumshFl94505UMz3fVOjp1GA57EjsnaTRyaHjVY8Z7',
          'x-rapidapi-host': 'facebook-scraper3.p.rapidapi.com',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    // console.log(data);

    return Response.json({ posts: data?.results });
  } catch (error) {
    // console.log(error);
    return Response.json([]);
  }
}
