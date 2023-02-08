import React from 'react';
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { genre, selectColors } from "./GraphicsDesk"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarGraphics({ listBooks }) {

    const colors = selectColors(["sell", "stock"])

    const optionsBar = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Books Sell-Stock',
            },
        },
    };

    const dataBar = {
        labels: genre,
        datasets: [
            {
                label: 'sell',
                data: listBooks[0],
                backgroundColor: colors[0]
            },
            {
                label: 'stock',
                data: listBooks[1],
                backgroundColor: colors[1]
            },
        ],
    };

    return (
        <>
            <div>
                <h5>Grafico de tipo barra</h5>
                <Bar options={optionsBar} data={dataBar} />
            </div>
        </>
    )
}