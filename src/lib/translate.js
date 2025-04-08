import { Translate } from '@google-cloud/translate/build/src/v2';

const translateClient = new Translate({
  // projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  // credentials: {
  //   client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
  //   private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  // },
  projectId: 'vocal-eon-448805-n4',
  credentials: {
    client_email: 'foysalhasan.bdcalling@gmail.com',
    private_key: 'AIzaSyCOXhkx5gN1NvUEYqz7i4WjHIxoTSQ34Vs',
  },
});

export async function translateText(text, targetLanguage) {
  try {
    const [translation] = await translateClient.translate(text, targetLanguage);
    return translation;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}

export async function detectLanguage(text) {
  try {
    const [detection] = await translateClient.detect(text);
    return detection.language;
  } catch (error) {
    console.error('Language detection error:', error);
    throw error;
  }
}
