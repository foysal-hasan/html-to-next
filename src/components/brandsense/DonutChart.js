'use client';

import { useAppSelector } from '@/lib/hooks';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['LOW', 'MEDIUM', 'HIGH'],
  datasets: [
    {
      data: [6.6, 1, 5],
      backgroundColor: ['#32CD32', '#FF8C00', '#FF0000'],
      hoverOffset: 4,
    },
  ],
};

export default function ReputationDonutChart() {
  const [client, setClient] = useState(false);
  const riskAnalysis = useAppSelector(state => state.posts.riskAnalysis)

  const data = {
    labels: ['LOW', 'MEDIUM', 'HIGH'],
    datasets: [
      {
        data: [riskAnalysis.low, riskAnalysis.medium, riskAnalysis.high],
        backgroundColor: ['#32CD32', '#FF8C00', '#FF0000'],
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return null;

  if (riskAnalysis.low <= 0 && riskAnalysis.medium <= 0 && riskAnalysis.high <= 0) return null;

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
          margin: '30px', // Adds spacing between legend items
          padding: 20, // Adds spacing between legend items
          boxWidth: 40, // Ensures better spacing and alignment
        },
      },
    },
  };
  return (
    <div className="flex flex-col items-center">
      {/* <h2 className="text-xl font-semibold mb-4">Reputation by Category</h2> */}
      <div className="w-96 h-96">
        <Doughnut data={data} options={options} className="flex" />
      </div>
    </div>
  );
}
