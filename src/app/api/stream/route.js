// export async function GET() {
//   try {
//     const thirdPartyApiUrl = "http://172.86.116.124:7800/search_xss"; // Replace with actual API
//     const requestBody = {
//       "keyword": "Accounts",
//       "start_date": "2025-01-01",
//       "end_date": "2025-01-10"
//     };

//     const response = await fetch(thirdPartyApiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // "Authorization": "Bearer YOUR_API_KEY", // Uncomment if needed
//       },
//       body: JSON.stringify(requestBody),
//     });

//     if (!response.body) {
//       return new Response('Stream not supported', { status: 400 });
//     }

//     const reader = response.body.getReader();
//     const decoder = new TextDecoder();
//     let chunks = [];

//     while (true) {
//       const { done, value } = await reader.read();

//       if (done) {
//         break;
//       }

//       chunks.push(decoder.decode(value, { stream: true }));
//     }

//     const completeData = chunks.join('');
//     const parsedData = JSON.parse(completeData.trim());

//     return new Response(JSON.stringify(parsedData), {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }
// }

// async function* streamingFetch( fetchcall ) {

//   const response = await fetchcall();
//   // Attach Reader
//   const reader = response.body.getReader();
//   while (true) {
//       // wait for next encoded chunk
//       const { done, value } = await reader.read();
//        // check if stream is done
//       if (done) break;
//       // Decodes data chunk and yields it
//       yield (new TextDecoder().decode(value));
//   }
// }

//     const thirdPartyApiUrl = "http://172.86.116.124:7800/search_xss"; // Replace with actual API
//     const requestBody = {
//       "keyword": "Accounts",
//       "start_date": "2025-01-01",
//       "end_date": "2025-01-10"
//     };

//     const response = await fetch(thirdPartyApiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // "Authorization": "Bearer YOUR_API_KEY", // Uncomment if needed
//       },
//       body: JSON.stringify(requestBody),
//     });

// export async function GET(){
//   (async () => {

//     for await ( let chunk of streamingFetch( () => fetch(thirdPartyApiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // "Authorization": "Bearer YOUR_API_KEY", // Uncomment if needed
//       },
//       body: JSON.stringify(requestBody),
//     }) ) ) {
//         console.log( chunk )
//     }

// })();
// }

// app/api/stream/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  // Define the third-party API URL and request body
  // const thirdPartyApiUrl = 'http://172.86.116.124:5003/search_xss';
  // const requestBody = {
  //   keyword: 'Accounts',
  //   start_date: '2025-01-01',
  //   end_date: '2025-01-10',
  // };

  try {
    // Fetch the stream from the third-party API
    const response = await fetch(body?.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // "Authorization": "Bearer YOUR_API_KEY", // Uncomment if needed
      },
      body: JSON.stringify(body?.input),
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from third-party API: ${response.statusText}`,
      );
    }

    // Array to store JSON objects
    const jsonArray = [];

    // Get the stream reader
    const reader = response.body.getReader();

    // Buffer to handle incomplete JSON chunks
    let buffer = '';

    // Process each chunk
    while (true) {
      const { done, value } = await reader.read();

      // If the stream is done, break out of the loop
      if (done) break;

      // Decode the chunk and append it to the buffer
      buffer += new TextDecoder().decode(value);

      // Try to parse the buffer as JSON
      try {
        // Attempt to parse the buffer as JSON
        const jsonObject = JSON.parse(buffer);
        jsonArray.push(jsonObject); // Add the JSON object to the array
        buffer = ''; // Clear the buffer after successful parsing
      } catch (parseError) {
        // If parsing fails, wait for more chunks
        console.log('Waiting for more chunks to complete JSON...');
      }
    }

    // Log the collected JSON array for debugging
    console.log('Collected JSON Array:', jsonArray);

    // // convert jsonArray to array
    // const jsonArrayArray = JSON.parse(jsonArray);

    // if (jsonArrayArray.length < 2) {
    //   return NextResponse.json([]);
    // }

    // Send the complete JSON array as a response to the client
    return NextResponse.json(jsonArray);
  } catch (error) {
    // console.error('Error:', error);
    // return NextResponse.json(
    //   { error: error.message || 'Failed to fetch or process data' },
    //   { status: 500 }
    // );
    return NextResponse.json([]);
  }
}
