function IPsTableBody({ error, ips }) {
  // const tableData = [
  //   {
  //     ip: "104.244.42.65",
  //     country: "United States",
  //     asn: "AS32934 Facebook, Inc.",
  //     techStack: "Cloudflare, Inc.",
  //     ssl: "Cloudflare Inc ECC CA-3",
  //   },
  // ];

  if (error) {
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
      {ips?.map((row, index) => (
        <tr key={index} className="border-t border-t-[#41474e]">
          <td className="table-ec15e53e-26b3-478e-bc89-8e365a9212f6-column-120 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {row.ip}
          </td>
          <td className="table-ec15e53e-26b3-478e-bc89-8e365a9212f6-column-240 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {row.country}
          </td>
          <td className="table-ec15e53e-26b3-478e-bc89-8e365a9212f6-column-360 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {row.as_name}
          </td>
          <td className="table-ec15e53e-26b3-478e-bc89-8e365a9212f6-column-360 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {row.asn}
          </td>
          <td className="table-ec15e53e-26b3-478e-bc89-8e365a9212f6-column-360 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {row.cnt}
          </td>
          <td className="table-ec15e53e-26b3-478e-bc89-8e365a9212f6-column-480 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {row.score}
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default IPsTableBody;
