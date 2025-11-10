import useGlobalReducer from "../hooks/useGlobalReducer"


const Modal = ({data}) => {

    const {store,dispatch} = useGlobalReducer()

    const borrarContact = async () => {
        try {
            if (!data.id) {
                return
            }
            let response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.currentUser.slug}/contacts/${data.id}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                alert("No se pudo borrar contacto")
                throw new Error("borrarTarea NO OK")
            }
            dispatch({
                type: "delete-contact",
                payload: data.id
            })
        } catch (error) {
            alert("No se pudo borrar contacto")
            console.log(error)
        }
    }

    return (
        <div className="modal fade" id={`borrarContacto${data.id}`} tabIndex="-1" aria-labelledby="label" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="label">Borrar Contacto</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cancelar"></button>
                    </div>
                    <div className="modal-body">
                        <p>Si borra este contacto ({data.name}), no podrá recuperar sus datos.</p>
                        <p>¿Está seguro que quiere continuar?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={borrarContact}>Borrar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal