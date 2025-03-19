import Link from "next/link";
import SSLCertificate from "./SSLCertificate";
import TechStacks from "./TechStacks";

export default function HomeReportHeader({ domain, jarm, technologies }) {
  return (
    <>
      <div className="flex flex-wrap gap-2 p-4">
        <p className="text-[#a3abb2] text-base font-medium leading-normal">
          Domain
        </p>
        <span className="text-base font-medium leading-normal text-white">
          /
        </span>
        <span className="text-white text-base font-medium leading-normal">
          {domain}
        </span>
      </div>
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          {domain}
        </p>
      </div>
      <div className="flex flex-wrap gap-4 p-4">
        <SSLCertificate domain={domain} jarm={jarm} />
        <TechStacks technologies={technologies} />
      </div>
    </>
  );
}
