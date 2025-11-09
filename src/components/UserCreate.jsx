import React from "react"
import { useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"

const UserCreate = () => {

    const { dispatch } = useGlobalReducer()

    const [newUser, setNewUser] = useState("")

    const formHandler = (e) => {
        e.preventDefault()
        submit()
    }

    const submit = async () => {
        if (!newUser) {
            alert("Inserte nombre de usuario válido")
            return
        }
        try {
            let response = await fetch(`https://playground.4geeks.com/contact/agendas/${newUser}`,{
                method:"POST"
            })
            if (!response.ok) {
                alert("No se pudo crear usuario")
                throw new Error("no ok newUser")
            }
            let data = await response.json()
            dispatch({
                type: "new-user",
                payload: data
            })
            dispatch({
                type:"set-current-user",
                payload: data
            })
            setNewUser("")
            alert("Usuario creado con éxito")
        } catch (error) {
            alert("No se pudo crear usuario")
            console.log(error)
        }
    }

    return (
        <div >
            <form onSubmit={formHandler} className="d-flex flex-column align-items-center" style={{ width: "fit-content" }}>
                <label htmlFor="userName">Crear nuevo Usuario</label>
                <div className="d-flex flex-row m-1">
                    <input id="userName" className="mx-1 form-control" value={newUser} placeholder="Ingrese nombre de usuario" onChange={(e) => setNewUser(e.target.value)} type="text" />
                    <button type="submit" onSubmit={formHandler} className="btn btn-primary mx-1">Crear</button>
                </div>
            </form>
        </div>
    )
}

export default UserCreate