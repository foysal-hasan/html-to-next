import DNSRecords from '@/components/hackerreport/DNSRecords';
import Emails from '@/components/hackerreport/Emails';
import FraudScore from '@/components/hackerreport/FraudScore';
import HistoricalDNS from '@/components/hackerreport/HistoricalDNS';
import HistoricalWHOISInformation from '@/components/hackerreport/HistoricalWHOISInformation';
import HomeReportHeader from '@/components/hackerreport/HomeReportHeader';
import IPs from '@/components/hackerreport/IPs';
import Links from '@/components/hackerreport/Links';
import MisconfiguredExposedBuckets from '@/components/hackerreport/MisconfiguredExposedBuckets';
import Subdomains from '@/components/hackerreport/Subdomains';
import {
  getCriminalApiResponse,
  getCriminalApiScanResponse,
} from '@/hooks/hackerreport/getCriminalApiResponse';

const isValidDomain = (domain) => {
  const domainRegex =
    /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(domain);
};

export default async function Hackerreport({ searchParams }) {
  const search = await searchParams;
  const domain = search?.domain ?? '';

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

  let scanResult,
    scanDetails,
    technologies,
    error = false;

  try {
    scanResult = await getCriminalApiScanResponse(domain);

    if (scanResult?.data?.reports?.length > 0) {
      scanDetails = await getCriminalApiResponse(
        scanResult.data.reports[0].scan_id,
      );
      // scanDetails = await getCriminalApiResponse(19856469);
      // console.log(scanDetails);
    } else {
      error = true;
    }

    // scanDetails = await getCriminalApiResponse(19996768);
    // console.log(scanDetails?.data?.main_domain_info?.domain_score);

    // technologies = [
    //   {
    //     categories: ["Web servers"],
    //     name: "Google Web Server",
    //     version: null,
    //     vulner: [],
    //   },
    //   {
    //     categories: ["Web servers"],
    //     name: "Google Web Server",
    //     version: null,
    //     vulner: [],
    //   },
    //   {
    //     categories: ["Web servers"],
    //     name: "Google Web Server",
    //     version: null,
    //     vulner: ["SQL injection", "CSRF", "Broken access control"],
    //   },
    // ];
    // console.log(scanDetails?.data?.technologies);
    technologies = scanDetails?.data?.technologies || [];
    console.log(technologies);
  } catch (err) {
    return (
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <h1 className="text-white text-2xl mb-4">Error scanning domain</h1>
        <p className="text-gray-400">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div
        className="layout-content-container flex flex-col max-w-[960px] flex-1"
        id="contentContainer"
      >
        <HomeReportHeader
          domain={domain}
          jarm={scanDetails?.data?.main_domain_info?.jarm}
          technologies={technologies}
        />
        <DNSRecords domain={domain} />
        <Subdomains domain={domain} />
        <HistoricalDNS domain={domain} />
        <IPs error={error} ips={scanDetails?.data?.connected_ip_info} />
        <Emails domain={domain} />
        <MisconfiguredExposedBuckets
          file_exposure={scanDetails?.data?.file_exposure}
        />
        <HistoricalWHOISInformation domain={domain} />
        {
          <FraudScore
            error={error}
            domainScore={scanDetails?.data?.main_domain_info?.domain_score}
          />
        }
        {<Links error={error} links={scanDetails?.data?.links} />}
      </div>
    </div>
  );
}
