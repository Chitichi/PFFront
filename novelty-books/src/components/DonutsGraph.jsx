import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {genre, selectColors} from "./GraphicsDesk"

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutsGraph({listData, handleData}) {

    const [color, border] = selectColors(genre)

    const dataDoughnut = {
        labels: genre,
        datasets: [
            {
                label: '# of Sales',
                data: listData,
                backgroundColor: color,
                borderColor: border,
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <div>
                <h5>Grafico de tipo dona</h5>
                <select onChange={(e) => {handleData(e)}}>
                    <option value={"genre"}>Genres</option>
                    <option value={"book"}>Books</option>
                </select>
                <Doughnut data={dataDoughnut} />
            </div>
        </>
    )
} 