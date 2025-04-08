import { translateText } from '@/lib/translate';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { text, targetLanguage } = await request.json();

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Missing text or targetLanguage' },
        { status: 400 },
      );
    }

    const translation = await translateText(text, targetLanguage);

    return NextResponse.json({
      originalText: text,
      translatedText: translation,
      targetLanguage,
    });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
