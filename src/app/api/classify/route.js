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

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    // model: 'gpt-o1',
    messages: [{ role: 'system', content: 'You are a security analyst.' }, 
               { role: 'user', content: prompt }],
    response_format: { type: "json_object" },
  });

  console.log(JSON.parse(response.choices[0].message?.content));
  allResponses.push(...Object.values(JSON.parse(response.choices[0].message?.content))[0])


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
