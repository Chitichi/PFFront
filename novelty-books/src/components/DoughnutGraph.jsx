import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutGraph() {
    const dataDoughnut = {
        labels: ['Fantasy', 'Sci-Fiction', 'Horror'],
        datasets: [
            {
                label: '# of Sell',
                data: [12, 19, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <figure>
                <h5>Grafico de dona</h5>
                <Doughnut data={dataDoughnut} />
            </figure>
        </>
    )
} 