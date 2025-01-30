export async function getSSLInfo(domain) {
  const url = `https://www.virustotal.com/api/v3/domains/${domain}/historical_ssl_certificates`;

  const requiredHeaders = {
    "X-Apikey": process.env.virustotal_api_key,
  };

  const res = await fetch(url, {
    headers: requiredHeaders,
  });
  return res.json();
}
