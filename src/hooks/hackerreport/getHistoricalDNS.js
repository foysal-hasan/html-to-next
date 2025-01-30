const ALLOWED_DNS_TYPES = ["a", "aaaa", "mx", "ns", "soa", "txt"];

// Add delay between requests
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetches historical DNS records for all record types and groups them by date
 * @param {string} domain - The domain to fetch DNS history for
 * @returns {Promise<Object>} - DNS records grouped by date in descending order
 */
export async function getHistoricalDNS(domain) {
  // Fetch records sequentially with delay to avoid rate limiting
  const allRecords = [];
  for (const type of ALLOWED_DNS_TYPES) {
    const url = `https://api.securitytrails.com/v1/history/${domain}/dns/${type}`;
    const headers = {
      apikey: process.env.SECURITYTRAILS_API_KEY,
    };

    try {
      const res = await fetch(url, {
        headers,
        next: {
          revalidate: 3600, // Cache for 1 hour
        },
      });

      if (!res.ok) {
        if (res.status === 429) {
          // Too Many Requests
          console.log(`Rate limit hit for ${type}, waiting...`);
          await delay(2000); // Wait 2 seconds before retrying
          continue; // Retry this record type
        }
        throw new Error(`Failed to fetch ${type} records: ${res.statusText}`);
      }

      const data = await res.json();
      const records = data.records.map((record) => ({
        ...record,
        type,
      }));
      allRecords.push(...records);

      // Add delay between requests to avoid rate limiting
      await delay(1000); // 1 second delay between requests
    } catch (error) {
      console.error(`Error fetching ${type} records:`, error);
      // Continue with other record types
    }
  }

  // Group records by date (first_seen)
  const groupedByDate = allRecords.reduce((acc, record) => {
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
