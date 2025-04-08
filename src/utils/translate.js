// utils/translate.js
export async function translateText(text, targetLang) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
    text,
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    // Extract translated text from nested response
    return data[0].map((item) => item[0]).join('');
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original text
  }
}
