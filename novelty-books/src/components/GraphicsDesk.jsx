import React, { useEffect } from 'react';
import DonutsGraph from './DonutsGraph';
import BarGraphics from './BarGraphics';
import LineGraph from './LineGraph';
import OrderDetail from './OrderDetail';

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
        case "dona": {
            let newList = genre.map(() => 0)
            for (const book of list) {
                const index = genre.indexOf(book.genre[0].toLowerCase())
                newList[index] = index >= 0 ? newList[index] + book.sells : newList[index] + 0
            }
            return newList
        }
        case "barra": {
            let listSells = genre.map(() => 0)
            let listStock = genre.map(() => 0)
            for (const book of list) {
                const index = genre.indexOf(book.genre[0].toLowerCase())
                listSells[index] = index >= 0 ? listSells[index] + book.sells : listSells[index] + 0
                listStock[index] = index >= 0 ? listStock[index] + book.stock : listStock[index] + 0
            }
            return [listSells, listStock]
        }
        case "line": {
            let dateSellObject = {}
            const newList = []
            list.sort((a, b) => a.date <= b.date ? -1 : 1)
            list.forEach(order => order.total && order.total < 200 ? newList.push(order) : null)

            for (const order of newList) {
                const dateOrder = order.date.slice(0, 10)

                if (dateSellObject.hasOwnProperty(dateOrder)) {
                    dateSellObject[dateOrder] = dateSellObject[dateOrder] + order.total
                } else {
                    dateSellObject[dateOrder] = order.total
                }

            }
            return [Object.keys(dateSellObject), Object.values(dateSellObject)]
            
        }
    }
}

export default function GraphicsDesk({ listOrders, listUsers, listBooks }) {

    const [dataSold, setDataSold] = React.useState(listBooks)
    // const [donuts, setDonuts] = React.useState({})
    const donuts = sortData("dona", dataSold)
    const bar = sortData("barra", dataSold)
    const line = sortData("line", listOrders)

    function handleData(event) {
        console.log(event.target.value)
    }

    return (
        <>
            <div className="container">
                {/* <h3>Contenedor de graficos</h3> */}
                <div className='row'>
                    <div className='col-6'>
                        <DonutsGraph listData={donuts} handleData={handleData}/>
                    </div>
                    <div className='col-6'>
                        <BarGraphics listBooks={bar} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-8 justify-content-center align-items-center'>
                        <LineGraph listSells={line} />
                    </div>
                </div>

            </div>
        </>
    )
}