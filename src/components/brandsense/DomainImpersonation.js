import DomainImpersonationCard from "./DomainImpersonationCard";
import SectionTitle from "./SectionTitle";

const DomainImpersonation = () => {
  const impersonatedDomains = [
    { name: "acme.co", date: "2022-01-02" },
    { name: "acme.io", date: "2022-01-02" },
    { name: "acme.net", date: "2022-01-02" },
    { name: "acme.org", date: "2022-01-02" },
  ];
  return (
    <>
      <SectionTitle>Domain Impersonation</SectionTitle>
      {impersonatedDomains.map((item, index) => (
        <DomainImpersonationCard
          key={index}
          name={item.name}
          date={item.date}
        />
      ))}
    </>
  );
};

export default DomainImpersonation;
