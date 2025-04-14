export function useHistoricalDNS(domain, recordType) {
  return {
    data: data?.records || [],
    loading: false,
    error: false,
  };
}
