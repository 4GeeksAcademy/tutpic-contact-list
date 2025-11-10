import React from "react";
import "./User.css"
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal"

// User RECIVE PROPIEDAD "data" DE "Contact" PARA MOSTRAR INFORMACION DEL CONTACTO

const User = ({ data = {
    name: "",
    address: "",
    phone: "",
    email: "",
    id: ""
} }) => {

    const { store, dispatch } = useGlobalReducer()

    const navigate = useNavigate()

    console.log(data)

    // FUNCION QUE BORRA CONTACTO, ACTIVADA CON BOTON BASURA


    return (
        <div id="all" className="border border-top border-tertiary">
            <Modal data={data}/>
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
                <button className="icon btn" onClick={()=>navigate(`/edit/${store.currentUser.slug}/${data.id}`)}><i className="fa-solid fa-pencil "></i></button>
                <button className="icon btn" data-bs-toggle="modal" data-bs-target={`#borrarContacto${data.id}`}><i className="fa-solid fa-trash "></i></button>
            </div>
        </div>
    )
}

export default User