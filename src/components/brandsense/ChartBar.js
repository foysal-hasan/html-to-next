'use client';

import { useAppSelector } from '@/lib/hooks';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function ChartBar() {
  const [client, setClient] = useState(false);
  const riskAnalysis = useAppSelector((state) => state.posts.riskAnalysis) || {
    low: 0,
    medium: 0,
    high: 0,
  };
  const languageAnalysis = useAppSelector(
    (state) => state.posts.languageAnalysis,
  ) || {
    english: 0,
    russian: 0,
    arabic: 0,
    others: 0,
  };

  const riskData = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk'],
    datasets: [
      {
        label: 'Risk Analysis',
        data: [riskAnalysis.low, riskAnalysis.medium, riskAnalysis.high],
        backgroundColor: ['#40c754', '#ffa93e', '#c13434'],
      },
    ],
  };

  const languageData = {
    labels: ['English', 'Russian', 'Arabic', 'Others'],
    datasets: [
      {
        label: 'Language Analysis',
        data: [
          languageAnalysis.english,
          languageAnalysis.russian,
          languageAnalysis.arabic,
          languageAnalysis.others,
        ],
        backgroundColor: ['#4287f5', '#8b5cf6', '#06b6d4', '#f542f2'],
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: 'x',
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'white',
          boxWidth: 0,
          boxHeight: 0,
          font: {
            size: 20,
          },
        },
      },
    },
  };

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return null;

  if (
    riskAnalysis.low <= 0 &&
    riskAnalysis.medium <= 0 &&
    riskAnalysis.high <= 0 &&
    languageAnalysis.english <= 0 &&
    languageAnalysis.russian <= 0 &&
    languageAnalysis.arabic <= 0 &&
    languageAnalysis.others <= 0
  )
    return null;

  return (
    <div className="flex flex-col md:flex-row items-center bg-gray-800 rounded-lg p-5 xl:p-10 gap-8">
      <div className="w-64 h-64 xl:w-96 xl:h-96 flex items-center justify-center">
        <Bar data={riskData} options={options} className="flex" />
      </div>
      <div className="w-64 h-64 xl:w-96 xl:h-96 flex items-center justify-center">
        <Bar data={languageData} options={options} className="flex" />
      </div>
    </div>
  );
}
