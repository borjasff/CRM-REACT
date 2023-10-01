import { Form as FormCRM, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom"
import { getCustomer, updateCustomer } from "../data/customers"
import Form from "../components/Form"
import Fail from "../components/Fail"

export async function loader({params}) {
    const customer = await getCustomer(params.customerId)
    //if dont get customer throw new Response stop the code
    if(Object.values(customer).length === 0){
        throw new Response('', {
            status: 404,
            statusText: 'No hay Resultados'
        })
    }
    return customer
}
export async function action({request, params}){
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
    //update customer
    await updateCustomer(params.customerId, dataAction)
    return redirect('/');
}

function EditCustomer() {
    const navigate = useNavigate();
    const customer = useLoaderData();
    const fails = useActionData();
    //console.log(customer)
  return (
    <>
    <div className="font-black text-4xl text-blue-900">Editar Cliente</div>
    <p className="mt-3">Puedes modificar los datos de un cliente</p>

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
            <Form
            customer={customer} />

            <input  type="submit" 
                    value="Actualizar Cliente" 
                    className="mt-5 w-full bg-blue-800 uppercase font-bold text-white  text-lg" />
        </FormCRM>
    </div>
</>
  )
}

export default EditCustomer