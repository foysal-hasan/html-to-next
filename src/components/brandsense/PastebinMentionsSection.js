import CodeMentionCard from "./CodeMentionCard";
import SectionTitle from "./SectionTitle";

const PastebinMentionsSection = ({ mentions }) => {
  const codeMentions = [
    {
      url: "pastebin.com/acme",
      date: "2022-01-02",
      domain: "acme.com",
      mention: "Acme is a great company!",
    },
    {
      url: "gist.github.com/acme",
      date: "2022-01-02",
      domain: "acme.com",
      mention: "Acme is a great company!",
    },
    {
      url: "hastebin.com/acme",
      date: "2022-01-02",
      domain: "acme.com",
      mention: "Acme is a great company!",
    },
  ];

  return (
    <div>
      <SectionTitle>Pastebin and Code Mentions</SectionTitle>
      {codeMentions.map((item, index) => (
        <CodeMentionCard
          key={index}
          url={item.url}
          date={item.date}
          domain={item.domain}
          mention={item.mention}
        />
      ))}
    </div>
  );
};

export default PastebinMentionsSection;
