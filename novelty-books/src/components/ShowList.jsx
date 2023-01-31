function ShowList({listUsers}) {
    return (
        <>
            <table>
                <tr>
                    <th>id</th>
                    <th>nombre</th>
                    <th>correo</th>
                    <th>admin</th>
                </tr>
                {listUsers.map(user => (
                    <tr>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{`${user.rolAdmin}`}</td>
                    </tr>
                ))}
            </table>
        </>
    )
}

export default ShowList