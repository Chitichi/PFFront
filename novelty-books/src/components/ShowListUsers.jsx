function ShowListUsers({ listUsers, selectUser, goDetailUser }) {
    return (
        <>
            <div className="container px-4 px-lg-5 my-5">
                <table className="table table-striped table-hover table-bordered ">
                
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">id</th>
                            <th scope="col">nombre</th>
                            <th scope="col">correo</th>
                            <th scope="col">admin</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {listUsers.map((user, index) => (
                            <tr key={index} id={index+1} scope="row" className={""}
                            onClick={(e) => { selectUser(index+1, user) }}
                            onDoubleClick={() => {goDetailUser(user._id)}}>
                                <th scope="row">{index + 1}</th>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{`${user.rolAdmin}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ShowListUsers