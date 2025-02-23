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


async function* streamingFetch( fetchcall ) {

  const response = await fetchcall();
  // Attach Reader
  const reader = response.body.getReader();
  while (true) {
      // wait for next encoded chunk
      const { done, value } = await reader.read();
       // check if stream is done
      if (done) break;
      // Decodes data chunk and yields it
      yield (new TextDecoder().decode(value));
  }
}


    const thirdPartyApiUrl = "http://172.86.116.124:7800/search_xss"; // Replace with actual API
    const requestBody = { 
      "keyword": "Accounts", 
      "start_date": "2025-01-01", 
      "end_date": "2025-01-10"
    }; 

    const response = await fetch(thirdPartyApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": "Bearer YOUR_API_KEY", // Uncomment if needed
      },
      body: JSON.stringify(requestBody),
    });

export async function GET(){
  (async () => {

    for await ( let chunk of streamingFetch( () => fetch(thirdPartyApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": "Bearer YOUR_API_KEY", // Uncomment if needed
      },
      body: JSON.stringify(requestBody),
    }) ) ) {
        console.log( chunk )
    }

})();
}