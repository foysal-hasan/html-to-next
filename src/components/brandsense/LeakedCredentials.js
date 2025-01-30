import LeakedCredentialsCard from "./LeakedCredentialsCard";
import SectionTitle from "./SectionTitle";

const LeakedCredentials = () => {
  const leakedCredentialsList = {
    domain: "acme.com",
    email: "john.doe@acme.com",
    password: "**********",
  };
  return (
    <>
      <SectionTitle> Leaked Credentials</SectionTitle>
      <LeakedCredentialsCard
        domain={leakedCredentialsList.domain}
        email={leakedCredentialsList.email}
        password={leakedCredentialsList.password}
      />
    </>
  );
};

export default LeakedCredentials;
