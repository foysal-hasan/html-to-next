// http://144.172.92.117:7800/search?keyword=Microsoft
import { NextResponse } from 'next/server';

export async function POST(req) {
  // const body = await req.json();

  // try {
  //   // Fetch the stream from the third-party API
  //   // const response = await fetch(body?.url);
  //   const response = await fetch(`http://172.86.93.84:5000/search?keyword=leak&date_from=2025-05-01&date_to=2025-05-06`);

  //   // // Check if the response is OK
  //   if (!response.ok) {
  //     throw new Error(
  //       `Failed to fetch data from third-party API: ${response.statusText}`,
  //     );
  //   }

  //   // Array to store JSON objects
  //   const jsonArray = [];

  //   // Get the stream reader
  //   const reader = response.body.getReader();

  //   // Buffer to handle incomplete JSON chunks
  //   let buffer = '';

  //   // Process each chunk
  //   while (true) {
  //     const { done, value } = await reader.read();

  //     // console.log(value);

  //     // If the stream is done, break out of the loop
  //     if (done) break;

  //     // Decode the chunk and append it to the buffer
  //     buffer += new TextDecoder().decode(value);

  //     // Try to parse the buffer as JSON
  //     try {
  //       // Attempt to parse the buffer as JSON
  //       const jsonObject = JSON.parse(buffer);
  //       jsonArray.push(jsonObject); // Add the JSON object to the array
  //       console.log(jsonArray);

  //       buffer = ''; // Clear the buffer after successful parsing
  //     } catch (parseError) {
  //       // If parsing fails, wait for more chunks
  //       // console.log('Waiting for more chunks to complete JSON...');
  //     }
  //   }

  //   // Log the collected JSON array for debugging
  //   // console.log('Collected JSON Array:', jsonArray);

  //   // // convert jsonArray to array
  //   // const jsonArrayArray = JSON.parse(jsonArray);

  //   // if (jsonArrayArray.length < 2) {
  //   //   return NextResponse.json([]);
  //   // }

  //   // Send the complete JSON array as a response to the client
  //   return NextResponse.json(jsonArray);
  // } catch (error) {
  //   // console.error('Error:', error);
  //   // return NextResponse.json(
  //   //   { error: error.message || 'Failed to fetch or process data' },
  //   //   { status: 500 }
  //   // );
  //   return NextResponse.json([]);
  // }

  try {
    const { keyword } = await req.json();

    // console.log('Searching for keyword:', keyword);

    const currentDate = new Date().toISOString().split('T')[0];
    const response = await fetch(
      // `http://172.86.93.84:5000/search?keyword=leak&date_from=2025-01-01&date_to=2025-05-06`
     `http://172.86.93.84:5000/search?keyword=${keyword}&date_from=2025-01-01&date_to=${currentDate}`,
      // `http://144.172.92.117:5000/scrape?keyword=${keyword}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    // console.log('Data:', data);
    return Response.json(data?.results || []);
  } catch (error) {
    console.error('Breachforum API Error:', error);
    // return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
    return Response.json([]);
  }

}
