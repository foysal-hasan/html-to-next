'use client';

import { useAppSelector } from '@/lib/hooks';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// const data = {
//   labels: ['LOW', 'MEDIUM', 'HIGH'],
//   datasets: [
//     {
//       data: [6.6, 1, 5],
//       backgroundColor: ['#32CD32', '#FF8C00', '#FF0000'],
//       hoverOffset: 4,
//     },
//   ],
// };

export default function DonutChart() {
  const [client, setClient] = useState(false);
  const riskAnalysis = useAppSelector((state) => state.posts.riskAnalysis);

  const data = {
    labels: ['LOW', 'MEDIUM', 'HIGH'],
    datasets: [
      {
        data: [riskAnalysis.low, riskAnalysis.medium, riskAnalysis.high],
        backgroundColor: ['#40c754', '#ffa93e', '#c13434'],
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return null;

  if (
    riskAnalysis.low <= 0 &&
    riskAnalysis.medium <= 0 &&
    riskAnalysis.high <= 0
  )
    return null;

  const options = {
    layout: {
      padding: {
        bottom: 20, // Adds spacing between chart and legend
      },
    },
    plugins: {
      legend: {
        position: 'bottom', // Moves the labels to the bottom
        labels: {
          color: 'white', // Sets legend text color to white
          margin: '30px', // Adds spacing between legend items
          padding: 20, // Adds spacing between legend items
          boxWidth: 40, // Ensures better spacing and alignment
        },
      },
    },
  };
  return (
    <div className="flex flex-1 flex-col w-full items-center bg-gray-800 rounded-lg p-5 xl:p-10 h-[435px]">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Risk Analysis Distribution
      </h2>
      {/* <div className="w-64 h-64 xl:w-80 xl:h-80 lg:w-96 lg:h-96"> */}
      <div className="flex-1">
        <Doughnut data={data} options={options} className="flex" />
      </div>
    </div>
  );
}
