export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get('domain');

  try {
    const response = await fetch(
      `https://leakcheck.io/api/v2/query/${domain}?limit=50`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.LEAKCHECK_API_KEY,
        },
      },
    );
    const data = await response.json();
    return Response.json(data?.result);
  } catch (error) {
    //  console.log(error);

    return Response.json([]);
  }
}
