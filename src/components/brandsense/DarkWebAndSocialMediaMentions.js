'use client';
import { resetRiskAnalysis, setNormalizedPosts, setRisksForPosts } from '@/lib/features/posts/postsSlices';
import { setSearchQuery } from '@/lib/features/search/searchSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import DarkWebAndSocialMediaMentionsCard from './DarkWebAndSocialMediaMentionsCard';
import ExportRiskPDF from './download';
import SectionTitle from './SectionTitle';
import ViewMoreButton from './ViewMoreButton';
import InstagramMentions from './darkWebAndSocialMediaMentions/Instagram';
import FacebookMentions from './darkWebAndSocialMediaMentions/FacebookMentions';
import TwitterMentions from './darkWebAndSocialMediaMentions/TwitterMentions';
import TelegramMentions from './darkWebAndSocialMediaMentions/Telegram';
import DarkwebFacebookPosts from './darkWebAndSocialMediaMentions/DarkwebFacebookPosts';
import DarkwebStealerMentions from './darkWebAndSocialMediaMentions/DarkwebStealerMentions';
import DarkwebXSSPosts from './darkWebAndSocialMediaMentions/DarkwebXss';

const DarkWebAndSocialMediaMentions = ({ domain }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch()

  const stopLoader = () =>{
    setLoading(false)
  }
  useEffect(()=>{
    dispatch(resetRiskAnalysis())
  }, [domain])

  const keyword = domain.split('.')[0];
  return (
    <div className="border-[#3b4854] border-b-2 pb-8">
      <SectionTitle>Dark Web and Social Media Mentions</SectionTitle>

      <div className='max-w-4xl flex flex-col gap-10'>
        <InstagramMentions keyword={keyword} stopLoader={stopLoader} /> 
        <FacebookMentions keyword={keyword} stopLoader={stopLoader} />
        <TwitterMentions keyword={keyword} stopLoader={stopLoader} />
        <TelegramMentions keyword={keyword} stopLoader={stopLoader} /> 
        <DarkwebFacebookPosts keyword={keyword} stopLoader={stopLoader} />
        <DarkwebStealerMentions keyword={keyword} stopLoader={stopLoader} />
        <DarkwebXSSPosts keyword={keyword} /> 
      </div>
      <div className="flex gap-5 items-center justify-center mt-5">
        <ViewMoreButton />
        <ExportRiskPDF />
      </div>
     
    </div>
  );
};

export default DarkWebAndSocialMediaMentions;
