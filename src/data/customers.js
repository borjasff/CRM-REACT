
export async function getCustomers(){

    const answer = await fetch(import.meta.env.VITE_API_URL)

    const result = await answer.json()
    //console.log(result)
    return  result
}

export async function getCustomer(id){

    const answer = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)

    const result = await answer.json()
    //console.log(result)
    return  result
}

export async function addCustomer(data) {
    try {
        const answer = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        })
        await answer.json()
    } catch (error) {
        console.log(error)
    }
}

export async function updateCustomer(id, data){
    try {
        const answer = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        })
        await answer.json()
    } catch (error) {
        console.log(error)
    }
}

export async function deleteCustomer(id){
    try {
        const answer = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE',
        })
        await answer.json()
    } catch (error) {
        console.log(error)
    }
}