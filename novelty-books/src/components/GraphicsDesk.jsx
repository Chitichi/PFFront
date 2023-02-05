import React, { useEffect } from 'react';
import DonutsGraph from './DonutsGraph';
import BarGraph from './barGraph';
import LineGraph from './LineGraph';

export const genre = ['fantasy', 'sci-fiction', 'horror']

export function selectColors() {
    const matrix3x3 = genre.map(() => {
        const color = [0, 0, 0].map(() => {
            return Math.floor(Math.random() * 255) + 1
        })
        return color
    })
    const listColors = matrix3x3.map(color => {
        return "rgba(" + color.join(", ") + ", 0.2)"
    })
    const listBorderColors = listColors.map(color => {
        return color.replace("0.2", "1")
    })
    return [listColors, listBorderColors]
}

function sortData(type, list) {
    switch (type) {
        case "genre": {
            let newList = genre.map(() => 0)
            for (const book of list) {
                const index = genre.indexOf(book.genre[0].toLowerCase())
                newList[index] = index >= 0 ? newList[index] + book.sells : newList[index] + 0
            }
            return newList
        }
    }
}

export default function GraphicsDesk({ listOrders, listUsers, listBooks }) {

    const [dataSold, setDataSold] = React.useState(listBooks)

    const listData = sortData("genre", dataSold)
    return (
        <>
            <div className="container">
                {/* <h3>Contenedor de graficos</h3> */}
                <div className='row'>
                    <div className='col-6'>
                        <DonutsGraph listData={listData} />
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