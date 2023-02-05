import React, { useEffect } from 'react';
import DonutsGraph from './DonutsGraph';
import BarGraphics from './BarGraphics';
import LineGraph from './LineGraph';

export const genre = ['fantasy', 'sci-fiction', 'horror']

export function selectColors(row) {
    const matrix = row.map(() => {
        const color = [0, 0, 0].map(() => {
            return Math.floor(Math.random() * 255) + 1
        })
        return color
    })
    const listColors = matrix.map(color => {
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
        case "books": {
            let listSells = genre.map(() => 0)
            let listStock = genre.map(() => 0)
            for (const book of list) {
                const index = genre.indexOf(book.genre[0].toLowerCase())
                listSells[index] = index >= 0 ? listSells[index] + book.sells : listSells[index] + 0
                listStock[index] = index >= 0 ? listStock[index] + book.stock : listStock[index] + 0
            }
            return [listSells, listStock]
        }
    }
}

export default function GraphicsDesk({ listOrders, listUsers, listBooks }) {

    const [dataSold, setDataSold] = React.useState(listBooks)

    const listGenre = sortData("genre", dataSold)
    const listBooksSell = sortData("books", dataSold)

    return (
        <>
            <div className="container">
                {/* <h3>Contenedor de graficos</h3> */}
                <div className='row'>
                    <div className='col-6'>
                        <DonutsGraph listData={listGenre} />
                    </div>
                    <div className='col-6'>
                        <BarGraphics listBooks={listBooksSell} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-8 justify-content-center align-items-center'>
                        <LineGraph />
                    </div>
                </div>

            </div>
        </>
    )
}