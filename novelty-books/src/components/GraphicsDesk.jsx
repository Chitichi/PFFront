import React from 'react';
import DoughnutGraph from './Doughnutgraph';
import BarGraph from './barGraph';
import LineGraph from './LineGraph';

export default function GraphicsDesk({ listOrders, listUsers, listBooks }) {

    return (
        <>
            <div className="container">
                {/* <h3>Contenedor de graficos</h3> */}
                <div className='row'>
                    <div className='col-6'>
                        <DoughnutGraph />
                    </div>
                    <div className='col-6'>
                        <BarGraph listBooks={listBooks} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-8 justify-content-center align-items-center'>
                        <LineGraph></LineGraph>
                    </div>
                </div>

            </div>
        </>
    )
}