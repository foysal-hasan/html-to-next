import DarkWebAndSocialMediaMentions from '@/components/brandsense/DarkWebAndSocialMediaMentions';
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
  const domains = search?.domain ?? '';

  console.log(domains);

  if (!domains) {
    return (
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <h1 className="text-white text-2xl mb-4">Enter a domain to search</h1>
        <p className="text-gray-400">Example: example.com, another.com</p>
      </div>
    );
  }

  const domainsArray = domains.split(',');

  for (const domain of domainsArray) {
    if (!isValidDomain(domain.trim())) {
      return (
        <div className="flex flex-col items-center justify-center h-[90vh]">
          <h1 className="text-white text-2xl mb-4">Invalid domain format</h1>
          <p className="text-gray-400">
            Please enter a valid domain (e.g., example.com)
          </p>
        </div>
      );
    }
  }

  // get first domain
  const firstDomain = domainsArray[0].split('.')[0].trim();

  return (
    <div className="px-40 flex flex-1 justify-center py-5 pb-20 ">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
            Brand Intelligence Report
          </p>
        </div>
        <div className="max-w-[500px] mx-auto my-10">
          <DonutChart />
        </div>
        {/* <Home /> */}
        <LeakedCredentials domain={firstDomain} />
        <DarkWebAndSocialMediaMentions
          domains={domainsArray}
          search={domains}
        />
        <DomainImpersonation domain={firstDomain} />
        <PastebinMentionsSection domain={firstDomain} />
        <SensitiveInformation domain={firstDomain} />
      </div>
    </div>
  );
}
