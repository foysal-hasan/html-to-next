import ApiNotWorking from "../ApiNotWorking";
import SectionTitle from "./SectionTitle";

const getStatusStyles = (status) => {
  switch (status) {
    case "safe":
      return {
        backgroundColor: "#4caf50", // Green
        text: "Safe domain",
      };
    case "low":
      return {
        backgroundColor: "#8bc34a", // Light Green
        text: "Low fraud risk",
      };
    case "moderate":
      return {
        backgroundColor: "#ff9800", // Orange
        text: "Moderate fraud risk",
      };
    case "dangerous":
      return {
        backgroundColor: "#f44336", // Red
        text: "High fraud risk",
      };
    case "critical":
      return {
        backgroundColor: "#b71c1c", // Dark Red
        text: "Critical fraud risk",
      };
    default:
      return {
        backgroundColor: "#41474e", // Default grey
        text: "Risk not found",
      };
  }
};

function FraudScore({ domainScore, error }) {
  // console.log(domainScore);

  const { backgroundColor } = getStatusStyles(domainScore?.score);

  return (
    <>
      <SectionTitle>Domain Score</SectionTitle>
      {error ? (
        <ApiNotWorking />
      ) : (
        <div className="flex flex-col gap-3 p-4">
          <div className="flex gap-6 justify-between">
            <p className="text-white text-base font-medium leading-normal">
              {domainScore?.score_percentage}
            </p>
          </div>
          <div className="rounded bg-[#41474e]">
            <div
              className="h-2 rounded bg-white"
              style={{
                width: `${domainScore?.score_percentage}%`,
                backgroundColor,
              }}
            ></div>
          </div>
          <p className="text-[#a3abb2] capitalize text-sm font-normal leading-normal">
            {domainScore?.score}
          </p>
        </div>
      )}
    </>
  );
}

export default FraudScore;
