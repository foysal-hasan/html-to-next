
import BlueSky from '@/components/map/Bluesky';
import FacebookMentions from '@/components/map/Facebook';
import InstagramMentions from '@/components/map/Instagram';
import RenderPostAndMap from '@/components/map/RenderPostAndMap';
import TelegramMentions from '@/components/map/Telegram';
import TwitterMentions from '@/components/map/TwitterMentions';
import VKPostsScraper from '@/components/map/VKPostsScraper';


export default async function MapPage({ searchParams }) {

  const search = await searchParams;
  const keywords = search?.keywords ?? '';

  // console.log(domains);

  if (!keywords) {
    return (
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <h1 className="text-white text-2xl mb-4">Enter a keyword to search</h1>
        <p className="text-gray-400">Example: keyword1, keyword2</p>
      </div>
    );
  }

  const keywordsArray = keywords.split(',');
  return <>
    <RenderPostAndMap keywords={keywordsArray} />
    <TelegramMentions keyword={keywordsArray[0]} search={keywords} /> 
    <FacebookMentions keyword={keywordsArray[0]}  search={keywords} /> 
    <InstagramMentions keywords={keywordsArray}  search={keywords} />
    <TwitterMentions keywords={keywordsArray}  search={keywords} />  
    <VKPostsScraper keywords={keywordsArray}  search={keywords} />
    <BlueSky keywords={keywords}  search={keywords} />
    
  </>;
}
