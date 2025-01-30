import SectionTitle from "./SectionTitle";
import SensitiveInformationCard from "./SensitiveInformationCard";

const SensitiveInformation = () => {
  const sensitiveInformationData = [
    {
      domain: "acme.com",
      date: "2022-01-02",
      mention: "Domain: acme.com Mention: Acme is a great company!",
    },
    {
      domain: "example.com",
      date: "2023-03-15",
      mention: "Domain: example.com Mention: Example site is informative.",
    },
    {
      domain: "testsite.com",
      date: "2024-05-08",
      mention: "Domain: testsite.com Mention: Testsite has great resources.",
    },
  ];

  return (
    <div>
      <SectionTitle> Sensitive Information</SectionTitle>
      {sensitiveInformationData.map((info, index) => (
        <SensitiveInformationCard
          key={index}
          domain={info.domain}
          date={info.date}
          mention={info.mention}
        />
      ))}
    </div>
  );
};

export default SensitiveInformation;
