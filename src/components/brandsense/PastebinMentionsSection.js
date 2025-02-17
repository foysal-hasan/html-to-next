'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CodeMentionCard from './CodeMentionCard';
import CustomButton from './CustomButton';
import SectionTitle from './SectionTitle';

const PastebinMentionsSection = ({ domain }) => {
  const [apiResults, setApiResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApiResults = async () => {
      const url =
        `https://google-search72.p.rapidapi.com/search?q=site:pastebin.com ${domain}&lr=en-US&num=5`;

      const headers = {
        'x-rapidapi-key': 'Izk7uHBUVcmshQqKrqmko9WywG6Fp12gmsajsnDzGBPAODILlb',
        'x-rapidapi-host': 'google-search72.p.rapidapi.com',
      };
      try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
          throw new Error('You might have no credit');
        }
        const result = await response.json();
        console.log(result);

        setApiResults(result?.items);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApiResults();
  }, []);

  return (
    <div className="border-[#3b4854] border-b-2 pb-8">
      <SectionTitle>Pastebin and Code Mentions</SectionTitle>
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
            {apiResults?.map((item, index) => (
              <CodeMentionCard key={index} item={item} />
            ))}
          </div>
          <div className="flex gap-5 items-center justify-center mt-5">
            <Link href="/blogr">
              <CustomButton text="View More" />
            </Link>
            <CustomButton text="Download" />
          </div>
        </>
      )}
    </div>
  );
};

export default PastebinMentionsSection;
