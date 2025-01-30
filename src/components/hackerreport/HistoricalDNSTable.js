import { getHistoricalDNS } from "@/hooks/hackerreport/getHistoricalDNS";
import React from "react";

async function HistoricalDNSTable({ domain }) {
  const records = [
    {
      type: "A",
      host: "@",
      value: "104.244.42.129",
      ttl: "1",
    },
    {
      type: "A",
      host: "@",
      value: "104.244.42.193",
      ttl: "1",
    },
    {
      type: "MX",
      host: "@",
      value:
        "0 v=spf1 include:_spf.facebook.com include:spf.messagelabs.com -all",
      ttl: "1",
    },
    {
      type: "NS",
      host: "@",
      value: "a.ns.facebook.com",
      ttl: "1",
    },
    {
      type: "TXT",
      host: "@",
      value:
        "v=spf1 include:_spf.facebook.com include:spf.messagelabs.com -all",
      ttl: "1",
    },
    {
      type: "SOA",
      host: "@",
      value: "a.ns.facebook.com dns.facebook.com 1 1 1 1 1",
      ttl: "1",
    },
    {
      type: "A",
      host: "www",
      value: "104.244.42.193",
      ttl: "1",
    },
    {
      type: "AAAA",
      host: "www",
      value: "2a03:2880:f12f:83:face:b00c::25de",
      ttl: "1",
    },
    {
      type: "CNAME",
      host: "www",
      value: "star.c10r.facebook.com",
      ttl: "1",
    },
  ];
  let response,
    error = false;

  // console.log("historical dns", domain);

  try {
    response = await getHistoricalDNS(domain);
  } catch (err) {
    error = true;
  }

  if (error) {
    return (
      <tbody>
        <tr>
          <td
            className="text-xl text-center text-red-700 w-full py-3"
            colSpan={4}
          >
            API not working
          </td>
        </tr>
      </tbody>
    );
  }

  if (!response?.historicalDnsRecords?.length > 0) {
    return (
      <tbody>
        <tr>
          <td
            className="text-xl text-center text-red-700 w-full py-3"
            colSpan={4}
          >
            Data not found
          </td>
        </tr>
      </tbody>
    );
  }
  return (
    <tbody>
      {response?.historicalDnsRecords[0]?.dnsRecords?.map((record, index) => (
        <tr className="border-t border-t-[#41474e]" key={index}>
          <td className="table-d3ab3cfb-5e7a-422f-8bde-9f9d5d1f07b5-column-120 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#2c3035] text-white text-sm font-medium leading-normal w-full">
              <span className="truncate">{record?.dnsType}</span>
            </button>
          </td>
          <td className="table-d3ab3cfb-5e7a-422f-8bde-9f9d5d1f07b5-column-240 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {record?.address}
          </td>
          <td className="table-d3ab3cfb-5e7a-422f-8bde-9f9d5d1f07b5-column-360 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {record?.host}
          </td>
          <td className="table-d3ab3cfb-5e7a-422f-8bde-9f9d5d1f07b5-column-480 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {record?.ttl}
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default HistoricalDNSTable;
