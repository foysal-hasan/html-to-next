function DomainImpersonationCard({ name, action, date }) {
  return (
    <div className="flex gap-4 bg-[#111518] px-4 py-3 justify-between">
      <div className="flex flex-1 flex-col justify-center">
        <p className="text-white text-base font-medium leading-normal  break-all">
          Domain: {name}
        </p>
        <p className="text-[#9dabb9] text-sm font-normal leading-normal  break-all">
          Action: {action}
        </p>
        <p className="text-[#9dabb9] text-sm font-normal leading-normal">
          Date: {date}
        </p>
      </div>
      <div className="shrink-0">
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#283139] text-white text-sm font-medium leading-normal w-fit">
          <span className="truncate">View domain</span>
        </button>
      </div>
    </div>
  );
}

export default DomainImpersonationCard;
