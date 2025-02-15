import SectionTitle from "./SectionTitle";
import { getWhoIs } from "@/hooks/hackerreport/getWhoIs";

async function HistoricalWHOISInformation({ domain }) {
  let whois,
    error = false;

  try {
    const res = await getWhoIs(domain);
    // console.log(res);
    if (res?.data?.length > 0 && res?.data[0]?.attributes) {
      whois = res?.data[0]?.attributes?.whois_map;
      // console.log(whois);
      // console.log(typeof whois);
    }
  } catch (err) {
    error = true;
  }

  // if (error || Object.keys(whois).length === 0) {
  //   return null;
  // }
  return (
    <>
      <SectionTitle>Historical WHOIS Information</SectionTitle>
      <div className="px-4 py-3 @container">
        <div className="flex overflow-hidden rounded-xl border border-[#41474e] bg-[#131416]">
          <table className="flex-1">
            <tbody>
              {Object.entries(whois).map(([key, value]) => (
                <tr key={key} className="border-t border-t-[#41474e]">
                  <td className="table-ec15e53e-26b3-478e-bc89-8e365a9212f6-column-120 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
                    {key}
                  </td>
                  <td className="table-ec15e53e-26b3-478e-bc89-8e365a9212f6-column-240 h-[72px] px-4 py-2 w-[400px] text-[#a3abb2] text-sm font-normal leading-normal">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default HistoricalWHOISInformation;
