import React from "react";
import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import User from "../components/User";
import UserSelect from "../components/UserSelect";
import UserCreate from "../components/UserCreate";
import "./Contact.css"

const Contact = () => {

    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()

    //FUNCION QUE NAVEGA A /ADD PARA CREAR NUEVO CONTACTO

    //FUNCION QUE BORRA EL USARIO SELECCIONADO (store.currentUser)

    const borrarUser = async () => {
        try {
            if (!store.currentUser.slug) {
                alert("Seleccione un usuario para borrar")
                return
            }
            let response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.currentUser.slug}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                alert("No se pudo borrar usuario")
                throw new Error("no ok borrarUser")
            }
            dispatch({
                type: "delete-user",
                payload: store.currentUser.id
            })
            dispatch({
                type: "set-current-user",
                payload: { slug: "", id: null }
            })
            dispatch({
                type:"set-contact-list",
                payload:[]
            })
        } catch (error) {
            alert("No se pudo borrar el usuario")
            console.log(error)
        }
    }

    //EFFECT QUE LLAMA USUARIOS

    useEffect(() => {

        const getUsers = async () => {
            try {
                let response = await fetch("https://playground.4geeks.com/contact/agendas")
                if (!response.ok) {
                    throw new Error("Error getUsers")
                }
                let data = await response.json()
                dispatch({
                    type: "set-user-list",
                    payload: data.agendas
                })
            } catch (error) {
                console.log(error)
            }

        }
        getUsers()
    }, [])

    // EFFECT QUE LLAMA LA LISTA DE CONTACTOS DEL USUARIO SELECCIONADO

    useEffect(() => {
        const getList = async () => {
            try {
                if (!store.currentUser.slug) {
                    return
                }
                let response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.currentUser.slug}`)
                if (!response.ok) {
                    throw new Error("getList no OK")
                }
                let data = await response.json()
                dispatch({
                    type: "set-contact-list",
                    payload: data.contacts
                })
                console.log(store.contactList)
            } catch (error) {
                console.log(error)
            }
        }
        getList()
    }, [store.currentUser])

    return (
        <div>
             <div className="modal fade" id="borrarUsuario" tabIndex="-1" aria-labelledby="label2" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="label2">Borrar Usuario</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cancelar"></button>
                        </div>
                        <div className="modal-body">
                            <p>Si borra este usuario ({store.currentUser.slug}), no podrá recuperar sus datos.</p>
                            <p>¿Está seguro que quiere continuar?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={borrarUser}>Borrar</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="text-center m-2">Contact List</h1>
            <div id="userManager">
                <div className="d-flex flex-row">
                    <UserSelect />
                    {store.currentUser.slug && <button className="btn btn-danger mx-1" data-bs-toggle="modal" data-bs-target="#borrarUsuario">Borrar usuario seleccionado</button>}
                </div>
                <UserCreate />
            </div>
            <div className="d-flex justify-content-center m-5">
                {!store.currentUser.slug && <h1>Por favor seleccione su usuario, o  cree uno nuevo</h1>}
                {store.contactList.length == 0 && store.currentUser.slug && <h1>Por favor, <a >añada nuevos contactos</a> </h1>}
            </div>
            {store.contactList.length > 0 && store.contactList.map((ele) => {
                return <User key={ele.id} data={ele} />
            })}
            <div className="d-flex justify-content-center m-2">
            {store.currentUser.slug && <button className="btn btn-success" onClick={()=>navigate("/add")}>Añadir nuevo contacto</button>}
            </div>
        </div>
    )
}

export default Contact