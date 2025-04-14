// import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: process.env.OpenAIKey,
// });

// export async function POST(req) {
//   try {
//     const { posts } = await req.json();
//     // console.log(posts);

//     // ================================
//     const batchSize = 10; // Process 10 posts at a time
//     const allResponses = [];

//     for (let i = 0; i < posts.length; i += batchSize) {
//       const batch = posts.slice(i, i + batchSize);

//       // i need also post by language count ,language can be russian, arabic, english if not it is unknown

//       const prompt = `
//       You are a security and fraud analyst. Analyze the sentiment and risk level of each post and classify them as:
//       - "low"
//       - "medium"
//       - "high"

//       Respond with a JSON array of objects:
//       - "id": post ID
//       - "risk": "low", "medium", or "high"
//       - "language": "russian", "arabic", "english", or "others"

//       Posts:
//       ${batch.map((p) => `ID: ${p.id}, Content: ${p.content}`).join('\n')}
//       `;

//       // const response = await openai.chat.completions.create({
//       //   model: 'gpt-4-turbo',
//       //   // model: 'gpt-o1',
//       //   messages: [{ role: 'system', content: 'You are a security analyst.' },
//       //             { role: 'user', content: prompt }],
//       //   response_format: { type: "json_object" },
//       //   // functions: [
//       //   //   {
//       //   //     name: "classify_mentions",
//       //   //     description: "Classify social media and dark web mentions by risk level",
//       //   //     parameters: {
//       //   //       type: "object",
//       //   //       properties: {
//       //   //         id: {
//       //   //           type: "string",
//       //   //           description: "The unique identifier of the mention."
//       //   //         },
//       //   //         risk: {
//       //   //           type: "string",
//       //   //           enum: ["Low", "Medium", "High"],
//       //   //           description: "The risk level of the mention."
//       //   //         }
//       //   //       },
//       //   //       required: ["id", "risk"]
//       //   //     }
//       //   //   }
//       //   // ]
//       // });

//       // console.log('response = ',  response );

//       const response = await openai.chat.completions.create({
//         model: 'gpt-4-turbo',
//         // model: 'o1',
//         messages: [
//           { role: 'system', content: 'You are a security analyst.' },
//           { role: 'user', content: prompt },
//         ],
//         functions: [
//           {
//             name: 'classify_mentions',
//             description:
//               'Classify social media and dark web mentions by risk level',
//             parameters: {
//               type: 'object',
//               properties: {
//                 posts: {
//                   // ✅ Wrapped array inside an object
//                   type: 'array',
//                   items: {
//                     type: 'object',
//                     properties: {
//                       id: {
//                         type: 'string',
//                         description: 'The unique identifier of the mention.',
//                       },
//                       risk: {
//                         type: 'string',
//                         enum: ['low', 'medium', 'high'],
//                         description: 'The risk level of the mention.',
//                       },
//                       language: {
//                         type: 'string',
//                         enum: ['russian', 'arabic', 'english', 'others'],
//                         description: 'The language of the mention.',
//                       },
//                     },
//                     required: ['id', 'risk', 'language'],
//                   },
//                 },
//               },
//               required: ['posts'],
//             },
//           },
//         ],
//         function_call: { name: 'classify_mentions' }, // ✅ Explicitly call the function
//       });

//       // console.log(response)

//       // console.log("message: ", response.choices[0]?.message?.function_call?.arguments);
//       // console.log(response.choices[0].message);
//       // console.log(...Object.values(JSON.parse(response.choices[0]?.message?.function_call?.arguments))[0]);

//       allResponses.push(
//         ...Object.values(
//           JSON.parse(response.choices[0]?.message?.function_call?.arguments),
//         )[0],
//       );

//       // console.log(...response.choices[0].message.content.posts);

//       // if (response.choices[0]?.message?.content) {
//       //   const parsedContent = JSON.parse(response.choices[0].message?.content);
//       //   if (Array.isArray(parsedContent)) {
//       //     allResponses.push(...parsedContent);
//       //   } else {
//       //     console.error('Parsed content is not an array:', parsedContent);
//       //   }
//       // }
//     }

//     // Return the full combined response
//     return Response.json(allResponses);
//     // =======================

//     // const prompt = `
//     // You are a security and fraud analyst. Analyze the sentiment and risk level of each post and classify them as:
//     // - "low"
//     // - "medium"
//     // - "high"

//     // Respond with a JSON array of objects:
//     // - "id": post ID
//     // - "risk": "low", "medium", or "high"

//     // Posts:
//     // ${posts.map((p) => `ID: ${p.id}, Content: ${p.content}`).join('\n')}
//     // `;

//     // const response = await openai.chat.completions.create({
//     //   model: 'gpt-4-turbo',
//     //   messages: [{ role: 'system', content: prompt }],
//     //   response_format:  { type: "json_object" },
//     // });

//     // console.log(response.choices[0].message.content);

//     // console.log(JSON.parse(response.choices[0].message.content));

//     // return Response.json(JSON.parse(response.choices[0].message.content));
//     // return Response.json({ success: 'true'})
//   } catch (error) {
//     // console.error('OpenAI Error:', error);
//     // return Response.json(
//     //   { error: 'Error processing request' },
//     //   { status: 500 },
//     // );
//     return Response.json([]);
//   }
// }

{
  /*

import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OpenAIKey, // Ensure this is set in your .env.local file
});

export async function POST(req) {
  try {
    // Parse the request body to get the posts
    const { posts } = await req.json();

    // Validate the input
    if (!Array.isArray(posts) || posts.length === 0) {
      return Response.json(
        { error: 'Invalid input: posts must be a non-empty array' },
        { status: 400 },
      );
    }

    // Process posts in batches
    const batchSize = 10; // Process 10 posts at a time
    const allResponses = [];

    for (let i = 0; i < posts.length; i += batchSize) {
      const batch = posts.slice(i, i + batchSize);

      // Analyze each post in the batch
      const analyzedPosts = await Promise.all(
        batch.map(async (post) => {
          // Extract location from the post content
          const location = await analyzePost(post.content);

          // Analyze risk and language
          const analysis = await analyzeRiskAndLanguage(post.content);

          return {
            id: post.id,
            content: post.content,
            location: location,
            risk: analysis.risk,
            language: analysis.language,
          };
        }),
      );

      allResponses.push(...analyzedPosts);
    }

    // Return the combined response
    return Response.json(allResponses);
  } catch (error) {
    console.error('Error processing request:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Function to extract location from post content
async function analyzePost(postContent) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo', // Use GPT-4 Turbo
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

// Function to analyze risk and language
async function analyzeRiskAndLanguage(postContent) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a security analyst. Analyze the sentiment and risk level of the post and classify it as "low", "medium", or "high". Also, identify the language of the post and classify it as "russian", "arabic", "english", or "others".',
        },
        { role: 'user', content: postContent },
      ],
      functions: [
        {
          name: 'classify_post',
          description: 'Classify a post by risk level and language.',
          parameters: {
            type: 'object',
            properties: {
              risk: {
                type: 'string',
                enum: ['low', 'medium', 'high'],
                description: 'The risk level of the post.',
              },
              language: {
                type: 'string',
                enum: ['russian', 'arabic', 'english', 'others'],
                description: 'The language of the post.',
              },
            },
            required: ['risk', 'language'],
          },
        },
      ],
      function_call: { name: 'classify_post' }, // Explicitly call the function
    });

    // Parse the response
    const functionArgs = JSON.parse(
      response.choices[0]?.message?.function_call?.arguments,
    );
    return {
      risk: functionArgs.risk,
      language: functionArgs.language,
    };
  } catch (error) {
    console.error('Error analyzing risk and language:', error);
    return { risk: 'unknown', language: 'unknown' };
  }
}
*/
}

import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OpenAIKey, // Ensure this is set in your .env.local file
});

export async function POST(req) {
  try {
    // Parse the request body to get the posts
    const { posts } = await req.json();

    // Validate the input
    if (!Array.isArray(posts) || posts.length === 0) {
      return Response.json(
        { error: 'Invalid input: posts must be a non-empty array' },
        { status: 400 },
      );
    }

    // Process posts in batches
    const batchSize = 10; // Process 10 posts at a time
    const allResponses = [];

    for (let i = 0; i < posts.length; i += batchSize) {
      const batch = posts.slice(i, i + batchSize);

      // Analyze each post in the batch
      const analyzedPosts = await Promise.all(
        batch.map(async (post) => {
          // Extract location from the post content
          const location = await analyzePost(post.content);

          // Analyze risk and language
          const analysis = await analyzeRiskAndLanguage(post.content);

          // Translate the title and content into English, Russian, and Arabic
          // const titleTranslations = await translateText(post.title); // Translate title
          // const contentTranslations = await translateText(post.content); // Translate content

          return {
            id: post.id,
            title: post.title, // Original title
            content: post.content, // Original content
            location: location,
            risk: analysis.risk,
            language: analysis.language,
            // translations: {
            //   title: titleTranslations, // Translated titles
            //   content: contentTranslations, // Translated content
            // },
          };
        }),
      );

      allResponses.push(...analyzedPosts);
    }

    // Return the combined response
    return Response.json(allResponses);
  } catch (error) {
    console.error('Error processing request:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Function to extract location from post content
async function analyzePost(postContent) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo', // Use GPT-4 Turbo
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

// Function to analyze risk and language
async function analyzeRiskAndLanguage(postContent) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a security analyst. Analyze the sentiment and risk level of the post and classify it as "low", "medium", or "high". Also, identify the language of the post and classify it as "russian", "arabic", "english", or "others".',
        },
        { role: 'user', content: postContent },
      ],
      functions: [
        {
          name: 'classify_post',
          description: 'Classify a post by risk level and language.',
          parameters: {
            type: 'object',
            properties: {
              risk: {
                type: 'string',
                enum: ['low', 'medium', 'high'],
                description: 'The risk level of the post.',
              },
              language: {
                type: 'string',
                enum: ['russian', 'arabic', 'english', 'others'],
                description: 'The language of the post.',
              },
            },
            required: ['risk', 'language'],
          },
        },
      ],
      function_call: { name: 'classify_post' }, // Explicitly call the function
    });

    // Parse the response
    const functionArgs = JSON.parse(
      response.choices[0]?.message?.function_call?.arguments,
    );
    return {
      risk: functionArgs.risk,
      language: functionArgs.language,
    };
  } catch (error) {
    console.error('Error analyzing risk and language:', error);
    return { risk: 'unknown', language: 'unknown' };
  }
}

// Function to translate text into English, Russian, and Arabic
async function translateText(text) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a translation assistant. Translate the given text into English, Russian, and Arabic.',
        },
        { role: 'user', content: `Translate the following text:\n\n${text}` },
      ],
      functions: [
        {
          name: 'translate_text',
          description: 'Translate the text into English, Russian, and Arabic.',
          parameters: {
            type: 'object',
            properties: {
              english: {
                type: 'string',
                description: 'The translation of the text in English.',
              },
              russian: {
                type: 'string',
                description: 'The translation of the text in Russian.',
              },
              arabic: {
                type: 'string',
                description: 'The translation of the text in Arabic.',
              },
            },
            required: ['english', 'russian', 'arabic'],
          },
        },
      ],
      function_call: { name: 'translate_text' }, // Explicitly call the function
    });

    // Parse the response
    const functionArgs = JSON.parse(
      response.choices[0]?.message?.function_call?.arguments,
    );
    return {
      english: functionArgs.english,
      russian: functionArgs.russian,
      arabic: functionArgs.arabic,
    };
  } catch (error) {
    console.error('Error translating text:', error);
    return {
      english: 'Translation failed',
      russian: 'Translation failed',
      arabic: 'Translation failed',
    };
  }
}
