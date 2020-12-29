
const baseUrl = 'http://localhost:5000'

const signup = async(userId, firstName, lastName, email, phoneNumber, password) =>{
    const response = await fetch(`${baseUrl}/users`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, firstName, lastName, email, phoneNumber, password })
    })
    let returnResponse
    if (!response.ok){
        returnResponse = response.text()
        const result = await returnResponse
        return result
    }

}

const login = async(email, password) => {
    const response = await fetch(`${baseUrl}/users/login`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })  
    if(response.ok){
        const userId = await response.text()
        return userId
    } else {
        return undefined
    }
}

const createToken = ( userId, email ) =>{
    return fetch(`${baseUrl}/users/signup`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, email })
    })  
    .then(res => res.text())
    .then(token => localStorage.setItem('token', token))
    .catch((err) => console.log('i did mistake'))
}

const getStorageInfo = async(userId) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${baseUrl}/users/${userId}`, {
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    })
    const data = await response.json()
    return data
}

const updateUser = async(userId, data) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${baseUrl}/users/${userId}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({data})
    }) 
}

export { createToken, getStorageInfo, updateUser, signup, login }