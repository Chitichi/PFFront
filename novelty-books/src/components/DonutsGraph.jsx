import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {genre, selectColors} from "./GraphicsDesk"

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutsGraph({listData, handleData}) {

    const dataDoughnut = {
        labels: listData.labels,
        datasets: [
            {
                label: '# of Sales',
                data: listData.data,
                backgroundColor: listData.colors[0],
                borderColor: listData.colors[1],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <div>
                <h5>Grafico de tipo dona</h5>
                <select onChange={(e) => {handleData(e)}}>
                    <option value={"dona-genre"}>Genres</option>
                    <option value={"dona-book"}>Books</option>
                </select>
                <Doughnut data={dataDoughnut} />
            </div>
        </>
    )
} 