import { getSSLInfo } from "@/hooks/hackerreport/getSSLInfo";
import React from "react";

export default async function SSLCertificate({ domain, jarm }) {
  let sslInfo;

  try {
    const res = await getSSLInfo(domain);
    if (res?.data?.length > 0 && res?.data[0]?.attributes) {
      sslInfo = res?.data[0]?.attributes;
    }

    // console.log(res);
  } catch (err) {
    return <h1 className="text-red-800 ml-4"></h1>;
  }

  if (!sslInfo?.issuer && !sslInfo?.thumbprint && !sslInfo?.thumbprint_sha256) {
    return null;
  }

  return (
    <>
      <h1 className="min-w-full text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">
        SSL Certificate
      </h1>
      <div className="flex min-w-full flex-1 flex-col gap-2 rounded-xl p-6 border border-[#41474e]">
        {sslInfo?.issuer?.C && (
          <p className="text-white tracking-light text-xl leading-tight">
            <span className="font-bold">Country Name: </span> {sslInfo.issuer.C}
          </p>
        )}
        {sslInfo?.issuer?.CN && (
          <p className="text-white tracking-light text-xl leading-tight">
            <span className="font-bold">Common Name: </span> {sslInfo.issuer.CN}
          </p>
        )}
        {sslInfo?.issuer?.L && (
          <p className="text-white tracking-light text-xl leading-tight">
            <span className="font-bold">Locality: </span> {sslInfo.issuer.L}
          </p>
        )}
        {sslInfo?.issuer?.O && (
          <p className="text-white tracking-light text-xl leading-tight">
            <span className="font-bold">Organization: </span> {sslInfo.issuer.O}
          </p>
        )}
        {sslInfo?.issuer?.OU && (
          <p className="text-white tracking-light text-xl leading-tight">
            <span className="font-bold">Organizational Unit: </span>{" "}
            {sslInfo.issuer.OU}
          </p>
        )}
        {sslInfo?.serial_number && (
          <p className="text-white tracking-light text-xl leading-tight">
            <span className="font-bold">Serial Number: </span>
            <span className="break-all">{sslInfo.serial_number}</span>
          </p>
        )}
        {sslInfo?.thumbprint && (
          <p className="text-white tracking-light text-xl leading-tight">
            <span className="font-bold">Thumbprint: </span>
            <span className="break-all">{sslInfo.thumbprint}</span>
          </p>
        )}
        {sslInfo?.thumbprint_sha256 && (
          <p className="text-white tracking-light text-xl leading-tight">
            <span className="font-bold">Thumbprint_sha256: </span>
            <span className="break-all">{sslInfo.thumbprint_sha256}</span>
          </p>
        )}
        {jarm && (
          <p className="text-white tracking-light text-xl leading-tight">
            <span className="font-bold">Jarm: </span>
            <span className="break-all">{jarm}</span>
          </p>
        )}
      </div>
    </>
  );
}
