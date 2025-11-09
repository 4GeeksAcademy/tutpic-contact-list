import useGlobalReducer from "../hooks/useGlobalReducer"

const UserSelect = () => {

    const { store, dispatch } = useGlobalReducer()

    //FUNCION HANDLER PARA SELECCIONAR USUARIO (CURRENT USER)

    const userHandler = (id, slug) => {
        dispatch({
            type: "set-current-user",
            payload: {
                slug: slug,
                id: id
            }
        })
    }

    return (
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                {store.currentUser.slug ? store.currentUser.slug : "Seleccionar usuario"}
            </button>
            <ul className="dropdown-menu" style={{cursor:"pointer"}}>
                {store.userList && store.userList.map((ele) => {
                    return (<li key={ele.id} className="dropdown-item" onClick={() => userHandler(ele.id, ele.slug)}>
                        {ele.slug}
                    </li>)
                })}
            </ul>
        </div>
    )
}

export default UserSelect