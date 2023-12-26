import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

ChartJS //Used to register chartjs class

const BarChart = () => {
    const [userData, setUserData] = useState({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
            label: 'Cargo',
            data: [25, 14, 566, 3, 123, 34, 12, 345, 21, 78, 123, 321],
            backgroundColor: '#213287',
        },
        {
            label: 'Another Cargo',
            data: [253, 14, 566, 43, 123, 134, 132, 345, 311, 78, 123, 321],
        }
      ],
    });
  
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
          <Bar data={userData} options={opt} />
        </div>
      </>
    );
}