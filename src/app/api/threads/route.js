export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Request body:', body);

    const response = await fetch('http://144.172.92.117:42069/search', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: body?.keyword || '', // Fallback for missing keyword
    });

    // if (!response.ok) {
    //   throw new Error(`API error: ${response.status}`);
    // }

    const data = await response.json();
    console.log('API response:', data);

    // Handle cases where data.results might be missing
    return Response.json({ posts: data?.results ?? [] });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ posts: [], error: error.message }, { status: 500 });
  }
}
