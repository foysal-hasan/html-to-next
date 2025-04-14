export async function POST(req) {
  const body = await req.json();
  const thirdPartyURL = 'http://45.61.160.154:5000/search_xss'; // Replace with your real API

  const response = await fetch(thirdPartyURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body?.input),
  });

  if (!response.body) {
    return new Response(JSON.stringify({ error: 'No data' }), { status: 500 });
  }

  const reader = response.body.getReader();
  let result = '[';
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value) + ',';
    console.log(result);
  }

  result += ']';

  try {
    const parsedData = JSON.parse(result); // Parsed array of posts
    return new Response(JSON.stringify(parsedData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
