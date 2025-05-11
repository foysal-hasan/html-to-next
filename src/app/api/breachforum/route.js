export async function POST(request) {
  try {
    const { keyword } = await request.json();

    // console.log('Searching for keyword:', keyword);

    const currentDate = new Date().toISOString().split('T')[0];
    const response = await fetch(
     `http://107.189.26.43:5072/search?keywords=${keyword}&date_from=2023-01-01&date_to=${currentDate}`,
      // `http://144.172.92.117:5000/scrape?keyword=${keyword}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    // console.log('Data:', data);
    return Response.json(data?.results || []);
  } catch (error) {
    // console.error('Breachforum API Error:', error);
    // return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
    return Response.json([]);
  }
}
