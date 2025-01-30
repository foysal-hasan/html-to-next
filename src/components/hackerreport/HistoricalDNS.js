import SectionTitle from "./SectionTitle";
import { getHistoricalDNS } from "../../hooks/hackerreport/getHistoricalDNS";

async function HistoricalDNS({ domain }) {
  const dnsRecords = await getHistoricalDNS(domain);

  return (
    <>
      <SectionTitle>Historical DNS Records</SectionTitle>
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
    </>
  );
}

export default HistoricalDNS;
