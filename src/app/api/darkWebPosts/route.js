export async function POST(req) {
  const body = await req.json();
  // console.log('body', body);
  try {
    const response = await fetch(body?.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body?.input),
    });
    const data = await response.json();


    // console.log('data', data);
    return Response.json(data?.posts ?? []);
  } catch (error) {
    console.log(error);

    return Response.json([]);
  }
}
