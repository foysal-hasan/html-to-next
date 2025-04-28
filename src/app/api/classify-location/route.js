// import { OpenAI } from 'openai';
// import { NextResponse } from 'next/server';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(request) {
//   try {
//     const { posts } = await request.json(); // Expect an array of posts

//     // Process posts in batches of 10
//     const batchSize = 10;
//     const results = [];

//     for (let i = 0; i < posts.length; i += batchSize) {
//       const batch = posts.slice(i, i + batchSize);

//       // Process batch concurrently
//       const batchPromises = batch.map(async (post) => {
//         const completion = await openai.chat.completions.create({
//           model: "gpt-4",
//           messages: [
//             {
//               role: "system",
//               content: "You are a location extraction expert. Extract location information from the given text and return latitude and longitude. If no location is found, return null."
//             },
//             {
//               role: "user",
//               content: `Extract location from this text: "${post.content}". Return JSON with latitude, longitude, and location name. If no location is found, return null values.`
//             }
//           ],
//           temperature: 0.7,
//           max_tokens: 150,
//         });

//         const response = completion.choices[0].message.content;
//         let locationData;

//         try {
//           locationData = JSON.parse(response);
//         } catch (e) {
//           locationData = {
//             latitude: null,
//             longitude: null,
//             location: null
//           };
//         }

//         return {
//           postId: post.id, // Include post ID in response
//           ...locationData
//         };
//       });

//       // Wait for all requests in the batch to complete
//       const batchResults = await Promise.all(batchPromises);
//       results.push(...batchResults);
//     }

//     return NextResponse.json(results);
//   } catch (error) {
//     console.error('Location extraction error:', error);
//     return NextResponse.json({
//       error: 'Failed to process locations',
//       details: error.message
//     });
//   }
// }

import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OpenAIKey,
});

export async function POST(request) {
  try {
    const { posts } = await request.json(); // Expect array of posts: [{ id, content }]
    const batchSize = 10;
    const results = [];

    for (let i = 0; i < posts.length; i += batchSize) {
      const batch = posts.slice(i, i + batchSize);

      const batchPromises = batch.map(async (post) => {
        const location = await analyzePost(post.content);
        return {
          postId: post.id,
          location,
        };
      });

      const batchResults = await Promise.all(batchPromises); 
      results.push(...batchResults);

      // const batchPromises = batch.map(async (post) => {
      //   try {
      //     const completion = await openai.chat.completions.create({
      //       model: "o4-mini", // using OpenAI GPT-4o model
      //       messages: [
      //         {
      //           role: "system",
      //           content: "You are a location extraction expert. Extract location coordinates from the text."
      //         },
      //         {
      //           role: "user",
      //           content: `Your task is to extract geographic coordinates from the following text.

      //                     Text: "${post.content}"

      //                     If a specific location is mentioned (like a city, landmark, or country), return the precise latitude and longitude of that location using this exact JSON format:

      //                     {
      //                       "latitude": number | null,
      //                       "longitude": number | null,
      //                       "location": "Location Name" | null
      //                     }

      //                     If no location can be identified, return:
      //                     {
      //                       "latitude": null,
      //                       "longitude": null,
      //                       "location": null
      //                     }

      //                     Only return valid JSON. No explanation. No extra text.`
      //         }
      //       ],
      //       // max_completion_tokens: 150,
      //     });

      //     const raw = completion.choices[0].message.content;

      //     let locationData;
      //     try {
      //       locationData = JSON.parse(raw || '');
      //     } catch (err) {
      //       locationData = {
      //         latitude: null,
      //         longitude: null,
      //         location: null,
      //       };
      //     }

      //     return {
      //       postId: post.id,
      //       ...locationData,
      //     };
      //   } catch (err) {
      //     console.error(`Error processing post ${post.id}:`, err);
      //     return {
      //       postId: post.id,
      //       latitude: null,
      //       longitude: null,
      //       location: null,
      //     };
      //   }
      // });

      // const batchResults = await Promise.all(batchPromises);
      // results.push(...batchResults);
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Location extraction error:', error);
    return NextResponse.json({
      error: 'Failed to process locations',
      details: error.message,
    }, { status: 500 });
  }
}



async function analyzePost(postContent) {
  try {
    const response = await openai.chat.completions.create({
      model: 'o4-mini', // Use GPT-4 Turbo
      messages: [
        {
          role: 'system',
          content:
            'You are a location extraction assistant. Extract the location from the given text.',
        },
        { role: 'user', content: postContent },
      ],
      functions: [
        {
          name: 'extract_location',
          description: 'Extract the location from the text.',
          parameters: {
            type: 'object',
            properties: {
              location: {
                type: 'string',
                description: 'The extracted location from the text.',
              },
            },
            required: ['location'],
          },
        },
      ],
      function_call: { name: 'extract_location' }, // Explicitly call the function
    });

    // Parse the response
    const functionArgs = JSON.parse(
      response.choices[0]?.message?.function_call?.arguments,
    );
    return functionArgs.location || null; // Return the extracted location
  } catch (error) {
    console.error('Error extracting location:', error);
    return null;
  }
}