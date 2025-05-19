// 'use client';
// import RenderPostAndMap from '@/components/map/RenderPostAndMap';
// import { setMapPageSearchQuery } from '@/lib/features/map-search/searchSlices';
// import { resetMapPagePosts } from '@/lib/features/posts/mapPagePostsSlices';
// import { useAppDispatch, useAppSelector } from '@/lib/hooks';
// import { useEffect } from 'react';
// import Test from './Test';
// import TwitterMentions from './TwitterMentions';

// const MapPageSearchHandle = ({ domains, search }) => {
//   const dispatch = useAppDispatch();
//   const searchQuery = useAppSelector((state) => state.mapPageSearch.searchQuery);
//   const posts = useAppSelector((state) => state.mapPagePosts.posts);

//   useEffect(() => {
 
//     // Extract domains from searchQuery without .com, .ru, etc.
//     const searchQueryDomains = searchQuery?.split(',')?.map((domain) => {
//       return domain.split('.')[0].trim(); // Ensure no extra spaces around the domains
//     });
    

//     const searchDomains = search?.split(',')?.map((domain) => {
//       return domain.split('.')[0].trim(); // Extract domains from search as well
//     });

//     const joinedSearchQueryDomains = searchQueryDomains?.join(',')?.trim(); // Join domains and remove leading/trailing spaces
//     const joinedSearchDomains = searchDomains?.join(',')?.trim();

   

//     // Normalize both strings to lowercase and trim again to ensure no hidden characters
//     const cleanedSearchQueryDomains = joinedSearchQueryDomains
//       ?.toLowerCase()
//       ?.trim();
//     const cleanedSearchDomains = joinedSearchDomains?.toLowerCase()?.trim();

//     console.log('cleanedSearchQueryDomains', cleanedSearchQueryDomains);
//     console.log('cleanedSearchDomains', cleanedSearchDomains);
    
//     if (cleanedSearchQueryDomains !== cleanedSearchDomains) {
//       console.log('if not equal to = ', searchQuery, search);

//       dispatch(resetMapPagePosts());
//       dispatch(setMapPageSearchQuery(search));
//     }
//   }, [search, setMapPageSearchQuery, dispatch]);

//   // get all keywords from domains
//   const keywords = domains.map((domain) => domain.split('.')[0]?.trim());
//   // console.log(keywords);


//   return (
//       <>
//       <h1 className='text-white text-2xl p-8'>{posts?.length}</h1>
//       <RenderPostAndMap keywords={keywords} />
//       {/* <TelegramMentions keyword={keywords[0]} search={search} />  */}
//       {/* <FacebookMentions keyword={keywords[0]}  search={search} /> 
//       <InstagramMentions keywords={keywords}  search={search} /> */}
//       <TwitterMentions keywords={keywords}  search={search} />  
//       {/* <VKPostsScraper keywords={keywords}  search={search} />
//       <BlueSky keywords={keywords}  search={search} />  */}
//       <Test />
//       </>
//   );
// };


// export default MapPageSearchHandle;


'use client';

import RenderPostAndMap from '@/components/map/RenderPostAndMap';
import { setMapPageSearchQuery } from '@/lib/features/map-search/searchSlices';
import { resetMapPagePosts } from '@/lib/features/posts/mapPagePostsSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
import TwitterMentions from './TwitterMentions';
import TelegramMentions from './Telegram';
import VKPostsScraper from './VKPostsScraper';
import BlueSky from './Bluesky';
import FacebookMentions from './Facebook';
import InstagramMentions from './Instagram';

const MapPageSearchHandle = ({ domains, search }) => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.mapPageSearch.searchQuery);
  const posts = useAppSelector((state) => state.mapPagePosts.posts);

  useEffect(() => {
    const formatDomains = (str) =>
      str
        ?.split(',')
        .map((d) => d.split('.')[0].trim().toLowerCase())
        .sort()
        .join(',');

    const formattedQuery = formatDomains(searchQuery);
    const formattedSearch = formatDomains(search);

    if (formattedQuery !== formattedSearch) {
      console.log('🔁 Search changed:', formattedSearch);
      dispatch(resetMapPagePosts());
      dispatch(setMapPageSearchQuery(search));
    }
  }, [search, searchQuery, dispatch]);

  const keywords = domains.map((domain) => domain.split('.')[0].trim());

  return (
    <>
      <RenderPostAndMap keywords={keywords} />
      <TelegramMentions keywords={keywords} search={search} />
      <TwitterMentions keywords={keywords} search={search} />
      <VKPostsScraper keywords={keywords} search={search} />
      <FacebookMentions keywords={keywords} search={search} />
      <InstagramMentions keywords={keywords} search={search} /> 
      <BlueSky keywords={keywords} search={search} />
    </>
  );
};

export default MapPageSearchHandle;
