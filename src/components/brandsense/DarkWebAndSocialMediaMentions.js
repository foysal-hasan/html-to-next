'use client';
import { setSearchQuery } from '@/lib/features/search/searchSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
import DarkwebFacebookPosts from './darkWebAndSocialMediaMentions/DarkwebFacebookPosts';
import DarkwebStealerMentions from './darkWebAndSocialMediaMentions/DarkwebStealerMentions';
import DarkwebXSSPosts from './darkWebAndSocialMediaMentions/DarkwebXss';
import FacebookMentions from './darkWebAndSocialMediaMentions/FacebookMentions';
import InstagramMentions from './darkWebAndSocialMediaMentions/Instagram';
import TelegramMentions from './darkWebAndSocialMediaMentions/Telegram';
import TwitterMentions from './darkWebAndSocialMediaMentions/TwitterMentions';
import ExportRiskPDF from './download';
import SectionTitle from './SectionTitle';
import ViewMoreButton from './ViewMoreButton';
import { reset, resetRiskAnalysis } from '@/lib/features/posts/postsSlices';
import Posts from './darkWebAndSocialMediaMentions/Posts';

const DarkWebAndSocialMediaMentions = ({ domain }) => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  useEffect(() => {
    if (searchQuery !== domain) {
      dispatch(reset());
      dispatch(setSearchQuery(domain));
    }
  }, [domain]);

  const keyword = domain.split('.')[0];
  return (
    <div className="border-[#3b4854] border-b-2 pb-8">
      <SectionTitle>Dark Web and Social Media Mentions</SectionTitle>

      <div className="max-w-4xl flex flex-col gap-10">

        
        <TelegramMentions keyword={keyword} domain={domain} />
        <InstagramMentions keyword={keyword} domain={domain} />
         <FacebookMentions keyword={keyword} domain={domain} />
        <TwitterMentions keyword={keyword} domain={domain} />
        <Posts keyword={keyword} domain={domain} />
        
        <DarkwebFacebookPosts keyword={keyword} domain={domain} />
        <DarkwebStealerMentions keyword={keyword} domain={domain} />
        <DarkwebXSSPosts keyword={keyword} domain={domain} />
      </div>
      <div className="flex gap-5 items-center justify-center mt-5">
        <ViewMoreButton />
        <ExportRiskPDF />
      </div>
    </div>
  );
};

export default DarkWebAndSocialMediaMentions;
