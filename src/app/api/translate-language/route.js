import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OpenAIKey,
});

export async function POST(request) {
  try {
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 },
      );
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
          content: `What language is this text in: "${content}"`,
        },
      ],
    });

    const detectedLanguage =
      languageDetectionResponse.choices[0].message.content.toLowerCase().trim();

    let englishContent = content;
    let russianContent = content;
    let arabicContent = content;

    // Translate to English if content is not in English
    if (detectedLanguage !== 'english') {
      const englishResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a professional translator. Translate the following text to English. Keep the formatting and structure intact. Only respond with the translation, no explanations.',
          },
          {
            role: 'user',
            content: content,
          },
        ],
      });
      englishContent = englishResponse.choices[0].message.content;
    }

    // Translate to Russian if content is not in Russian
    if (detectedLanguage !== 'russian') {
      const russianResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a professional translator. Translate the following text to Russian. Keep the formatting and structure intact. Only respond with the translation, no explanations.',
          },
          {
            role: 'user',
            content: content,
          },
        ],
      });
      russianContent = russianResponse.choices[0].message.content;
    }

    // Translate to Arabic if content is not in Arabic
    if (detectedLanguage !== 'arabic') {
      const arabicResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a professional translator. Translate the following text to Arabic. Keep the formatting and structure intact. Only respond with the translation, no explanations.',
          },
          {
            role: 'user',
            content: content,
          },
        ],
      });
      arabicContent = arabicResponse.choices[0].message.content;
    }

    return NextResponse.json({
      english: englishContent,
      russian: russianContent,
      arabic: arabicContent,
      original_language: detectedLanguage,
    });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Failed to translate content' },
      { status: 500 },
    );
  }
}
