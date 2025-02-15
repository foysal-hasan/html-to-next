"use client";

import { useState, useEffect } from "react";
import LoadingState from "./LoadingState";

export default function HistoricalDNSClient({ domain }) {
  const [activeTab, setActiveTab] = useState("A");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const recordTypes = ["A", "AAAA", "MX", "NS", "SOA", "TXT"];

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/dns?domain=${encodeURIComponent(
            domain
          )}&type=${encodeURIComponent(activeTab)}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch DNS records");
        }
        const data = await res.json();
        setRecords(data.records);
        setError(null);
      } catch (err) {
        console.error("Error fetching DNS records:", err);
        setError(err.message);
        setRecords([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [domain, activeTab]);

  console.log(records);
  if (loading) {
    return <LoadingState />;
  }

  // if (error || !records || records.length === 0) {
  //   return (
  //     <EmptyState message="We couldn't retrieve the DNS records at this time. This might be due to rate limiting or no historical data available. Please try again later." />
  //   );
  // }

  return (
    <div className="px-4 py-3 @container">
      <div className="flex space-x-2 mb-4">
        {recordTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === type
                ? "bg-blue-600 text-white"
                : "bg-[#1e2124] text-gray-400 hover:bg-[#2a2e32]"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="flex overflow-hidden rounded-xl border border-[#41474e] bg-[#131416]">
        <table className="flex-1">
          <thead>
            <tr className="bg-[#1e2124]">
              <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                {activeTab === "A" || activeTab === "AAAA" ? "IP" : "Value"}
              </th>
              <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                Organization
              </th>
              <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                First Seen
              </th>
              <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                Last Seen
              </th>
              <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal">
                Duration Seen
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-8 text-center text-white text-sm"
                >
                  <LoadingState />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-8 text-center text-white text-sm"
                >
                  We couldn&apos;t retrieve the DNS records at this time. This
                  might be due to rate limiting. Please try again later.
                </td>
              </tr>
            ) : !records || records.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-8 text-center text-white text-sm"
                >
                  No {activeTab} records found for this domain.
                </td>
              </tr>
            ) : (
              records.map((record, index) => (
                <tr
                  key={`${index}-${JSON.stringify(
                    record.values || record.addresses
                  )}`}
                  className="border-t border-[#41474e]"
                >
                  <td className="px-4 py-3 text-sm text-white">
                    {record.values ? (
                      <div className="space-y-1">
                        {record?.values.map((value, vIndex) => (
                          <div key={`${vIndex}`}>{value?.ip}</div>
                        ))}
                      </div>
                    ) : record.addresses ? (
                      <div className="space-y-1">
                        {record.addresses.map((address, aIndex) => (
                          <div key={`${aIndex}`}>
                            {typeof address === "object"
                              ? JSON.stringify(address)
                              : address}
                          </div>
                        ))}
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-white">
                    {record.organization || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-white">
                    {record.firstSeen || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-white">
                    {record.lastSeen || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-white">
                    {record.durationSeen || "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
