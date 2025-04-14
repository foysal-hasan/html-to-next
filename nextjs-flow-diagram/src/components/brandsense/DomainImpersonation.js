'use client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import CustomButton from './CustomButton';
import DomainImpersonationCard from './DomainImpersonationCard';
import SectionTitle from './SectionTitle';
import pdfMake from 'pdfmake/build/pdfmake';

const fetchDomains = (domain) => {
  return async () => {
    const url = 'https://brand-alert.whoisxmlapi.com/api/v2';
    const body = {
      apiKey: 'at_TEVWuqpjWNtLnF52zzZ354HHIp3PH',
      sinceDate: '2025-02-02',
      mode: 'purchase',
      withTypos: false,
      responseFormat: 'json',
      punycode: true,
      includeSearchTerms: [domain?.split('.')[0]],
      excludeSearchTerms: [],
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(url, options);
    const result = await response.json();
    return result?.domainsList;
  };
};

const Top = ({ domain }) => {
  // const [domains, setDomains] = useState([]);
  // const [errorMessage, setErrorMessage] = useState('');
  const {
    data: domains,
    isLoading: loading,
    error,
    isError,
  } = useQuery({
    queryKey: ['domainImpersonation-top', domain],
    queryFn: fetchDomains(domain),
  });

  // console.log(domain);

  // useEffect(() => {
  //   const fetchDomains = async () => {
  //     const url = 'https://brand-alert.whoisxmlapi.com/api/v2';
  //     const body = {
  //       apiKey: 'at_TEVWuqpjWNtLnF52zzZ354HHIp3PH',
  //       sinceDate: '2025-02-02',
  //       mode: 'purchase',
  //       withTypos: false,
  //       responseFormat: 'json',
  //       punycode: true,
  //       includeSearchTerms: [domain?.split('.')[0]],
  //       excludeSearchTerms: [],
  //     };

  //     const options = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(body),
  //     };

  //     try {
  //       const response = await fetch(url, options);
  //       const result = await response.json();
  //       console.log('result from domain Impersonation', result);

  //       if (result.errorMessage) {
  //         setErrorMessage(result.errorMessage);
  //       } else {
  //         setDomains(result?.domainsList?.slice(0, 5));
  //       }
  //     } catch (error) {
  //       console.log(error);

  //       console.error(error);
  //       setErrorMessage('An error occurred while fetching the domains.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDomains();
  // }, [domain]);

  if (!domains || domains?.length == 0) return null;

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <svg
          className="animate-spin h-20 w-20 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">You might have no credit</p>;
  }
  return (
    <>
      {domains?.map((item, index) => (
        <DomainImpersonationCard
          key={index}
          name={item?.domainName}
          date={item?.date}
          action={item?.action}
        />
      ))}
    </>
  );
};

const result = {
  detected: [
    {
      country: 'US',
      extracted: 'unavailable',
      found: 2,
      language: 'English',
      link: 'https://facebook.com/test_user',
      metadata: [
        {
          content: 'origin-when-crossorigin',
          name: 'referrer',
        },
        {
          content: 'noarchive',
          name: 'bingbot',
        },
        {
          content:
            'Log into Facebook to start sharing and connecting with your friends, family, and people you know.',
          name: 'description',
        },
        {
          content: 'Facebook',
          property: 'og:site_name',
        },
        {
          content:
            'https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2Ftest_user',
          property: 'og:url',
        },
        {
          content: 'en_US',
          property: 'og:locale',
        },
      ],
      rank: 7,
      rate: '%100.0',
      status: 'good',
      text: 'Log into Facebook Notice You must log in to continue. Log Into Facebook Log In Forgot account? · Sign up for Facebook English (US) Español Français (France) 中文(简体) العربية Português (Brasil) Italiano 한국어 Deutsch हिन्दी 日本語 Sign Up Messenger Facebook Lite Video Places Games Marketplace Meta Pay Meta Store Meta Quest Ray-Ban Meta Meta AI Instagram Threads Fundraisers Services Voting Information Center Privacy Policy Consumer Health Privacy Privacy Center Groups About Create ad Create Page Developers Careers Cookies Ad choices Terms Help Contact Uploading & Non-Users Settings Activity log Meta © 2025',
      title: 'Log into Facebook',
      type: 'Computers Electronics and Technology > Social Networks and Online Communities',
    },
    {
      country: 'US',
      extracted: 'unavailable',
      found: 2,
      language: 'English',
      link: 'https://en.wikipedia.org/wiki/Special:CentralAuth/test_user',
      metadata: [
        {
          name: 'ResourceLoaderDynamicStyles',
        },
        {
          content: 'MediaWiki 1.44.0-wmf.15',
          name: 'generator',
        },
        {
          content: 'origin, origin-when-cross-origin',
          name: 'referrer',
        },
        {
          content: 'telephone=no',
          name: 'format-detection',
        },
        {
          content: 'Global account information for Test user - Wikipedia',
          property: 'og:title',
        },
        {
          content: 'website',
          property: 'og:type',
        },
      ],
      rank: 13,
      rate: '%100.0',
      status: 'good',
      text: 'Global account information for Test user - Wikipedia Jump to content Main menu move to sidebar hide Navigation Main page Contents Current events Random article About Wikipedia Contact us Contribute Help Learn to edit Community portal Recent changes Upload file Languages Search Appearance Donate Create account Log in Personal tools Pages for logged out editors learn more Contributions Talk Global account information English Tools Actions General User contributions User logs Special pages Printable version Get shortened URL Download QR code In other projects View account information Username: View user information Test user Registered: 14:17, 17 March 2015 (9 years ago) Total edit count: 8 Number of attached accounts: 1 List of local accounts Local wiki Attached on Method Blocked Edit count Groups uk.wikipedia.org 14:17, 17 March 2015 (?) — Retrieved from " https://en.wikipedia.org/wiki/Special:CentralAuth/test_user " Privacy policy Disclaimers Contact Wikipedia Code of Conduct Developers Statistics Cookie statement Mobile view Add topic',
      title: 'Global account information for Test user - Wikipedia',
      type: 'Reference Materials > Dictionaries and Encyclopedias',
    },
    {
      country: 'US',
      extracted: 'unavailable',
      found: 3,
      language: 'Finnish (Maybe)',
      link: 'https://discussions.apple.com/profile/test_user',
      metadata: [
        {
          name: 'encryption',
        },
        {
          content: 'S2A49YFKJF2JAT22K',
          name: 'globalnav-store-key',
        },
        {
          content: 'false',
          name: 'globalnav-submenus-enabled',
        },
        {
          content: 'q',
          name: 'globalnav-search-field[name]',
        },
        {
          content: 'https://support.apple.com/kb/index',
          name: 'globalnav-search-field[action]',
        },
        {
          content: 'globalnav_support',
          name: 'globalnav-search-field[src]',
        },
        {
          content: 'organic',
          name: 'globalnav-search-field[type]',
        },
        {
          content: 'search',
          name: 'globalnav-search-field[page]',
        },
        {
          content: 'en_US',
          name: 'globalnav-search-field[locale]',
        },
        {
          content: 'Search Support',
          name: 'globalnav-search-field[placeholder]',
        },
      ],
      rank: 54,
      rate: '%100.0',
      status: 'good',
      text: 'test_user’s Profile - Apple Community Apple Store Mac iPad iPhone Watch Vision AirPods TV & Home Entertainment Accessories Support 0 + Community Local Nav Open Menu Local Nav Close Menu Browse Search Sign in Sign in corporate User profile for user: test_user test_user User level: Level\\xa01 0 points Participation Achievements Subscriptions Replies All time Participation in Threads Total number of threads replied to User Tips Authored User Tips Total number of User Tips written. User Tips Views Total number of views for all authored User Tips. Welcome to Apple Support Community A forum where Apple customers help each other with their products. Get started with your Apple Account. Learn more Sign up Apple Footer This site contains user submitted content, comments and opinions and is for informational purposes\\n only. Apple may provide or recommend responses as a possible solution based on the information\\n provided; every potential issue may involve several factors not detailed in the conversations\\n captured in an electronic forum and Apple can therefore provide no guarantee as to the efficacy of\\n any proposed solutions on the community forums. Apple disclaims any and all liability for the acts,\\n omissions and conduct of any third parties in connection with or related to your use of the site.\\n All postings and use of the content on this site are subject to the Apple Support Community Terms of Use . See how your data is managed... \\ More ways to shop: Visit an Apple Store , call\\n 1-800-MY-APPLE, or find a reseller United States Copyright © Apple Inc. All rights reserved. Privacy Policy Terms of Use Sales and\\n Refunds Legal Site Map Ask a question Reset',
      title: 'test_user’s Profile - Apple Community',
      type: 'Computers Electronics and Technology > Consumer Electronics',
    },
    {
      country: 'US',
      extracted: 'unavailable',
      found: 2,
      language: 'English',
      link: 'https://tradingview.com/u/test_user',
      metadata: [
        {
          content:
            'Charts, forecasts and trading ideas from trader test_user. Get unique market insights from the largest community of active traders and investors.',
          name: 'description',
        },
        {
          content: 'TradingView',
          name: 'application-name',
        },
        {
          content: 'telephone=no',
          name: 'format-detection',
        },
        {
          content: 'TradingView Site',
          name: 'apple-mobile-web-app-title',
        },
        {
          content: 'yes',
          name: 'apple-mobile-web-app-capable',
        },
        {
          content: 'black',
          name: 'apple-mobile-web-app-status-bar-style',
        },
        {
          content: '1205990992',
          property: 'al:ios:app_store_id',
        },
        {
          content: 'TradingView - trading community, charts and quotes',
          property: 'al:ios:app_name',
        },
        {
          content: 'TradingView',
          property: 'og:site_name',
        },
        {
          content: 'profile',
          property: 'og:type',
        },
        {
          property: 'og:title',
        },
        {
          property: 'og:description',
        },
        {
          content: 'https://www.tradingview.com/u/test_user/',
          property: 'og:url',
        },
        {
          content:
            'https://static.tradingview.com/static/images/logo-preview.png',
          property: 'og:image',
        },
        {
          content:
            'https://static.tradingview.com/static/images/logo-preview.png',
          property: 'og:image:secure_url',
        },
        {
          content: '@TradingView',
          name: 'twitter:site',
        },
        {
          content: 'summary',
          name: 'twitter:card',
        },
        {
          name: 'twitter:title',
        },
        {
          name: 'twitter:description',
        },
        {
          content: 'https://www.tradingview.com/u/test_user/',
          name: 'twitter:url',
        },
        {
          content:
            'https://static.tradingview.com/static/images/logo-preview.png',
          name: 'twitter:image',
        },
        {
          content:
            'f729ff74def35be4b9b92072c0e995b40fcb9e1aece03fb174343a1b7a5350ce',
          name: 'ahrefs-site-verification',
        },
        {
          content: 'prod-frontend-web-a-5',
          name: 'tv:server-name',
        },
      ],
      rank: 68,
      rate: '%100.0',
      status: 'good',
      text: 'Trader test_user — Trading Ideas & Charts — TradingView — TradingView Search Products Community Markets News Brokers More EN Get started test_user Last seen Jan 19, 2024 Followers 0 Following Ideas Scripts Follow Gift a subscription since May 16, 2018 · Also on : Minds Published Commented All Types Type Indicators Strategies Libraries All Accesses Script access Open Protected Invite-only Public & Private Privacy Public Private User has no published ideas yet User has no followers User follows nobody Love in every\\n#TradingView 90M+ Traders and investors use our platform. #1 Top website in the world when it comes to all things investing. 1.5M+ Mobile reviews with 4.9 average rating. No other fintech apps are more loved. 10M+ Custom scripts and ideas shared by our users. @chriskane.fx @newcapitalfx @hallandcotrading @thetradingfield @Crypto Playhouse @noxonfx @mytradingsetup @rw_shallowaf @Fatih Esin @bright_james1988 @anita.febrero @Cenobar @MisterSpread @aggressivecalculator @Tradeciety - Rolf @tradinglifestylestore @_jontradercom_ @mrfrankly__ Whatever the trade "Heres why" English Supercharts Pine Script™ Stock Screener ETF Screener Bond Screener Crypto Coins Screener Crypto Pairs Screener DEX Pairs Screener Stock Heatmap ETF Heatmap Crypto Heatmap Economic Calendar Earnings Calendar Sparks TradingView Desktop Mobile app CME Group futures Eurex futures US stocks bundle Company About Features Pricing Social network Wall of Love Athletes Manifesto Careers Blog Security vulnerability Status page Terms of use Disclaimer Privacy policy Cookies policy Media kit Accessibility statement Tarot cards for traders TradingView merch store Refer a friend House rules Moderators Pine Script™ Wizards Chat For business Widgets Advertising Charting libraries Lightweight Charts™ Advanced Charts Trading Platform Brokerage integration Partner program Education program Select market data provided by ICE Data Services Select reference data provided by FactSet. Copyright ©\\xa02025\\xa0FactSet\\xa0Research\\xa0Systems\\xa0Inc. © 2025 TradingView, Inc. US phone number 833 247 1523',
      title:
        'Trader test_user — Trading Ideas & Charts — TradingView — TradingView',
      type: 'Finance > Investing',
    },
    {
      country: 'US',
      extracted: 'unavailable',
      found: 2,
      language: 'English',
      link: 'https://xvideos.com/profiles/test_user',
      metadata: [
        {
          content:
            'Test User,profile,porn,videos,free,chat,fans,updates,straight Man',
          name: 'keywords',
        },
        {
          content: 'Test User,free videos, latest updates and direct chat',
          name: 'description',
        },
        {
          content: 'RTA-5042-1996-1400-1577-RTA',
          name: 'RATING',
        },
        {
          content: 'telephone=no',
          name: 'format-detection',
        },
      ],
      rank: 87,
      rate: '%100.0',
      status: 'good',
      text: 'Test User - Profile page - XVIDEOS.COM Language: Your location : USA Straight Login Join for FREE Premium Best Videos Categories Porn in your language 3d AI Amateur Anal Arab Asian ASMR Ass BBW Bi Big Ass Big Cock Big Tits Black Blonde Blowjob Brunette Cam Porn Casting Caught Cheating Chubby Compilation Creampie Cuckold/Hotwife Cumshot Deepthroat Femboy Femdom Fisting Fucked Up Family Furry Gangbang Gapes Gay Goth Handjob Hardcore Indian Interracial Joi Latina Lesbian Lingerie Mature Milf Movie Oiled Orgasm Pov Real Redhead Rough Shemale Solo Squirting Stockings Teacher Teen Wife Gay Porn Shemale Porn All tags Channels Pornstars RED videos Live Cams 5,400+ Games Dating Profiles Liked videos My subs History Version : Trans Version : USA Test User Man, 39y 39 years old, Man 0 Gender: Man Age: 39 years old Country: United Kingdom Profile hits: 112 Subscribers: Region: Hampshire City: Reading Signed up: October 17, 2016 (3,038 days ago) Contact: Chat with Test User Remove ads - Upgrade to Premium Ads by TrafficFactory Make money with XVIDEOS - Terms of service Privacy policy Cookie preferences Upload Your Videos Content removal Advertising RSS Deletes Privacy notice XV PREMIUM More... XVideos.com - the best free porn videos on internet, 100% free.',
      title: 'Test User - Profile page - XVIDEOS.COM',
      type: 'Adult',
    },
    {
      country: 'unavailable',
      extracted: 'unavailable',
      found: 3,
      language: 'English',
      link: 'https://vk.com/test_user',
      metadata: [
        {
          content:
            'http://sun6-21.userapi.com/s/v1/ig2/od2AlxQLSXAJOTeCjlvnjmaDkHevSdjwoIGcrS9huqFfzV3eN_LymUtOS3KseXq2UbNDOHkfb4C1NdEAy8ZkxWQ6.jpg?quality=95&crop=515,628,993,993&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=240x240',
          property: 'og:image',
        },
        {
          content:
            'https://sun6-21.userapi.com/s/v1/ig2/od2AlxQLSXAJOTeCjlvnjmaDkHevSdjwoIGcrS9huqFfzV3eN_LymUtOS3KseXq2UbNDOHkfb4C1NdEAy8ZkxWQ6.jpg?quality=95&crop=515,628,993,993&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720&ava=1&cs=240x240',
          property: 'og:image:secure_url',
        },
        {
          content: 'Alexander Sharipov',
          property: 'og:title',
        },
        {
          content: 'Липецк',
          property: 'og:description',
        },
        {
          content: 'https://vk.com/id26754291',
          property: 'og:url',
        },
        {
          content: 'VK',
          property: 'og:site_name',
        },
        {
          content: 'profile',
          property: 'og:type',
        },
      ],
      rank: 29,
      rate: '%100.0',
      status: 'good',
      text: 'Alexander Sharipov | VK Switch to English sign up Phone or email Password Sign in Sign up Music Videos Communities Mini apps Games Mobile app Recommendation technologies used VK © 2006-2025 About VK Help Terms For business Developers Careers Русский English All languages',
      title: 'Alexander Sharipov | VK',
      type: 'Internet',
    },
  ],
};

const Bottom = ({ domain }) => {
  const [socialScannerResult, setSocialScannerResult] = useState(
    result.detected,
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchDomains = async () => {
  //     const url = 'https://social-scanner.p.rapidapi.com/social-scan';

  //     const headers = {
  //       'x-rapidapi-key': 'Izk7uHBUVcmshQqKrqmko9WywG6Fp12gmsajsnDzGBPAODILlb',
  //       'x-rapidapi-host': 'social-scanner.p.rapidapi.com',
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     };

  //     const form = new FormData();
  //     form.append('username', 'test_user');
  //     form.append('target_count', 5);

  //     const options = {
  //       method: 'POST',
  //       headers,
  //       body: form,
  //     };

  //     try {
  //       const response = await fetch(url, options);
  //       const result = await response.json();
  //       console.log('result from domain Impersonation', result);

  //       if (result.errorMessage) {
  //         setErrorMessage(result.errorMessage);
  //       } else {
  //         setDomains(result.detected.slice(0, 5));
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setErrorMessage('An error occurred while fetching the domains.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDomains();
  // }, [domain]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <svg
          className="animate-spin h-20 w-20 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );
  }

  if (errorMessage) {
    return <p className="text-red-500 text-center">You might have no credit</p>;
  }

  return (
    <>
      {socialScannerResult?.map((item, index) => (
        <div
          key={index}
          className="p-4 mb-4  text-[#9dabb9]  flex flex-col gap-1 bg-[#111518]"
        >
          <p className="break-all">
            <strong className="text-white">Link:</strong>{' '}
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.link}
            </a>
          </p>
          <p className="break-all">
            <strong className="text-white">Text:</strong> {item.text}
          </p>
          <p className="break-all">
            <strong className="text-white">Rank:</strong> {item.rank}
          </p>
          <p className="break-all">
            <strong className="text-white">Country:</strong> {item.country}
          </p>
          <p className="break-all">
            <strong className="text-white">Type:</strong> {item.type}
          </p>
        </div>
      ))}
    </>
  );
};

const DomainImpersonation = ({ domain }) => {
  console.log(domain);

  const {
    data: domains,
    isLoading: loading,
    error,
    isError,
  } = useQuery({
    queryKey: ['domainImpersonation-top', domain],
    queryFn: fetchDomains(domain),
  });

  const [showAll, setShowAll] = useState(false);

  if (!domains || domains?.length == 0) return null;

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <svg
          className="animate-spin h-20 w-20 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">You might have no credit</p>;
  }

  const displayedDomains = showAll ? domains : domains.slice(0, 5);
  const handleDownload = () => {
    const docDefinition = {
      content: [
        {
          text: 'Domain Impersonation',
          style: 'header',
          margin: [0, 0, 0, 10],
        },
        ...domains.map((item, index) => ({
          stack: [
            { text: `Domain Name: ${item?.domainName}`, style: 'subheader' },
            { text: `Date: ${item?.date}`, style: 'subheader' },
            { text: `Action: ${item?.action}`, style: 'subheader' },
            {
              text: '----------------------------------------',
              margin: [0, 10, 0, 0],
            },
          ],
          margin: [0, 10, 0, 0],
        })),
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          margin: [0, 5, 0, 5],
        },
      },
    };
    pdfMake.createPdf(docDefinition).download('domain-impersonation.pdf');
  };
  return (
    <div className="border-[#3b4854] border-b-2 pb-8">
      <SectionTitle>Domain Impersonation</SectionTitle>
      {displayedDomains?.map((item, index) => (
        <DomainImpersonationCard
          key={index}
          name={item?.domainName}
          date={item?.date}
          action={item?.action}
        />
      ))}
      <div className="flex gap-5 items-center justify-center mt-5">
        <div className="flex gap-2">
          <CustomButton
            text={showAll ? 'Show Less' : 'View More'}
            onClick={() => setShowAll(!showAll)}
          />
          <CustomButton text="Download" onClick={handleDownload} />
        </div>
      </div>
    </div>
  );
};

export default DomainImpersonation;
