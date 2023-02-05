import React from 'react';
import DoughnutGraph from './Doughnutgraph';
import BarGraph from './barGraph';
import LineGraph from './LineGraph';

export default function GraphicsDesk({ listOrders, listUsers, listBooks }) {

    return (
        <>
            <div>
                <h3>Contenedor de graficos</h3>
                <DoughnutGraph></DoughnutGraph>
                <BarGraph></BarGraph>
                <LineGraph></LineGraph>
            </div>
        </>
    )
}