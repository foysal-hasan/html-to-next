const SECURITY_TRAILS_TYPES = ["a", "ns"];
const WHOIS_FREAKS_TYPES = ["AAAA", "MX", "SOA", "TXT"];

// Get API keys from environment variables
const SECURITY_TRAILS_API_KEYS = process.env.SECURITY_TRAILS_API_KEYS
  ? process.env.SECURITY_TRAILS_API_KEYS.split(",").map((key) => key.trim())
  : [];

if (SECURITY_TRAILS_API_KEYS.length === 0) {
  console.error("No SecurityTrails API keys found in environment variables");
}

let currentKeyIndex = 0;
let requestCount = 0;

async function fetchWithKeyRotation(url, retryCount = 0) {
  if (retryCount >= SECURITY_TRAILS_API_KEYS.length) {
    throw new Error("All API keys have been exhausted");
  }

  if (SECURITY_TRAILS_API_KEYS.length === 0) {
    throw new Error("No SecurityTrails API keys available");
  }

  const currentKey = SECURITY_TRAILS_API_KEYS[currentKeyIndex];

  try {
    const res = await fetch(url, {
      headers: {
        apikey: currentKey,
      },
      next: {
        revalidate: 3600,
      },
    });

    if (res.status === 429) {
      // Too Many Requests
      // Rotate to next key
      currentKeyIndex = (currentKeyIndex + 1) % SECURITY_TRAILS_API_KEYS.length;
      requestCount = 0;
      // Retry with new key
      return fetchWithKeyRotation(url, retryCount + 1);
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    requestCount++;
    // Rotate key after 45 requests (keeping safe margin)
    if (requestCount >= 45) {
      currentKeyIndex = (currentKeyIndex + 1) % SECURITY_TRAILS_API_KEYS.length;
      requestCount = 0;
    }

    return res;
  } catch (error) {
    if (error.message.includes("Failed to fetch")) {
      // Rotate key and retry on network errors
      currentKeyIndex = (currentKeyIndex + 1) % SECURITY_TRAILS_API_KEYS.length;
      requestCount = 0;
      return fetchWithKeyRotation(url, retryCount + 1);
    }
    throw error;
  }
}

/**
 * Fetches historical DNS records for a specific record type
 * @param {string} domain - The domain to fetch DNS history for
 * @param {string} recordType - The specific record type to fetch
 * @returns {Promise<Array>} - Array of DNS records
 */
export async function getHistoricalDNS(domain, recordType) {
  const type = recordType.toLowerCase();

  try {
    if (SECURITY_TRAILS_TYPES.includes(type)) {
      // Fetch from SecurityTrails API with key rotation
      const url = `https://api.securitytrails.com/v1/history/${domain}/dns/${type}`;
      const res = await fetchWithKeyRotation(url);
      const data = await res.json();

      return data.records.map((record) => ({
        values: record.values,
        organization: record.organizations?.[0] || "N/A",
        firstSeen: record.first_seen,
        lastSeen: record.last_seen,
        durationSeen: calculateDuration(record.first_seen, record.last_seen),
      }));
    } else if (WHOIS_FREAKS_TYPES.includes(recordType)) {
      // Fetch from WhoisFreaks API
      const url = `https://api.whoisfreaks.com/v2.0/dns/historical?apiKey=${process.env.WHOISFREAKS_API_KEY}&domainName=${domain}&type=${recordType}`;
      const res = await fetch(url, {
        next: {
          revalidate: 3600,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch ${type} records: ${res.statusText}`);
      }

      const data = await res.json();

      return data.historicalDnsRecords
        .filter((record) => record.dnsTypes[recordType])
        .flatMap((record) => {
          const relevantRecords = record.dnsRecords.filter(
            (r) => r.dnsType === recordType
          );

          return [
            {
              addresses: relevantRecords.map(
                (r) => r.address || r.target || r.strings?.[0]
              ),
              organization: "N/A",
              firstSeen: record.queryTime,
              lastSeen: record.queryTime,
              durationSeen: "N/A",
            },
          ];
        });
    }

    return [];
  } catch (error) {
    console.error(`Error fetching ${type} records:`, error);
    throw error;
  }
}

function calculateDuration(firstSeen, lastSeen) {
  const start = new Date(firstSeen);
  const end = new Date(lastSeen);
  const diffInDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));

  if (diffInDays < 1) return "Less than a day";
  if (diffInDays === 1) return "1 day";
  return `${diffInDays} days`;
}
