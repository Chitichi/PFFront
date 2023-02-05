function OrderDetail(props) {
    return (
        <>
            <h1>Order: {props.order && props.order._id? props.order._id :null}</h1>
            <div>
                <section className="h-100">
                    <div className="container h-100 py-5">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-10">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                                </div>

                                {props.order && props.order.booksBought? props.order.booksBought.map((book, idx) => (
                                    <div key={idx} className="card rounded-3 mb-4">
                                        <div className="card-body p-4">
                                            <div className="row d-flex justify-content-between align-items-center">
                                                <div className="col-md-2 col-lg-2 col-xl-2">
                                                    <img
                                                        src={book.image?.secure_url}
                                                        className="img-fluid rounded-3"
                                                    />
                                                </div>
                                                <div className="col-md-3 col-lg-3 col-xl-3">
                                                    <p className="lead fw-normal mb-2">{book.title ? book.title : null}</p>
                                                </div>
                                                <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                    {/* <button
                                                        className="btn btn-link px-2"
                                                        onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                                                    >
                                                        <i className="fas fa-minus"></i>
                                                    </button> */}

                                                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                        <h5 className="mb-0">{book.quantity ? book.quantity : null}</h5>
                                                    </div>

                                                    {/* <button
                                                        className="btn btn-link px-2"
                                                        onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                                                    >
                                                        <i className="fas fa-plus"></i>
                                                    </button> */}
                                                </div>
                                                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                    <h5 className="mb-0">$ {book.price ? book.price : null}</h5>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )):null}

                                <div className="cart-bottom">
                                    <div className="total">
                                        <h3>Subtotal:</h3>
                                        <h3>${
                                        props.order && props.order.booksBought? props.order.booksBought.reduce((acc, cur) => {
                                            return acc + cur.price
                                        }, 0):null
                                        }</h3>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default OrderDetail