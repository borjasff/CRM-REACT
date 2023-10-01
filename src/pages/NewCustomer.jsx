import { useNavigate, Form as FormCRM, useActionData, redirect } from "react-router-dom"
import Form from "../components/Form"
import Fail from "../components/Fail"
import { addCustomer } from "../data/customers"

export async function action({request}){

    const formData = await request.formData()

    const dataAction = Object.fromEntries(formData)

    const email = formData.get('email')

    //validation
    const fails = []
    if(Object.values(dataAction).includes('')){
        fails.push('Todos los campos son obligatorios')
    }
    //validate email format
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(email)){
        fails.push('El Email no es válido')
    }

    //return data and fails
    if(Object.keys(fails).length){
        return fails
    }
    await addCustomer(dataAction)
    return redirect('/');

}

function NewCustomer() {

    const fails = useActionData()
    const navigate = useNavigate()
  return (

    <>
        <div className="font-black text-4xl text-blue-900">Nuevo Cliente</div>
        <p className="mt-3">Rellena todos los campos para crear un nuevo cliente</p>

        <div className="flex justify-end">
            <button 
                onClick={() => navigate(-1)} 
                className="bg-blue-800 text-white px-3 py-1 font-bold uppercase">
            Volver</button>
        </div>
        <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">

            {fails?.length && fails.map( (fail, i) => <Fail key={i}>{fail}</Fail>)}

            <FormCRM
            method="POST"
            noValidate
            >
                <Form />

                <input  type="submit" 
                        value="Registrar Cliente" 
                        className="mt-5 w-full bg-blue-800 uppercase font-bold text-white  text-lg" />
            </FormCRM>
        </div>
    </>
  )
}

export default NewCustomer