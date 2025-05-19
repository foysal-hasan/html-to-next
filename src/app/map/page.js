import MapPageSearchHandle from "@/components/map/SearchHandle";

export default async function MapPage({ searchParams }) {

  const search = await searchParams;
  const keywords = search?.keywords ?? '';

  // console.log(domains);

  if (!keywords) {
    return (
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <h1 className="text-white text-2xl mb-4">Enter a keyword to search</h1>
        <p className="text-gray-400">Example: keyword1, keyword2</p>
      </div>
    );
  }

  const keywordsArray = keywords.split(',');
  return <>
    <MapPageSearchHandle
      domains={keywordsArray}
      search={keywords} 
    />
  </>;
}
