export async function getCriminalApiScanResponse(domain) {
  const urlScan = `https://api.criminalip.io/v1/domain/reports?query=${domain}&offset=0`;
  const requiredHeaders = {
    "x-api-key": process.env.criminal_api_key,
  };

  const resScan = await fetch(urlScan, {
    headers: requiredHeaders,
  });
  return resScan.json();
}

export async function getCriminalApiResponse(scanID) {
  const url = `https://api.criminalip.io/v2/domain/report/${scanID}`; //19887404
  const requiredHeaders = {
    "x-api-key": process.env.criminal_api_key,
  };

  const res = await fetch(url, {
    headers: requiredHeaders,
  });
  return await res.json();
}
