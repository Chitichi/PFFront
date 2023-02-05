import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function LineGraph() {
    const genders = ['Fantasy', 'Sci-Fiction', 'Horror']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const optionsLine = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'sell for time',
            },
        },
    };
    const dataLine = {
        labels: months,
        datasets: [
            {
                label: 'Dataset 1',
                data: months.map(() => Math.random() * 10 + 1),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: months.map(() => Math.random() * 10 + 1),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return (
        <>
            <div>
                <h5>Grafico de tipo linea</h5>
                <Line options={optionsLine} data={dataLine} />
            </div>
        </>
    )
}