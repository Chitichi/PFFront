import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarGraph() {

    const genders = ['Fantasy', 'Sci-Fiction', 'Horror']

    const optionsBar = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Books Sell',
            },
        },
    };

    const dataBar = {
        labels: ["Fantasy", "Sci-Fiction", "Horror"],
        datasets: [
            {
                label: 'Dataset 1',
                data: genders.map(() => Math.random() * 10 + 1),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: genders.map(() => Math.random() * 10 + 1),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <>
            <figure>
                <h5>Grafico de barra</h5>
                <Bar options={optionsBar} data={dataBar} />
            </figure>
        </>
    )
}