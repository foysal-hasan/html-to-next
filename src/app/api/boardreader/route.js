export async function POST(req) {
  const body = await req.json();
  console.log('body', body);

  try {
    const response = await fetch('http://107.189.26.43:5002/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: body?.keyword,
        amount: 100,
        from_date: '01/01/2025',
        to_date: new Date()
          .toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          })
          .replace(/\//g, '/'),
      }),
    });
    const data = await response.json();
    // console.log(data);

    return Response.json({ posts: data?.posts });
  } catch (error) {
    console.log(error);

    return Response.json([]);
  }
}
