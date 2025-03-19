import { Suspense } from "react";
import SectionTitle from "./SectionTitle";
import HistoricalDNSTable from "./HistoricalDNSTable";
function LoadingState() {
  return (
    <div className="px-4 py-3">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-700 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
}

function HistoricalDNS({ domain }) {
  return (
    <>
      <SectionTitle>Historical DNS Records</SectionTitle>
      <Suspense fallback={<LoadingState />}>
        <HistoricalDNSTable domain={domain} />
      </Suspense>
    </>
  );
}

export default HistoricalDNS;
