import EmailTableBody from "./EmailTableBody";
import SectionTitle from "./SectionTitle";

function Emails({ domain }) {
  return (
    <>
      <SectionTitle>Emails</SectionTitle>

      <div className="px-4 py-3 @container">
        <div className="flex overflow-hidden rounded-xl border border-[#41474e] bg-[#131416]">
          <table className="flex-1">
            <thead>
              <tr className="bg-[#1e2124]">
                <th className="table-42e89836-56b5-42fb-8921-ee7bba06fb48-column-120 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Email
                </th>
                <th className="table-42e89836-56b5-42fb-8921-ee7bba06fb48-column-240 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Source
                </th>
              </tr>
            </thead>
            <EmailTableBody domain={domain} />
          </table>
        </div>
      </div>
    </>
  );
}

export default Emails;
