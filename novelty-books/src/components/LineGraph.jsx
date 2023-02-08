import React from 'react';
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, Title, PointElement, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function LineGraph({listSells}) {
    const dates = listSells[0]
    const totalSell = listSells[1]
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
        labels: dates,
        datasets: [
            {
                label: 'dates/Sells',
                data: totalSell,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            // {
            //     label: 'Dataset 2',
            //     data: months.map(() => Math.random() * 10 + 1),
            //     borderColor: 'rgb(53, 162, 235)',
            //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
            // },
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