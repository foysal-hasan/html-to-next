import DarkWebAndSocialMediaMentions from '@/components/brandsense/DarkWebAndSocialMediaMentions';
import DonutChart from '@/components/brandsense/DonutChart';
import LeakedCredentials from '@/components/brandsense/LeakedCredentials';

export default function Brandsense() {
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
        {/* <LeakedCredentials /> */}
        <DarkWebAndSocialMediaMentions />
        {/* <DomainImpersonation />
        <PastebinMentionsSection />
        <SensitiveInformation /> */}
      </div>
    </div>
  );
}
