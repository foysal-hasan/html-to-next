import Link from 'next/link';

const SensitiveInformatioCard = ({
  item: { title, link, displayLink, snippet },
}) => {
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
        <Link href={link} target="_blank">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#283139] text-white text-sm font-medium leading-normal w-fit">
            <span className="truncate">View mention</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SensitiveInformatioCard;

// const SensitiveInformatioCard = ({ domain, date, mention }) => {
//   return (
//     <div className="flex gap-4 bg-[#111518] px-4 py-3 justify-between">
//       {/* Text Information */}
//       <div className="flex flex-1 flex-col justify-center">
//         <p className="text-white text-base font-medium leading-normal">
//           {domain}
//         </p>
//         <p className="text-[#9dabb9] text-sm font-normal leading-normal">
//           Date: {date}
//         </p>
//         <p className="text-[#9dabb9] text-sm font-normal leading-normal">
//           {mention}
//         </p>
//       </div>

//       {/* View Mention Button */}
//       <div className="shrink-0">
//         <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#283139] text-white text-sm font-medium leading-normal w-fit">
//           <span className="truncate">View mention</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SensitiveInformatioCard;
