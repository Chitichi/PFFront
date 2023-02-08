import OrderDetail from "@/components/OrderDetail"

async function fetchOrder(id) {
    const response = await fetch(process.env.RUTA_BACK + `/orders/${id}`)
    const data = await response.json()
    return data
}

async function fetchUser(id) {
    const response = await fetch(process.env.RUTA_BACK + `/users/${id}`)
    const data = await response.json()
    return data
}

async function Detail({params}) {
    const orderID = params.detail
    const order = await fetchOrder(orderID)
    const user = await fetchUser(order.userId)
    return (
        <>
        {/* <MiPerfil user={user}/> */}
        <OrderDetail order={order} user={user}/>
        </>
    )
}


export default Detail;