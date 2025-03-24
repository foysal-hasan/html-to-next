export async function POST(request) {
  try {
    const { keyword } = await request.json();

    // console.log('Searching for keyword:', keyword);

    const response = await fetch(
      `http://144.172.92.117:5000/scrape?keyword=${keyword}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    console.log('Data:', data);
    return Response.json(data);
  } catch (error) {
    // console.error('Breachforum API Error:', error);
    // return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
    return Response.json([]);
  }
}
