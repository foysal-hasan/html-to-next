import { ApifyClient } from 'apify-client';

export async function POST(req) {
  const body = await req.json();

  // console.log('source', body);

  try {
    const client = new ApifyClient({
      token: process.env.ApifyClientToken,
    });

    const run = await client.actor(body?.url).call(body?.input);

    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    if (items?.length > 0) {
      items?.pop();
    }
    // console.log('items', items);

    return Response.json(items);
  } catch (error) {
    // console.log(error);

    return Response.json([]);
  }
}
