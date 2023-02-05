import React, { useEffect } from 'react';
import DoughnutGraph from './Doughnutgraph';
import BarGraph from './barGraph';
import LineGraph from './LineGraph';

const genre = ['fantasy', 'sci-fiction', 'horror']

function sortData(type , list) {
    switch (type) {
        case "genre": {
            let newList = genre.map(() => 0)
            for (const book of list) {
                const index = genre.indexOf(book.genre[0].toLowerCase())
                newList[index] = index >= 0? newList[index]+book.sells: newList[index]+0
            }
            return newList
        }
    }
}

export default function GraphicsDesk({ listOrders, listUsers, listBooks }) {

    const [dataSold, setDataSold] = React.useState(listBooks)

    const listData = sortData("genre", dataSold)
    console.log(listData)

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