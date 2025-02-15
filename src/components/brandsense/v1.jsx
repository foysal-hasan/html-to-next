import CustomButton from './CustomButton';
import DarkWebAndSocialMediaMentionsCard from './DarkWebAndSocialMediaMentionsCard';
import SectionTitle from './SectionTitle';

const DarkWebAndSocialMediaMentions = () => {
  const mentions = [
    {
      url: 'twitter.com/acme',
      date: '2022-01-02',
      text: 'Acme is a great company!',
    },
    {
      url: 'reddit.com/r/acme',
      date: '2022-01-02',
      text: 'Acme is a great company!',
    },
    {
      url: 'instagram.com/acme',
      date: '2022-01-02',
      text: 'Acme is a great company!',
    },
    {
      url: 'tiktok.com/@acme',
      date: '2022-01-02',
      text: 'Acme is a great company!',
    },
  ];

  return (
    <div className="border-[#3b4854] border-b-2 pb-8">
      <SectionTitle>Dark Web and Social Media Mentions</SectionTitle>
      {mentions.map((mention, index) => (
        <DarkWebAndSocialMediaMentionsCard
          key={index}
          url={mention.url}
          date={mention.date}
          mention={mention.text}
        />
      ))}
      <div className="flex gap-5 items-center justify-center mt-5">
        <CustomButton text="View More" />
        <CustomButton text="Download" />
      </div>
    </div>
  );
};

export default DarkWebAndSocialMediaMentions;
