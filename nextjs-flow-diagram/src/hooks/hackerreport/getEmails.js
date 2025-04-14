export async function getEmails(domain) {
  const url = "https://api.prospeo.io/domain-search";

  const requiredHeaders = {
    "Content-Type": "application/json",
    "X-KEY": process.env.prospeo_api_key,
  };

  const data = {
    company: domain,
    //   limit: 10,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: requiredHeaders,
    body: JSON.stringify(data),
  });
  return res.json();
}
