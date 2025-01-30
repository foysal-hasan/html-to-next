const ALLOWED_DNS_TYPES = ["a", "aaaa", "mx", "ns", "soa", "txt"];

export async function getHistoricalDNS(domain) {
  // Fetch all DNS record types in parallel
  const promises = ALLOWED_DNS_TYPES.map(async (type) => {
    const url = `https://api.securitytrails.com/v1/history/${domain}/dns/${type}`;
    const headers = {
      apikey: process.env.SECURITYTRAILS_API_KEY,
    };

    try {
      const res = await fetch(url, { headers });
      if (!res.ok) {
        throw new Error(`Failed to fetch ${type} records: ${res.statusText}`);
      }
      const data = await res.json();
      return data.records.map((record) => ({
        ...record,
        type,
      }));
    } catch (error) {
      console.error(`Error fetching ${type} records:`, error);
      return []; // Return empty array for failed requests to allow other types to proceed
    }
  });

  const allRecords = await Promise.all(promises);
  const flattenedRecords = allRecords.flat();

  // Group records by date (first_seen)
  const groupedByDate = flattenedRecords.reduce((acc, record) => {
    const date = record.first_seen;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push({
      type: record.type,
      lastSeen: record.last_seen,
      organizations: record.organizations,
      values: record.values,
    });
    return acc;
  }, {});

  // Sort dates in descending order and format the final result
  const sortedDates = Object.keys(groupedByDate).sort((a, b) =>
    b.localeCompare(a)
  );
  const result = sortedDates.reduce((acc, date) => {
    acc[date] = groupedByDate[date];
    return acc;
  }, {});

  return result;
}
