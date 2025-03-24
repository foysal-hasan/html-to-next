import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OpenAIKey,
});

export async function POST(request) {
  try {
    const { title } = await request.json();

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // First, detect the language
    const languageDetectionResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a language detection expert. Respond only with the language name in lowercase: "english", "russian", "arabic", or "other".',
        },
        {
          role: 'user',
          content: `What language is this text in: "${title}"`,
        },
      ],
    });

    const detectedLanguage =
      languageDetectionResponse.choices[0].message.content.toLowerCase().trim();

    let englishTitle = title;
    let russianTitle = title;
    let arabicTitle = title;

    // Translate to English if title is not in English
    if (detectedLanguage !== 'english') {
      const englishResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a professional translator. Translate the following title to English. Keep the formatting and structure intact. Only respond with the translation, no explanations.',
          },
          {
            role: 'user',
            content: title,
          },
        ],
      });
      englishTitle = englishResponse.choices[0].message.content;
    }

    // Translate to Russian if title is not in Russian
    if (detectedLanguage !== 'russian') {
      const russianResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a professional translator. Translate the following title to Russian. Keep the formatting and structure intact. Only respond with the translation, no explanations.',
          },
          {
            role: 'user',
            content: title,
          },
        ],
      });
      russianTitle = russianResponse.choices[0].message.content;
    }

    // Translate to Arabic if title is not in Arabic
    if (detectedLanguage !== 'arabic') {
      const arabicResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a professional translator. Translate the following title to Arabic. Keep the formatting and structure intact. Only respond with the translation, no explanations.',
          },
          {
            role: 'user',
            content: title,
          },
        ],
      });
      arabicTitle = arabicResponse.choices[0].message.content;
    }

    return NextResponse.json({
      english: englishTitle,
      russian: russianTitle,
      arabic: arabicTitle,
      original_language: detectedLanguage,
    });
  } catch (error) {
    return NextResponse.json([]);
  }
}
