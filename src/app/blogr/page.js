import Heatmap from '@/components/blogr/heatmap';
import RenderAllPosts from '@/components/blogr/RenderAllPosts';
import ChartBar from '@/components/brandsense/ChartBar';
import DarkWebAndSocialMediaMentions from '@/components/brandsense/DarkWebAndSocialMediaMentions';
import DonutChart from '@/components/brandsense/DonutChart';

export const metadata = {
  title: 'Galileo Design',
  description: 'Galileo Design',
};

export default async function Blogr({ searchParams }) {
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

  // for (const domain of domainsArray) {
  //   if (!isValidDomain(domain.trim())) {
  //     return (
  //       <div className="flex flex-col items-center justify-center h-[90vh]">
  //         <h1 className="text-white text-2xl mb-4">Invalid domain format</h1>
  //         <p className="text-gray-400">
  //           Please enter a valid domain (e.g., example.com)
  //         </p>
  //       </div>
  //     );
  //   }
  // }

  return (
    <>
      <div
        className="container mx-auto  mt-10  flex items-center justify-center gap-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10
      xl:flex-row flex-col-reverse
      "
      >
        <div className="flex-1 w-full">
          <DonutChart />
        </div>
        <div className="flex-1 w-full">
          <ChartBar />
        </div>
      </div>
      <div
        className="container h-[500px] sm:h-[400px] md:h-[600px] mx-auto mt-5 sm:mt-10 rounded-xl overflow-hidden
      px-4 sm:px-6 lg:px-8
      "
      >
        <Heatmap />
      </div>
      <DarkWebAndSocialMediaMentions
        domains={keywordsArray}
        search={keywords}
        onlyData={true}
      />
      {/* <RenderPosts domain={domain} source={telegram} />
      <RenderPosts domain={domain} source={instagram} />
      <RenderPosts domain={domain} source={facebook} />
      <RenderPosts domain={domain} source={twitter} />

      <RenderPosts domain={domain} source={postsMentions} />
      <RenderPosts domain={domain} source={darkwebFacebook} />
      <RenderPosts domain={domain} source={darkwebStealer} />
      <RenderPosts domain={domain} source={darkwebXss} /> */}
      <RenderAllPosts keywords={keywordsArray} search={keywords} />
    </>
  );
}
