export default function GraphicsDesk({ listOrders, listUsers, listBooks }) {
    // console.log("lista de ordenes: ",listOrders)
    // console.log("lista de usuarios",listUsers)
    // console.log("lista de libros", listBooks)
    // listUsers.lenght? console.log("Usurios -------------------:", listUsers):console.log("no llegaron Usuarios")
    // listBooks.lenght? console.log("Libros --------------------:", listBooks):console.log("no llegaron Libros")
    return (
        <>
            <div>
                <section>
                    <h3>Contenedor de graficos</h3>
                    <figure>
                        <h5>Grafico de dona</h5>
                        <canvas id="cakeGraph"></canvas>
                    </figure>
                    <figure>
                        <h5>Grafico de barra</h5>
                        <canvas id="barGraph"></canvas>
                    </figure>
                    <figure>
                        <h5>Grafico de linea</h5>
                        <canvas id="lineGraph"></canvas>
                    </figure>
                </section>
            </div>
        </>
    )
}