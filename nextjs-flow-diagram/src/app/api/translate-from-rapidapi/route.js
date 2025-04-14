export async function POST(req) {
  const body = await req.json();
  const { text, sourceLang, targetLang } = body;

  // console.log('text', text);
  // console.log('sourceLang', sourceLang);
  // console.log('targetLang', targetLang);

  try {
    const url = 'https://deep-translate1.p.rapidapi.com/language/translate/v2';
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
        'Content-Type': 'application/json',
        'x-rapidapi-key': 'JCencKsLCumshFl94505UMz3fVOjp1GA57EjsnaTRyaHjVY8Z7',
      },
      body: JSON.stringify({
        q: text,
        source: sourceLang || 'auto',
        target: targetLang || 'en',
      }),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error('Translation API request failed');
    }

    const result = await response.json();
    return Response.json({
      result: result?.data?.translations?.translatedText[0],
    });
  } catch (error) {
    console.error('Error translating text:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
