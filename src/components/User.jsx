import React from "react";
import "./User.css"
import useGlobalReducer from "../hooks/useGlobalReducer";

// User RECIVE PROPIEDAD "data" DE "Contact" PARA MOSTRAR INFORMACION DEL CONTACTO

const User = ({ data = {
    name: "",
    address: "",
    phone: "",
    email: "",
    id: ""
} }) => {

    const { store, dispatch } = useGlobalReducer()

    // FUNCION QUE BORRA CONTACTO, ACTIVADA CON BOTON BASURA

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
        <div id="all" className="border border-top border-tertiary">
            <div className="modal fade" id="borrarContacto" tabIndex="-1" aria-labelledby="label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="label">Borrar Contacto</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cancelar"></button>
                        </div>
                        <div className="modal-body">
                            <p>Si borra este contacto, no podrá recuperar sus datos.</p>
                            <p>¿Está seguro que quiere continuar?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={borrarContact}>Borrar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="info">
                <img id="pfp" src="https://thumbs.dreamstime.com/b/my-cat-her-silly-face-i-know-cringe-cute-m-sorry-311851899.jpg" alt="PFP" />
                <div id="text-info">
                    <h3>{data.name}</h3>
                    <h4><i className="fa-solid fa-location-dot m-1"></i>{data.address}</h4>
                    <h4><i className="fa-solid fa-phone m-1"></i>{data.phone}</h4>
                    <h4><i className="fa-solid fa-envelope m-1"></i>{data.email}</h4>
                </div>
            </div>
            <div id="icons">
                <button className="icon btn"><i className="fa-solid fa-pencil "></i></button>
                <button className="icon btn" data-bs-toggle="modal" data-bs-target="#borrarContacto"><i className="fa-solid fa-trash "></i></button>
            </div>
        </div>
    )
}

export default User