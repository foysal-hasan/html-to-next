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

    // Generate summary using OpenAI
    const summaryResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert at summarizing content. Create a concise summary that captures the key points of the text. Focus on the most important information.',
        },
        {
          role: 'user',
          content: `Summarize the following text: "${content}"`,
        },
      ],
    });

    const summary = summaryResponse.choices[0].message.content.trim();

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

    let englishSummary = summary;
    let russianSummary = summary;
    let arabicSummary = summary;

    // Translate summary to English if original content is not in English
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
            content: summary,
          },
        ],
      });
      englishSummary = englishResponse.choices[0].message.content;
    }

    // Translate summary to Russian if original content is not in Russian
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
            content: summary,
          },
        ],
      });
      russianSummary = russianResponse.choices[0].message.content;
    }

    // Translate summary to Arabic if original content is not in Arabic
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
            content: summary,
          },
        ],
      });
      arabicSummary = arabicResponse.choices[0].message.content;
    }

    return NextResponse.json({
      english: englishSummary,
      russian: russianSummary,
      arabic: arabicSummary,
      original_language: detectedLanguage,
      original_content: content,
    });
  } catch (error) {
    console.error('Summary generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 },
    );
  }
}
