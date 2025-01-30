import { Suspense } from "react";
import SectionTitle from "./SectionTitle";
import { getHistoricalDNS } from "../../hooks/hackerreport/getHistoricalDNS";

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

function EmptyState({ message }) {
  return (
    <div className="px-4 py-8 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-white mb-2">
        No Records Available
      </h3>
      <p className="text-gray-400">{message}</p>
    </div>
  );
}

async function DNSTable({ domain }) {
  const dnsRecords = await getHistoricalDNS(domain);

  // Check if we have any records
  if (!dnsRecords || Object.keys(dnsRecords).length === 0) {
    return (
      <EmptyState message="We couldn't retrieve the DNS records at this time. This might be due to rate limiting or no historical data available. Please try again later." />
    );
  }

  const renderValues = (values) => {
    if (!values) return "N/A";
    if (!Array.isArray(values)) return JSON.stringify(values);

    return values.map((value, idx) => (
      <div key={`${JSON.stringify(value)}-${idx}`}>
        {value.ip || value.target || value.txt || JSON.stringify(value)}
      </div>
    ));
  };

  return (
    <div className="px-4 py-3 @container">
      {Object.entries(dnsRecords).map(([date, records]) => (
        <div key={date} className="mb-6">
          <h3 className="text-white text-lg font-medium mb-3">
            Records from {date}
          </h3>
          <div className="flex overflow-hidden rounded-xl border border-[#41474e] bg-[#131416]">
            <table className="flex-1">
              <thead>
                <tr className="bg-[#1e2124]">
                  <th className="px-4 py-3 text-left text-white w-60 text-sm font-medium leading-normal">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                    Organization
                  </th>
                  <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                    Values
                  </th>
                  <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                    Last Seen
                  </th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr
                    key={`${date}-${index}`}
                    className="border-t border-[#41474e]"
                  >
                    <td className="px-4 py-3 text-sm text-white">
                      {record.type.toUpperCase()}
                    </td>
                    <td className="px-4 py-3 text-sm text-white">
                      {record.organizations?.join(", ") || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-sm text-white">
                      {renderValues(record.values)}
                    </td>
                    <td className="px-4 py-3 text-sm text-white">
                      {record.lastSeen}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

function HistoricalDNS({ domain }) {
  return (
    <>
      <SectionTitle>Historical DNS Records</SectionTitle>
      <Suspense fallback={<LoadingState />}>
        <DNSTable domain={domain} />
      </Suspense>
    </>
  );
}

export default HistoricalDNS;
