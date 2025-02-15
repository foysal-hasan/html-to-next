import React from "react";
import SubdomainTableBody from "./SubdomainTableBody";
import SectionTitle from "./SectionTitle";

function Subdomains({ domain }) {
  return (
    <>
      <SectionTitle>Subdomains</SectionTitle>

      <div className="px-4 py-3 @container">
        <div className="flex overflow-hidden rounded-xl border border-[#41474e] bg-[#131416]">
          <table className="flex-1">
            <thead>
              <tr className="bg-[#1e2124]">
                {/* <th className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-120 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Name
                </th>
                <th className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-240 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  IP Address
                </th>
                <th className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-360 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Country
                </th>
                <th className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-480 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  ASN
                </th>
                <th className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-600 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Tech Stack
                </th>
                <th className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-720 px-4 py-3 text-left text-white w-60 text-sm font-medium leading-normal">
                  SSL
                </th> */}

                <th className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-120 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Subdomain Name
                </th>
                <th className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-240 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Malicious Count
                </th>
                <th className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-360 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Suspicious Count
                </th>
                <th className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-480 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Last DNS Records(Type, Value, TTL)
                </th>
                <th className="table-e20597d1-f085-4c6c-be2c-88982dc75773-column-600 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Creation Date
                </th>
              </tr>
            </thead>
            <SubdomainTableBody domain={domain} />
          </table>
        </div>
      </div>
    </>
  );
}

export default Subdomains;
