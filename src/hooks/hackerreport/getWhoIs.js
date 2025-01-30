export async function getWhoIs(domain) {
  const url = `https://www.virustotal.com/api/v3/domains/${domain}/historical_whois?limit=10`;

  const requiredHeaders = {
    "X-Apikey": process.env.virustotal_api_key,
  };

  const res = await fetch(url, {
    headers: requiredHeaders,
  });
  return res.json();
}
