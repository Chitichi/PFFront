import MiPerfil from "@/components/MiPerfil";

async function fetchUser(id) {
    const response = await fetch(process.env.RUTA_BACK + `/users/${id}`)
    const data = await response.json()
    return data
}

async function Detail({params}) {
    const userID = params.detail
    const user = await fetchUser(userID)
    return (
        <>
        <MiPerfil user={user}/>
        </>
    )
}


export default Detail;