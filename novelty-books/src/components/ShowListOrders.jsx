import styles from './ShowListOrders.module.css'

function ShowListOrders({ listOrders, selectOrder, goDetailOrder }) {
    return (
        <>
            <div className="container px-4 px-lg-5 my-5">
                <table className="table table-striped table-hover table-bordered ">

                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">id</th>
                            <th scope="col">userID</th>
                            <th scope="col">books</th>
                            <th scope="col">total</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {listOrders.map((order, index) => (
                            <tr key={index} id={index + 1} scope="row" className={""}
                            onClick={(e) => { selectOrder(index + 1, order) }}
                            onDoubleClick={() => { goDetailOrder(order._id) }}>
                                <th scope="row">{index + 1}</th>
                                <td>{order._id}</td>
                                <td>{order.userId}</td>
                                <td>
                                    <ul className={`${styles["nested-dropdowns"]}`}>
                                        <li>

                                            <div>Books <i className="bi bi-caret-down-square-fill"></i></div>
                                            <ul className='bg-secondary'>
                                                {order.booksBought.map((book, i) => <li key={i} className="text-light">{book.title} x {book.quantity}</li>)}
                                            </ul>
                                        </li>
                                    </ul>
                                </td>
                                <td>{`${order.total}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ShowListOrders