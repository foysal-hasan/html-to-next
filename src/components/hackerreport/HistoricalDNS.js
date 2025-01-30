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

async function DNSTable({ domain }) {
  const dnsRecords = await getHistoricalDNS(domain);

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
                      {record.values.map((value) => (
                        <div key={JSON.stringify(value)}>
                          {value.ip ||
                            value.target ||
                            value.txt ||
                            JSON.stringify(value)}
                        </div>
                      ))}
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
