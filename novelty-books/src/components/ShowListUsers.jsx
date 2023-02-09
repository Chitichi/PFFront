
function ShowListUsers({ listUsers, selectUser, goDetailUser, current}) {

    return (
        <>
            <div className="container px-4 px-lg-5 my-5">
                <div >
                    <table className="table table-striped table-hover table-bordered" >

                        <thead className="table-dark" style={{"position":"sticky", "top":"0"}}>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers.map((user, index) => (
                                <tr key={index} id={index + 1} scope="row" className={""}
                                    onClick={(e) => { selectUser(index + 1, user) }}
                                    onDoubleClick={() => { goDetailUser(user._id) }}>
                                    
                                    <th scope="row">{current + index + 1}</th>

                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{`${user.rolAdmin}`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ShowListUsers