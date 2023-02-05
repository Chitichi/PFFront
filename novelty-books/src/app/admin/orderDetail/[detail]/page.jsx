import OrderDetail from "@/components/OrderDetail"

async function fetchOrder(id) {
    const response = await fetch(process.env.RUTA_BACK + `/orders/${id}`)
    const data = await response.json()
    return data
}

async function Detail({params}) {
    const orderID = params.detail
    const order = await fetchOrder(orderID)
    return (
        <>
        {/* <MiPerfil user={user}/> */}
        <OrderDetail order={order}/>
        </>
    )
}


export default Detail;