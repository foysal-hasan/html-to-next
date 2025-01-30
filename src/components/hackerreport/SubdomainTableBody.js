import { getSubdomainsInfo } from "@/hooks/hackerreport/getSubdomainsInfo";

const tableData = [
  {
    domain: "m.facebook.com",
    ip: "104.244.42.65",
    country: "United States",
    provider: "AS32934 Facebook, Inc.",
    cloudProvider: "Cloudflare, Inc.",
    certificate: "Cloudflare Inc ECC CA-3",
  },
  {
    domain: "developers.facebook.com",
    ip: "104.244.42.65",
    country: "United States",
    provider: "AS32934 Facebook, Inc.",
    cloudProvider: "Cloudflare, Inc.",
    certificate: "Cloudflare Inc ECC CA-3",
  },
  {
    domain: "business.facebook.com",
    ip: "104.244.42.65",
    country: "United States",
    provider: "AS32934 Facebook, Inc.",
    cloudProvider: "Cloudflare, Inc.",
    certificate: "Cloudflare Inc ECC CA-3",
  },
  {
    domain: "connect.facebook.com",
    ip: "104.244.42.65",
    country: "United States",
    provider: "AS32934 Facebook, Inc.",
    cloudProvider: "Cloudflare, Inc.",
    certificate: "Cloudflare Inc ECC CA-3",
  },
  {
    domain: "secure.facebook.com",
    ip: "104.244.42.65",
    country: "United States",
    provider: "AS32934 Facebook, Inc.",
    cloudProvider: "Cloudflare, Inc.",
    certificate: "Cloudflare Inc ECC CA-3",
  },
];

const SubdomainTableBody = async ({ domain }) => {
  // const res = await getSubdomainsInfo(domain);
  // console.log(res);

  let res,
    error = false;

  try {
    res = await getSubdomainsInfo(domain);
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

  return (
    <tbody>
      {/* {tableData.map((row, index) => (
        <tr key={index} className="border-t border-t-[#41474e]">
          <td className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-120 h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
            {row.domain}
          </td>
          <td className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-240 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {row.ip}
          </td>
          <td className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-360 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {row.country}
          </td>
          <td className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-480 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {row.provider}
          </td>
          <td className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-600 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {row.cloudProvider}
          </td>
          <td className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-720 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#2c3035] text-white text-sm font-medium leading-normal w-full">
              <span className="truncate">{row.certificate}</span>
            </button>
          </td>
        </tr>
      ))} */}

      {res?.data?.map((subdomainInfo) => (
        <tr key={subdomainInfo?.id} className="border-t border-t-[#41474e]">
          <td className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-120 h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
            {subdomainInfo.id}
          </td>
          <td className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-240 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {subdomainInfo?.attributes?.last_analysis_stats?.malicious}
          </td>
          <td className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-360 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {subdomainInfo?.attributes?.last_analysis_stats?.suspicious}
          </td>
          <td className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-600 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {/* {subdomainInfo?.attributes?.last_dns_records[0]?.type},{" "}
            {subdomainInfo?.attributes?.last_dns_records[0]?.value},{" "}
            {subdomainInfo?.attributes?.last_dns_records[0]?.ttl} */}
            {subdomainInfo?.attributes?.last_dns_records[0] && (
              <span>
                {subdomainInfo.attributes.last_dns_records[0].type},{" "}
                {subdomainInfo.attributes.last_dns_records[0]?.value},{" "}
                {subdomainInfo.attributes.last_dns_records[0]?.ttl}
              </span>
            )}
          </td>
          <td className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-480 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {new Date(subdomainInfo?.attributes?.creation_date).toUTCString()}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default SubdomainTableBody;
