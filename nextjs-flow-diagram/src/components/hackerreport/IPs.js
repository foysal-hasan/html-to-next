import React from "react";
import IPsTableBody from "./IPsTableBody";
import SectionTitle from "./SectionTitle";

const IPs = ({ error, ips }) => {
  if (!ips || ips.length === 0) {
    return null;
  }
  return (
    <>
      <SectionTitle>IPs</SectionTitle>
      <div className="px-4 py-3 @container">
        <div className="flex overflow-hidden rounded-xl border border-[#41474e] bg-[#131416]">
          <table className="flex-1">
            <thead>
              <tr className="bg-[#1e2124]">
                <th className="table-ec15e53e-26b3-478e-bc89-8e365a9212f6-column-120 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  IP Address
                </th>
                <th className="table-ec15e53e-26b3-478e-bc89-8e365a9212f6-column-240 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Country
                </th>
                <th className="table-ec15e53e-26b3-478e-bc89-8e365a9212f6-column-360 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  As Name
                </th>
                <th className="table-ec15e53e-26b3-478e-bc89-8e365a9212f6-column-480 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  ASN
                </th>
                <th className="table-ec15e53e-26b3-478e-bc89-8e365a9212f6-column-600 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  CNT
                </th>
                <th className="table-ec15e53e-26b3-478e-bc89-8e365a9212f6-column-720 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Score
                </th>
              </tr>
            </thead>
            <IPsTableBody error={error} ips={ips} />
          </table>
        </div>
      </div>
    </>
  );
};

export default IPs;
