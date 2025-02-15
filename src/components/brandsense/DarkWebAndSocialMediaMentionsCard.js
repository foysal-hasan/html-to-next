const getRiskClass = (risk) => {
  switch (risk && risk.toLowerCase()) {
    case "low":
      return "bg-green-500"; // Green for low risk
    case "medium":
      return "bg-yellow-500"; // Yellow for medium risk
    case "high":
      return "bg-red-500"; // Red for high risk
    default:
      return "bg-gray-500"; // Default gray if risk level is unknown
  }
};

const DarkWebAndSocialMediaMentionsCard = ({ url, date, content, risk }) => {
  return (
    <div className="flex gap-4 bg-[#111518] px-4 py-3 justify-between">
      <div className="flex flex-1 flex-col justify-center gap-2">
        <p className="text-white text-base font-medium leading-normal">{url}</p>
        <p className="text-[#9dabb9] text-sm font-normal leading-normal">
        <span className="text-white">Date: </span>{new Date(date).toDateString()}

        </p>
        <p className="text-[#9dabb9] text-sm font-normal leading-normal">
          <span className="text-white">Content: </span> {content}
        </p>
      </div>
      <div className="shrink-0">
        <button className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#283139] text-white text-sm font-medium leading-normal w-fit ${getRiskClass(risk)}`}>

          <span className="truncate">{risk}</span>
        </button>
      </div>
    </div>
  );
};

export default DarkWebAndSocialMediaMentionsCard;
