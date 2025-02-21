'use client';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useEffect, useState } from 'react';
import CustomButton from './CustomButton';
import SectionTitle from './SectionTitle';
import SensitiveInformationCard from './SensitiveInformationCard';
import { useQuery } from "@tanstack/react-query";

const fetchApiResults = (domain) => {
  return async () => {
    const url =
    `https://google-search72.p.rapidapi.com/search?q=${domain}%20%2B%20confidential%20filetype%3Apdf%20OR%20filetype%3Axlsx%20OR%20filetype%3Adocx&lr=en-US&num=20`;
  
    const headers = {
    'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    'x-rapidapi-host': 'google-search72.p.rapidapi.com',
  };
    const response = await fetch(url, { headers });
    const result = await response.json();
    return result?.items;
};
}
const SensitiveInformation = ({ domain }) => {
  // const [apiResults, setApiResults] = useState([]);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const {data: apiResults, isLoading: loading, error} = useQuery({
    queryKey: ['sensitiveInformation', domain],
    queryFn: fetchApiResults(domain)
  })

  // useEffect(() => {
  //   const fetchApiResults = async () => {
  //     const url =
  //       `https://google-search72.p.rapidapi.com/search?q=${domain}%20%2B%20confidential%20filetype%3Apdf%20OR%20filetype%3Axlsx%20OR%20filetype%3Adocx&lr=en-US&num=20`;

  //     const headers = {
  //       'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
  //       'x-rapidapi-host': 'google-search72.p.rapidapi.com',
  //     };
  //     try {
  //       const response = await fetch(url, { headers });
  //       if (!response.ok) {
  //         throw new Error('You might have no credit');
  //       }
  //       const result = await response.json();
  //       console.log(result);

  //       setApiResults(result?.items);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchApiResults();
  // }, [domain]);

  const handleDownload = () => {
    const docDefinition = {
      content: [
      { text: 'Sensitive Information', style: 'header', margin: [0, 0, 0, 10] },
      ...apiResults.map((item, index) => ({
        stack: [
        { text: `Title: ${item.title}`, style: 'subheader' },
        { text: `Link: ${item.link}`, style: 'subheader' },
        { text: `Display Link: ${item.displayLink}`, style: 'subheader' },
        { text: `Snippet: ${item.snippet}`, style: 'subheader' },
        ],
        margin: [0, 10, 0, 0]
      }))
      ],
      styles: {
      header: {
        fontSize: 18,
        bold: true
      },
      subheader: {
        fontSize: 14,
        margin: [0, 5, 0, 5]
      }
      }
    };
    pdfMake.createPdf(docDefinition).download('sensitive-information.pdf');
  };

  return (
    <div className="border-[#3b4854] border-b-2 pb-8 mt-10">
      <SectionTitle>Sensitive Information</SectionTitle>
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
        <p className="text-red-500 text-center">{error.message}</p>
      ) : (
        <>
          <div className="flex flex-col gap-10">
            {apiResults?.slice(0, showAll ? apiResults.length : 5).map((item, index) => (
              <SensitiveInformationCard key={index} item={item} />
            ))}
          </div>
          <div className="flex gap-5 items-center justify-center mt-5">
            <CustomButton text={showAll ? "Show Less" : "View More"} onClick={() => setShowAll(!showAll)} />
            <CustomButton text="Download" onClick={handleDownload} />
          </div>
        </>
      )}
    </div>
  );
};

export default SensitiveInformation;
