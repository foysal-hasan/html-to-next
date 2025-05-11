// export async function POST(req) {
//   const body = await req.json();
//   // console.log('body', body);
//   try {
//     const response = await fetch(body?.url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body?.input),
//     });
//     const data = await response.json();


//     // console.log('data', data);
//     return Response.json(data?.results);
//   } catch (error) {
//     console.log(error);

//     return Response.json([]);
//   }
// }


export async function POST(req) {
  
  try {
     const { keyword } = await req.json();
 
     // console.log('Searching for keyword:', keyword);
 
     const currentDate = new Date().toISOString().split('T')[0];
     const response = await fetch(
      `http://107.189.26.43:5069/search?q=${keyword}&from_date=2023-01-01&to_date=${currentDate}`,
    //  `http://107.189.26.43:5069/search?q=bitcoin&from_date=2023-05-01&to_date=2025-05-05`
       // `http://144.172.92.117:5000/scrape?keyword=${keyword}`,
     );
 
     if (!response.ok) {
       throw new Error('Failed to fetch data');
     }
 
     const data = await response?.json();
    //  console.log('Data:', data);
     return Response.json(data?.results || []);
   } catch (error) {
     console.error('API Error:', error);
     // return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
     return Response.json([]);
   }
 
 }
 