import { useState } from "react"

const AddContact = () => {

    const [data, setData] = useState({
        name: "",
        address: "",
        phone: "",
        email: ""
    })

    const submitHandler = (e) => {
        e.preventDefault()
        crearContacto()
    }

    const crearContacto = async () =>{
        try {
            if(data.name==""){
                alert("Ingrese un nombre de contacto")
                return
            }
            let payload = {
                    name:data.name,
                    phone:data.phone,
                    email:data.email,
                    address:data.address
                }
            let response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.currentUser.slug}/contacts`,{
                method:"POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" }
            })
            if(!response.ok){
                throw new Error("crearContacto no ok")
            }
        } catch (error) {
            console.error(error)
        }
    }


    return (
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
                <button type="submit" className="btn btn-success">Agregar Contacto</button>
            </form>
        </div>
    )
}
export default AddContact