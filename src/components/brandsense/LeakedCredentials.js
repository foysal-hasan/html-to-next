import LeakedCredentialsCard from './LeakedCredentialsCard';
import SectionTitle from './SectionTitle';

const LeakedCredentials = async ({ domain }) => {
  // process.env.LEAKCHECK_API_KEY
  
  try {
    const res = await fetch(
      `https://leakcheck.io/api/v2/query/${domain}?limit=10`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.LEAKCHECK_API_KEY,
        },
      },
    );
    const data = await res.json();
    // console.log(data?.result);

    return (
      <>
        <SectionTitle> Leaked Credentials</SectionTitle>
        {data?.result?.map((log, index) => (
          <LeakedCredentialsCard
            key={`${index}`}
            domain={domain}
            email={log?.email}
            password={log?.password}
            date={log?.dob}
          />
        ))}
      </>
    );
  } catch (error) {
    return null;
  }
};

export default LeakedCredentials;
