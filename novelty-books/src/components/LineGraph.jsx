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

export default function LineGraph({listSells, handleData}) {
    // console.log(listSells)
    const dates = listSells.data[0]
    const totalSell = listSells.data[1]
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
                label: `dates/${listSells.type.split("-")[1]}`,
                data: totalSell,
                borderColor: listSells.colors[0],
                backgroundColor: listSells.colors[1],
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
                <select onChange={(e) => {handleData(e)}}>
                    <option value={"line-sell"}>Sells</option>
                    <option value={"line-user"}>Users</option>
                </select>
                <Line options={optionsLine} data={dataLine} />
            </div>
        </>
    )
}