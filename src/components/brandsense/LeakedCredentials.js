'use client';
import { useEffect, useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import LeakedCredentialsCard from './LeakedCredentialsCard';
import SectionTitle from './SectionTitle';
import CustomButton from './CustomButton';

const LeakedCredentials = ({ domain }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/leakcheck/?domain=${domain}`);
        const result = await res.json();
        const filteredData = result.filter(log => log.email && log.password);
        setData(filteredData || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [domain]);

  const handleDownload = () => {
    const docDefinition = {
      content: [
        { text: 'Leaked Credentials', style: 'header', margin: [0, 0, 0, 10] },
        ...data.map((log, index) => ({
          stack: [
            { text: `Domain: ${domain}`, style: 'subheader' },
            { text: `Email: ${log?.email}`, style: 'subheader' },
            { text: `Password: ${log?.password}`, style: 'subheader' },
            { text: log?.dob ? `Date: ${log?.dob}` : '', style: 'subheader' },
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
    pdfMake.createPdf(docDefinition).download('leaked-credentials.pdf');
  };

  return (
    <div className="border-[#3b4854] border-b-2 pb-8 mt-10">
      <SectionTitle>Leaked Credentials</SectionTitle>
      {loading ? (
        <div className="flex justify-center">
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
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          <div className="flex flex-col gap-10">
            {data?.slice(0, showAll ? data.length : 5).map((log, index) => (
              <LeakedCredentialsCard
                key={index}
                domain={domain}
                email={log?.email}
                password={log?.password}
                date={log?.dob}
              />
            ))}
          </div>
          <div className="flex gap-5 items-center justify-center mt-5">
            <CustomButton text={showAll ? 'Show Less' : 'View More'} onClick={() => setShowAll(!showAll)} />
            <CustomButton text="Download" onClick={handleDownload} />
          </div>
        </>
      )}
    </div>
  );
};

export default LeakedCredentials;
