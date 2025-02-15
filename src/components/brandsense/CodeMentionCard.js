const CodeMentionCard = ({ item: { title, link, displayLink, snippet } }) => {
  // Determine button text based on the URL
  const buttonText = link?.includes('gist.github.com')
    ? 'View gist'
    : 'View paste';
  return (
    <div className="flex gap-4 bg-[#111518] px-4 py-3 justify-between">
      <div className="flex flex-1 flex-col justify-center gap-3">
        <p className="text-white text-base font-medium leading-normal">
          Title: {title}
        </p>
        {/* <p className="text-[#9dabb9] text-sm font-normal leading-normal">
          Date: {date}
        </p> */}
        <p className="text-[#9dabb9] text-sm font-normal leading-normal text-wrap break-words break-all">
          {/* Mention: {mention} */}
          <span className="text-white font-medium">Link: </span>
          {link}
        </p>
        <p className="text-[#9dabb9] text-sm font-normal leading-normal text-wrap break-words break-all">
          <span className="text-white font-medium">Display Link:</span>{' '}
          {displayLink}
        </p>

        <p className="text-[#9dabb9] text-sm font-normal leading-normal text-wrap break-words break-all">
          <span className="text-white font-medium">Snippet:</span> {snippet}
        </p>
      </div>
      <div className="shrink-0">
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#283139] text-white text-sm font-medium leading-normal w-fit">
          <span className="truncate">{buttonText}</span>
        </button>
      </div>
    </div>
  );
};

export default CodeMentionCard;
