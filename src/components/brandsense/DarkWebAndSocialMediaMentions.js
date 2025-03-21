'use client';
import { reset } from '@/lib/features/posts/postsSlices';
import { setSearchQuery } from '@/lib/features/search/searchSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
import DarkwebFacebookPosts from './darkWebAndSocialMediaMentions/DarkwebFacebookPosts';
import SearchXss from './darkWebAndSocialMediaMentions/SearchXss';
import ExportRiskPDF from './download';
import SectionTitle from './SectionTitle';
import ViewMoreButton from './ViewMoreButton';
import Posts from './darkWebAndSocialMediaMentions/Posts';
import TelegramMentions from './darkWebAndSocialMediaMentions/Telegram';
import InstagramMentions from './darkWebAndSocialMediaMentions/Instagram';
import FacebookMentions from './darkWebAndSocialMediaMentions/FacebookMentions';
import TwitterMentions from './darkWebAndSocialMediaMentions/TwitterMentions';
import Breachforum from './darkWebAndSocialMediaMentions/Breachforum';
import VKPostsScraper from './darkWebAndSocialMediaMentions/VKPostsScraper';
import SearchExploit from './darkWebAndSocialMediaMentions/SearchExploit';
import Boardreader from './darkWebAndSocialMediaMentions/Boardreader';
import Threads from './darkWebAndSocialMediaMentions/Threads';
import DarkwebXSSPosts from './darkWebAndSocialMediaMentions/DarkwebXss';

const DarkWebAndSocialMediaMentions = ({ domains, onlyData, search }) => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  useEffect(() => {
    if (searchQuery !== search) {
      dispatch(reset());
      dispatch(setSearchQuery(search));
    }
  }, [search, searchQuery, dispatch]);

  // get all keywords from domains
  const keywords = domains.map((domain) => domain.split('.')[0]?.trim());
  console.log(keywords);
  return (
    <div className={`border-[#3b4854] ${!onlyData && 'border-b-2'}  pb-8`}>
      {!onlyData && (
        <SectionTitle>Dark Web and Social Media Mentions</SectionTitle>
      )}

      <div className="max-w-4xl flex flex-col gap-10">
        <TelegramMentions
          keyword={keywords[0]}
          search={search}
          onlyData={onlyData}
        />
        <InstagramMentions
          keywords={keywords}
          search={search}
          onlyData={onlyData}
        />

        <FacebookMentions
          keyword={keywords[0]}
          search={search}
          onlyData={onlyData}
        />

        <TwitterMentions
          keywords={keywords}
          search={search}
          onlyData={onlyData}
        />

        <Posts keywords={keywords} search={search} onlyData={onlyData} />

        <DarkwebFacebookPosts
          keyword={keywords[0]}
          search={search}
          onlyData={onlyData}
        />

        {/* <Breachforum
          keyword={keywords[0]}
          search={search}
          onlyData={onlyData}
        /> */}

        <VKPostsScraper
          keywords={keywords}
          search={search}
          onlyData={onlyData}
        />
        <SearchExploit
          keyword={keywords.join(',')}
          search={search}
          onlyData={onlyData}
        />
        <SearchXss
          keyword={keywords.join(',')}
          search={search}
          onlyData={onlyData}
        />
        <Boardreader
          keyword={keywords.join(',')}
          search={search}
          onlyData={onlyData}
        />
        <Threads
          keyword={keywords.join(',')}
          search={search}
          onlyData={onlyData}
        />
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
