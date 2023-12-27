import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({data}) => {
    const opt = {
        scales: {
            x: {
            grid: {
                display: false,
            },
            border: {
                display: false,
            },
            },
            y: {
            grid: {
                display: false,
            },
            border: {
                display: false,
            },
            },
        },
        plugins: {
            legend: {
            display: true,
            },
        },
    };
  
    return (
      <>
        <div>
          <Bar style={{height: '300px'}} data={data} options={opt} />
        </div>
      </>
    );
}

export default BarChart;