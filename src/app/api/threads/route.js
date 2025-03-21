export async function POST(req) {
  const body = await req.json();
  console.log('body', body);

  try {
    const response = await fetch('http://144.172.92.117:42069/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: body?.keyword,
    });
    const data = await response.json();
    // console.log(data);

    return Response.json({ posts: data?.results });
  } catch (error) {
    console.log(error);

    return Response.json([]);
  }
}
