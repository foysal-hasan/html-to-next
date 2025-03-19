import DNSRecordTableBody from "./DNSRecordTableBody";
import SectionTitle from "./SectionTitle";

function DNSRecords({ domain }) {
  return (
    <>
      <SectionTitle>DNS Records</SectionTitle>
      <div className="px-4 py-3 @container">
        <div className="flex overflow-hidden rounded-xl border border-[#41474e] bg-[#131416]">
          <table className="flex-1">
            <thead>
              <tr className="bg-[#1e2124]">
                <th className="table-d3ab3cfb-5e7a-422f-8bde-9f9d5d1f07b5-column-120 px-4 py-3 text-left text-white w-60 text-sm font-medium leading-normal">
                  Type
                </th>
                <th className="table-d3ab3cfb-5e7a-422f-8bde-9f9d5d1f07b5-column-240 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Host
                </th>
                <th className="table-d3ab3cfb-5e7a-422f-8bde-9f9d5d1f07b5-column-360 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Value
                </th>
                <th className="table-d3ab3cfb-5e7a-422f-8bde-9f9d5d1f07b5-column-480 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  TTL
                </th>
                <th className="table-d3ab3cfb-5e7a-422f-8bde-9f9d5d1f07b5-column-600 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Priority
                </th>
                <th className="table-d3ab3cfb-5e7a-422f-8bde-9f9d5d1f07b5-column-720 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Port
                </th>
                <th className="table-d3ab3cfb-5e7a-422f-8bde-9f9d5d1f07b5-column-840 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Weight
                </th>
              </tr>
            </thead>

            <DNSRecordTableBody domain={domain} />
          </table>
        </div>
      </div>
    </>
  );
}

export default DNSRecords;
