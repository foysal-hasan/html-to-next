export default function checkSearchQuery(searchQuery, search) {
  const searchQueryDomains = searchQuery?.split(',')?.map((domain) => {
    return domain.split('.')[0].trim(); // Ensure no extra spaces around the domains
  });

  const searchDomains = search?.split(',')?.map((domain) => {
    return domain.split('.')[0].trim(); // Extract domains from search as well
  });

  const joinedSearchQueryDomains = searchQueryDomains?.join(',')?.trim(); // Join domains and remove leading/trailing spaces
  const joinedSearchDomains = searchDomains?.join(',')?.trim();

  // Normalize both strings to lowercase and trim again to ensure no hidden characters
  const cleanedSearchQueryDomains = joinedSearchQueryDomains
    ?.toLowerCase()
    ?.trim();
  const cleanedSearchDomains = joinedSearchDomains?.toLowerCase()?.trim();

  return cleanedSearchQueryDomains === cleanedSearchDomains;
}
