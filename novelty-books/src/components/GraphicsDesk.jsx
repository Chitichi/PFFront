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
        case "dona-genre": {
            let newList = genre.map(() => 0)
            for (const book of list) {
                const index = genre.indexOf(book.genre[0].toLowerCase())
                newList[index] = index >= 0 ? newList[index] + book.sells : newList[index] + 0
            }
            return newList
        }
        case "dona-book": {
            return list.map(book => book.sells)
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
        case "line-sell": {
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
        case "line-user": {
            let dateUserObject = {}
            const newList = []
            list.sort((a, b) => a.date <= b.date ? -1 : 1)
            list.forEach(user => {console.log(user.date)})
            for (const user of list) {
                const dateOrder = user.date.slice(0, 10)

                if (dateUserObject.hasOwnProperty(dateOrder)) {
                    dateUserObject[dateOrder] ++
                } else {
                    dateUserObject[dateOrder] = 1
                }

            }
            return [Object.keys(dateUserObject), Object.values(dateUserObject)]
        }
    }
}

export default function GraphicsDesk({ listOrders, listUsers, listBooks }) {

    const [dataSold, setDataSold] = React.useState(listBooks)
    const [donut, setDonuts] = React.useState({
        type: "dona-genre",
        labels: genre,
        data: sortData("dona-genre", dataSold),
        colors: selectColors(genre)
    })
    const [line,setLine] = React.useState({
        type: "line-sell",
        data: sortData("line-sell", listOrders),
        colors: selectColors([1])  
    })

    const bar = sortData("barra", dataSold)

    function handleData(event) {
        const type = event.target.value
        if (type.includes("dona")) {
            setDonuts({
                type,
                labels: labels(type.split("-")[1]),
                data: sortData(type, listBooks),
                colors: selectColors(listBooks)
            })
        }
        if (type.includes("line")) {
            if (type.includes("sell")) {var list = listOrders}
            if (type.includes("user")) {var list = listUsers}
            setLine({
                type,
                data: sortData(type, list),
                colors: selectColors([1])
            })
        }
    }

    function labels(type) {
        switch (type) {
            case "genre": {
                return genre
            }
            case "book": {
                return listBooks.map(book => book.title)
            }
        }
    }

    return (
        <>
            <div className="container">
                <div className='row'>
                    <div className='col-6'>
                        <DonutsGraph listData={donut} handleData={handleData} />
                    </div>
                    <div className='col-6'>
                        <BarGraphics listBooks={bar} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-8 justify-content-center align-items-center'>
                        <LineGraph listSells={line} handleData={handleData}/>
                    </div>
                </div>

            </div>
        </>
    )
}