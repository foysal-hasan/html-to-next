export async function POST(req) {
  // const time = new Date();
  const body = await req.json();
  const fetchAll = body?.fetchAll || false;

  let allPosts = [];
  let cursor = null;

  try {
    // Make initial request
    let response = await fetch(
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

    let data = await response.json();
    allPosts = [...data.results];

    if (data?.cursor) {
      response = await fetch(
        `https://facebook-scraper3.p.rapidapi.com/search/posts?query=${body?.keyword}&cursor=${cursor}`,
        {
          headers: {
            'x-rapidapi-key':
              'JCencKsLCumshFl94505UMz3fVOjp1GA57EjsnaTRyaHjVY8Z7',
            'x-rapidapi-host': 'facebook-scraper3.p.rapidapi.com',
          },
        },
      );

      data = await response.json();
    }

    allPosts = [...allPosts, ...data.results];
    cursor = data?.cursor;

    // If fetchAll is true, continue fetching with cursor until we have enough posts or no more results
    if (fetchAll) {
      while (cursor && allPosts.length < 100) {
        // Limit to 100 posts total
        response = await fetch(
          `https://facebook-scraper3.p.rapidapi.com/search/posts?query=${body?.keyword}&cursor=${cursor}`,
          {
            headers: {
              'x-rapidapi-key':
                'JCencKsLCumshFl94505UMz3fVOjp1GA57EjsnaTRyaHjVY8Z7',
              'x-rapidapi-host': 'facebook-scraper3.p.rapidapi.com',
            },
          },
        );

        if (!response.ok) {
          break;
        }

        data = await response.json();
        if (!data.results || data.results.length === 0) {
          break;
        }

        allPosts = [...allPosts, ...data.results];
        cursor = data.cursor;
      }
    }

    // console.log('Time taken:', new Date() - time);
    return Response.json({ posts: allPosts });
  } catch (error) {
    console.error('Error fetching Facebook posts:', error);
    return Response.json([]);
  }
}
