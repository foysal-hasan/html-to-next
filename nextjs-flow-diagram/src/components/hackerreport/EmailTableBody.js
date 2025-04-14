import { getEmails } from '@/hooks/hackerreport/getEmails';
import React from 'react';

async function EmailTableBody({ domain }) {
  // const { response } = await getEmails(domain);

  let response;

  try {
    const { response: res } = await getEmails(domain);
    response = res;
  } catch (err) {
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

  if (!response?.email_list || response?.email_list?.length == 0) {
    <tbody>
      <tr>
        <td
          className="text-xl text-center text-red-700 w-full py-3"
          colSpan={4}
        >
          Data not found
        </td>
      </tr>
    </tbody>;
  }

  // console.log(response?.email_list);

  return (
    <tbody>
      {response?.email_list?.map((row, index) => (
        <tr key={index} className="border-t border-t-[#41474e]">
          <td className="table-42e89836-56b5-42fb-8921-ee7bba06fb48-column-120 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {row?.email}
          </td>
          <td className="table-42e89836-56b5-42fb-8921-ee7bba06fb48-column-240 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
            {response?.meta?.domain}
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default EmailTableBody;
