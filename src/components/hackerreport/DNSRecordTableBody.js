import { getDNSRecords } from "@/hooks/hackerreport/getDNSRecords";

async function DNSRecordTableBody({ domain }) {
  let last_dns_records,
    error = false;

  try {
    const res = await getDNSRecords(domain);
    last_dns_records = res?.data?.attributes?.last_dns_records;
    // console.log(res);
  } catch (err) {
    error = true;
  }

  if (error) {
    return (
      <tbody>
        <tr>
          <td
            className="text-xl text-center text-red-700 w-full py-3"
            colSpan={7}
          >
            API not working
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {last_dns_records?.map((record, index) => (
        <tr className="border-t border-t-[#41474e]" key={index}>
          <td className="table-d3ab3cfb-5e7a-422f-8bde-9f9d5d1f07b5-column-120 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#2c3035] text-white text-sm font-medium leading-normal w-full">
              <span className="truncate">{record?.type}</span>
            </button>
          </td>
          <td className="table-d3ab3cfb-5e7a-422f-8bde-9f9d5d1f07b5-column-240 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {record?.host}
          </td>
          <td
            className="table-d3ab3cfb-5e7a-422f-8bde-9f9d5d1f07b5-column-360 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal break-words break-all
"
          >
            {record?.value}
          </td>
          <td className="table-d3ab3cfb-5e7a-422f-8bde-9f9d5d1f07b5-column-480 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {record?.ttl}
          </td>
          <td className="table-d3ab3cfb-5e7a-422f-8bde-9f9d5d1f07b5-column-600 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {record?.priority}
          </td>
          <td className="table-d3ab3cfb-5e7a-422f-8bde-9f9d5d1f07b5-column-720 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {record?.port}
          </td>
          <td className="table-d3ab3cfb-5e7a-422f-8bde-9f9d5d1f07b5-column-840 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {record?.weight}
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default DNSRecordTableBody;
