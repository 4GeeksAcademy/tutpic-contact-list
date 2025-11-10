import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"

const EditContact = () => {

    const {store,dispatch} = useGlobalReducer()
    const navigate = useNavigate()
    const {name,id} = useParams() 

    const [data,setData] = useState(store.contactList.find(ele=>ele.id == id))
    const [ogData, setOgData] = useState(data)

    const submitHandler = (e) => {
        e.preventDefault()
        editar()
    }

    const editar = async () => {
        try {
            if(data == ogData){
                alert("No se ha realizado ningun cambio")
                return
            }
            let response = await fetch(`https://playground.4geeks.com/contact/agendas/${name}/contacts/${id}`,{
                method:"PUT",
                body:JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            })
            if(!response.ok){
                throw new Error("editar no ok")
            }
            let result = await response.json()
            navigate("/")
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div className="d-flex justify-content-center flex-column m-5">
            <h1>Ingrese informacion de contacto</h1>
            <form onSubmit={submitHandler} className="d-flex flex-column border border-secondary p-2">
                <label htmlFor="nameI" className="form-label">Ingrese nombre</label>
                <input type="text" value={data.name} className="form-control" id="nameI" aria-describedby="require" onChange={(e) => setData(prev => {
                    return { ...prev, name: e.target.value }
                })} />
                <p id="require" className="form-text">*Obligatorio</p>

                <label htmlFor="phoneI" className="form-label">Ingrese número telefónico</label>
                <input type="text" value={data.phone} id="phoneI" className="form-control" onChange={(e) => setData(prev => {
                    return { ...prev, phone: e.target.value }
                })} />

                <label htmlFor="emailI" className="form-label">Ingrese email</label>
                <input type="text" value={data.email} id="emailI" className="form-control" onChange={(e) => setData(prev => {
                    return { ...prev, email: e.target.value }
                })} />

                <label htmlFor="addressI" className="form-label">Ingrese dirección</label>
                <input type="text" value={data.address} id="emailI" className="form-control" onChange={(e) => setData(prev => {
                    return { ...prev, address: e.target.value }
                })} />
                <button type="submit" className="btn btn-success my-2" style={{maxWidth:"max-content"}}>Guardar Cambios</button>
            </form>
            <button className="btn btn-danger my-2" onClick={()=>navigate(-1)} style={{maxWidth:"max-content"}}>Cancelar</button>
        </div>
    )
}

export default EditContact