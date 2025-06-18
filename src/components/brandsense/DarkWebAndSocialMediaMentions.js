'use client';
import { reset } from '@/lib/features/posts/postsSlices';
import { setSearchQuery } from '@/lib/features/search/searchSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
import DarkWebPosts from './darkWebAndSocialMediaMentions/DarkWebPosts';
import SearchExploit from './darkWebAndSocialMediaMentions/SearchExploit';
import ExportRiskPDF from './download';
import SectionTitle from './SectionTitle';
import ViewMoreButton from './ViewMoreButton';
import SearchXss from './darkWebAndSocialMediaMentions/SearchXss';
import DarkWebSearch from './darkWebAndSocialMediaMentions/DarkWebSearch';
import TelegramMentions from './darkWebAndSocialMediaMentions/Telegram';
import InstagramMentions from './darkWebAndSocialMediaMentions/Instagram';
import FacebookMentions from './darkWebAndSocialMediaMentions/FacebookMentions';
import TwitterMentions from './darkWebAndSocialMediaMentions/TwitterMentions';
import BlueSky from '../map/Bluesky';
import DarkwebFacebookPosts from './darkWebAndSocialMediaMentions/DarkwebFacebookPosts';
import VKPostsScraper from './darkWebAndSocialMediaMentions/VKPostsScraper';
import Breachforum from './darkWebAndSocialMediaMentions/Breachforum';
import SearchRamp from './darkWebAndSocialMediaMentions/SearchRamp';
// import DarkwebXSSPosts from './darkWebAndSocialMediaMentions/DarkwebXss';

const DarkWebAndSocialMediaMentions = ({ domains, onlyData, search }) => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  useEffect(() => {
    // if (searchQuery !== search) {
    //   console.log('if not equal to = ', searchQuery, search);
    //   // extract domains from searchQuery without .com, .ru, etc.
    //   const searchDomains = searchQuery.split(',').map((domain) => {
    //     return domain.split('.')[0].trim();
    //   });
    //   console.log('after process:', searchDomains.join(',') + ' ' + search);
    //   console.log(
    //     'isTrue',
    //     searchDomains.join(',').trim() !== search.trim(),
    //     searchDomains.join(',').trim(),
    //     search.trim(),
    //   );

    //   dispatch(reset());
    //   dispatch(setSearchQuery(search));
    // }

    // extract domains from searchQuery without .com, .ru, etc.
    // const searchDomains = searchQuery.split(',').map((domain) => {
    //   return domain.split('.')[0];
    // });
    // console.log('after process: ', searchDomains.join(','), search);

    // if (searchDomains.join(',').trim() !== search) {
    //   console.log('if not equal to = ', searchQuery, search);

    //   dispatch(reset());
    //   dispatch(setSearchQuery(search));
    // }

    // if (searchDomains.join(',') !== search) {
    //   dispatch(reset());
    //   dispatch(setSearchQuery(search));
    // }

    // Extract domains from searchQuery without .com, .ru, etc.
    const searchQueryDomains = searchQuery?.split(',')?.map((domain) => {
      return domain.split('.')[0].trim(); // Ensure no extra spaces around the domains
    });
    // console.log('=======================');
    // console.log('search =>', search);
    // console.log('=======================');

    const searchDomains = search?.split(',')?.map((domain) => {
      return domain.split('.')[0].trim(); // Extract domains from search as well
    });

    const joinedSearchQueryDomains = searchQueryDomains?.join(',')?.trim(); // Join domains and remove leading/trailing spaces
    const joinedSearchDomains = searchDomains?.join(',')?.trim();

    // console.log(
    //   'after process: searchQueryDomains =',
    //   `'${joinedSearchQueryDomains}'`,
    //   'searchDomains =',
    //   `'${joinedSearchDomains}'`,
    // );

    // Normalize both strings to lowercase and trim again to ensure no hidden characters
    const cleanedSearchQueryDomains = joinedSearchQueryDomains
      ?.toLowerCase()
      ?.trim();
    const cleanedSearchDomains = joinedSearchDomains?.toLowerCase()?.trim();

    if (cleanedSearchQueryDomains !== cleanedSearchDomains) {
      console.log('if not equal to = ', searchQuery, search);

      dispatch(reset());
      dispatch(setSearchQuery(search));
    }
  }, [search, searchQuery, dispatch]);

  // get all keywords from domains
  const keywords = domains.map((domain) => domain.split('.')[0]?.trim());
  // console.log(keywords);
  return (
    <div className={`border-[#3b4854] ${!onlyData && 'border-b-2'}  pb-8`}>
      {!onlyData && (
        <SectionTitle>Dark Web and Social Media Mentions</SectionTitle>
      )}

      <div className="max-w-4xl flex flex-col gap-10">
        <TelegramMentions
          keyword={keywords[0]}
          onlyData={onlyData}
          search={search}
        />  

          <InstagramMentions
          keywords={keywords}
          onlyData={onlyData}
          search={search}
        />
       

           <FacebookMentions
          keyword={keywords[0]}
          onlyData={onlyData}
          search={search}
        />  

      <TwitterMentions
          keywords={keywords}
          onlyData={onlyData}
          search={search}
        />
       
           <BlueSky keywords={keywords} onlyData={onlyData} search={search} /> 
*
          <DarkwebFacebookPosts
          keyword={keywords[0]}
          onlyData={onlyData}
          search={search}
        />


        <VKPostsScraper
          keywords={keywords}
          onlyData={onlyData}
          search={search}
        /> 



        <Breachforum keyword={keywords[0]} search={search} onlyData={true} /> 
        <SearchRamp keyword={keywords[0]} search={search} onlyData={true} />
      <SearchExploit keyword={keywords[0]} search={search} onlyData={true} /> 
         <SearchXss keyword={keywords[0]} search={search} onlyData={true} /> 

        {/* <Threads keyword={keywords[0]} onlyData={true} search={search} /> */}

 
        <DarkWebSearch keyword={keywords[0]} search={search} onlyData={true} /> 
        <DarkWebPosts keyword={keywords[0]} onlyData={onlyData} />
      </div>
      <div
        className={`flex gap-5 items-center  ${
          onlyData ? 'justify-end mr-[5vw]' : 'justify-center'
        } mt-5`}
      >
        {!onlyData && (
          <>
            <ViewMoreButton />
            <ExportRiskPDF />
          </>
        )}
      </div>
    </div>
  );
};

export default DarkWebAndSocialMediaMentions;
