'use client';
import { reset } from '@/lib/features/posts/postsSlices';
import { setSearchQuery } from '@/lib/features/search/searchSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
import DarkWebPosts from './darkWebAndSocialMediaMentions/DarkWebPosts';
import ExportRiskPDF from './download';
import SectionTitle from './SectionTitle';
import ViewMoreButton from './ViewMoreButton';
// import DarkwebXSSPosts from './darkWebAndSocialMediaMentions/DarkwebXss';
import Boardreader from './darkWebAndSocialMediaMentions/Boardreader';
import Breachforum from './darkWebAndSocialMediaMentions/Breachforum';
import DarkwebFacebookPosts from './darkWebAndSocialMediaMentions/DarkwebFacebookPosts';
import FacebookMentions from './darkWebAndSocialMediaMentions/FacebookMentions';
import InstagramMentions from './darkWebAndSocialMediaMentions/Instagram';
import Posts from './darkWebAndSocialMediaMentions/Posts';
import SearchExploit from './darkWebAndSocialMediaMentions/SearchExploit';
import SearchRamp from './darkWebAndSocialMediaMentions/SearchRamp';
import SearchXss from './darkWebAndSocialMediaMentions/SearchXss';
import TelegramMentions from './darkWebAndSocialMediaMentions/Telegram';
import Threads from './darkWebAndSocialMediaMentions/Threads';
import TwitterMentions from './darkWebAndSocialMediaMentions/TwitterMentions';
import VKPostsScraper from './darkWebAndSocialMediaMentions/VKPostsScraper';

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
  // console.log(keywords);
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

        <Breachforum keyword={keywords[0]} search={search} onlyData={true} />
        <SearchRamp keyword={keywords[0]} search={search} onlyData={true} />
        <VKPostsScraper
          keywords={keywords}
          search={search}
          onlyData={onlyData}
        />
        <SearchExploit keyword={keywords[0]} search={search} onlyData={true} />
        <SearchXss keyword={keywords[0]} search={search} onlyData={true} />

        <Boardreader
          keyword={keywords[0]}
          search={search}
          onlyData={onlyData}
        />
        <Threads keyword={keywords[0]} search={search} onlyData={true} />

        <DarkWebPosts
          keyword={keywords[0]}
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
