import DarkWebAndSocialMediaMentions from '@/components/brandsense/DarkWebAndSocialMediaMentions';
import DarkwebFacebookPosts from '@/components/brandsense/darkWebAndSocialMediaMentions/DarkwebFacebookPosts';
import DarkwebStealerMentions from '@/components/brandsense/darkWebAndSocialMediaMentions/DarkwebStealerMentions';
import DarkwebXSSPosts from '@/components/brandsense/darkWebAndSocialMediaMentions/DarkwebXss';
import FacebookMentions from '@/components/brandsense/darkWebAndSocialMediaMentions/FacebookMentions';
import InstagramMentions from '@/components/brandsense/darkWebAndSocialMediaMentions/Instagram';
import TelegramMentions from '@/components/brandsense/darkWebAndSocialMediaMentions/Telegram';
import TwitterMentions from '@/components/brandsense/darkWebAndSocialMediaMentions/TwitterMentions';
import DomainImpersonation from '@/components/brandsense/DomainImpersonation';
import DonutChart from '@/components/brandsense/DonutChart';
import LeakedCredentials from '@/components/brandsense/LeakedCredentials';
import PastebinMentionsSection from '@/components/brandsense/PastebinMentionsSection';
import SensitiveInformation from '@/components/brandsense/SensitiveInformation';

const isValidDomain = (domain) => {
  const domainRegex =
    /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
};

export default async function Brandsense({ searchParams }) {
  const search = await searchParams;
  const domain = search?.domain ?? '';

  console.log(domain)

  if (!domain) {
    return (
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <h1 className="text-white text-2xl mb-4">Enter a domain to search</h1>
        <p className="text-gray-400">Example: example.com</p>
      </div>
    );
  }

  if (!isValidDomain(domain)) {
    return (
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <h1 className="text-white text-2xl mb-4">Invalid domain format</h1>
        <p className="text-gray-400">
          Please enter a valid domain (e.g., example.com)
        </p>
      </div>
    );
  }

  
  return (
    <div className="px-40 flex flex-1 justify-center py-5 pb-20 ">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
            Brand Intelligence Report
          </p>
        </div>
        <DonutChart />
        {/* <Home /> */}
        {/* <LeakedCredentials domain={domain} /> */}
        {/* <DarkWebAndSocialMediaMentions domain={domain} />    */}
      <DomainImpersonation domain={domain} />
        {/* <PastebinMentionsSection domain={domain} /> */}
        {/* <SensitiveInformation domain={domain} />   */}
      </div>
    </div>
  );
}
