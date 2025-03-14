'use client';
import { reset } from '@/lib/features/posts/postsSlices';
import { setSearchQuery } from '@/lib/features/search/searchSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
import DarkwebFacebookPosts from './darkWebAndSocialMediaMentions/DarkwebFacebookPosts';
import DarkwebStealerMentions from './darkWebAndSocialMediaMentions/DarkwebStealerMentions';
import DarkwebXSSPosts from './darkWebAndSocialMediaMentions/DarkwebXss';
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

const DarkWebAndSocialMediaMentions = ({ domain, onlyData }) => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  useEffect(() => {
    if (searchQuery !== domain) {
      dispatch(reset());
      dispatch(setSearchQuery(domain));
    }
  }, [domain, searchQuery, dispatch]);

  const keyword = domain.split('.')[0];
  return (
    <div className={`border-[#3b4854] ${!onlyData && 'border-b-2'}  pb-8`}>
      {!onlyData && (
        <SectionTitle>Dark Web and Social Media Mentions</SectionTitle>
      )}

      <div className="max-w-4xl flex flex-col gap-10">
        <TelegramMentions
          keyword={keyword}
          domain={domain}
          onlyData={onlyData}
        />
        <InstagramMentions
            keyword={keyword}
            domain={domain}
            onlyData={onlyData}
          />

          <FacebookMentions
            keyword={keyword}
            domain={domain}
            onlyData={onlyData}
          />
          <TwitterMentions
            keyword={keyword}
            domain={domain}
            onlyData={onlyData}
          />

          <Posts keyword={keyword} domain={domain} onlyData={onlyData} />

          <DarkwebFacebookPosts
            keyword={keyword}
            domain={domain}
            onlyData={onlyData}
          />
          <DarkwebStealerMentions
            keyword={keyword}
            domain={domain}
            onlyData={onlyData}
          />
          <DarkwebXSSPosts
            keyword={keyword}
            domain={domain}
            onlyData={onlyData}
          />
          <Breachforum keyword={keyword} domain={domain} onlyData={onlyData} />
          <VKPostsScraper keyword={keyword} domain={domain} onlyData={onlyData} />
          <SearchExploit keyword={keyword} domain={domain} onlyData={onlyData} />
          <SearchXss keyword={keyword} domain={domain} onlyData={onlyData} />
          <Boardreader keyword={keyword} domain={domain} onlyData={onlyData} />
      </div>
      <div
        className={`flex gap-5 items-center  ${
          onlyData ? 'justify-end mr-[5vw]' : 'justify-center'
        } mt-5`}
      >
        {!onlyData && <ViewMoreButton />}
        <ExportRiskPDF />
      </div>
    </div>
  );
};

export default DarkWebAndSocialMediaMentions;
