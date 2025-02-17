import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OpenAIKey,
});



export async function POST(req) {
  try {
    const { posts } = await req.json();
    console.log(posts);
    

    // ================================
    const batchSize = 10; // Process 10 posts at a time
  const allResponses = [];

  for (let i = 0; i < posts.length; i += batchSize) {
      const batch = posts.slice(i, i + batchSize);

      const prompt = `
      You are a security and fraud analyst. Analyze the sentiment and risk level of each post and classify them as:
      - "low"
      - "medium"
      - "high"

      Respond with a JSON array of objects:
      - "id": post ID
      - "risk": "low", "medium", or "high"

      Posts:
      ${batch.map((p) => `ID: ${p.id}, Content: ${p.content}`).join('\n')}
      `;

      // const response = await openai.chat.completions.create({
      //   model: 'gpt-4-turbo',
      //   // model: 'gpt-o1',
      //   messages: [{ role: 'system', content: 'You are a security analyst.' }, 
      //             { role: 'user', content: prompt }],
      //   response_format: { type: "json_object" },
      //   // functions: [
      //   //   {
      //   //     name: "classify_mentions",
      //   //     description: "Classify social media and dark web mentions by risk level",
      //   //     parameters: {
      //   //       type: "object",
      //   //       properties: {
      //   //         id: {
      //   //           type: "string",
      //   //           description: "The unique identifier of the mention."
      //   //         },
      //   //         risk: {
      //   //           type: "string",
      //   //           enum: ["Low", "Medium", "High"],
      //   //           description: "The risk level of the mention."
      //   //         }
      //   //       },
      //   //       required: ["id", "risk"]
      //   //     }
      //   //   }
      //   // ]
      // });
  

  // console.log('response = ',  response );

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      { role: 'system', content: 'You are a security analyst.' },
      { role: 'user', content: prompt }
    ],
    functions: [
      {
        name: "classify_mentions",
        description: "Classify social media and dark web mentions by risk level",
        parameters: {
          type: "object",
          properties: {
            posts: {  // ✅ Wrapped array inside an object
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", description: "The unique identifier of the mention." },
                  risk: { type: "string", enum: ["low", "medium", "high"], description: "The risk level of the mention." }
                },
                required: ["id", "risk"]
              }
            }
          },
          required: ["posts"]
        }
      }
    ],
    function_call: { name: "classify_mentions" } // ✅ Explicitly call the function
  });
  
  
  console.log(response)
  
  console.log("message: ", response.choices[0]?.message?.function_call?.arguments);
  // console.log(response.choices[0].message);
  console.log(...Object.values(JSON.parse(response.choices[0]?.message?.function_call?.arguments))[0]);
  
  allResponses.push(...Object.values(JSON.parse(response.choices[0]?.message?.function_call?.arguments))[0])


  // console.log(...response.choices[0].message.content.posts);

  // if (response.choices[0]?.message?.content) {
  //   const parsedContent = JSON.parse(response.choices[0].message?.content);
  //   if (Array.isArray(parsedContent)) {
  //     allResponses.push(...parsedContent);
  //   } else {
  //     console.error('Parsed content is not an array:', parsedContent);
  //   }
  // }
}

// Return the full combined response
return Response.json(allResponses);
// =======================

    // const prompt = `
    // You are a security and fraud analyst. Analyze the sentiment and risk level of each post and classify them as:
    // - "low"
    // - "medium"
    // - "high"
    
    // Respond with a JSON array of objects:
    // - "id": post ID
    // - "risk": "low", "medium", or "high"

    // Posts:
    // ${posts.map((p) => `ID: ${p.id}, Content: ${p.content}`).join('\n')}
    // `;

    // const response = await openai.chat.completions.create({
    //   model: 'gpt-4-turbo',
    //   messages: [{ role: 'system', content: prompt }],
    //   response_format:  { type: "json_object" },
    // });

    // console.log(response.choices[0].message.content);
    

    // console.log(JSON.parse(response.choices[0].message.content));
    

    // return Response.json(JSON.parse(response.choices[0].message.content));
    // return Response.json({ success: 'true'})
  } catch (error) {
    console.error('OpenAI Error:', error);
    return Response.json(
      { error: 'Error processing request' },
      { status: 500 },
    );
  }
}
