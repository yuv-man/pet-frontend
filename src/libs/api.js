
const baseUrl = 'http://localhost:5000'

const signup = async( firstName, lastName, email, phoneNumber, password) =>{
    const response = await fetch(`${baseUrl}/users/signup`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, email, phoneNumber, password })
    })
    let returnResponse
        returnResponse = response.text()
        const result = await returnResponse
    if (!response.ok){
        return result
    } else {
        const userId = [result]
        return userId
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
        console.log('mistake')
        return undefined
    }
}

const createToken = ( email ) =>{
    return fetch(`${baseUrl}/users/token`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })  
    .then(res => res.text())
    .then(token => localStorage.setItem('token', token))
    .catch((err) => console.log('i did mistake'))
}

const getStorageInfo = async(userId) => {
    const token = await localStorage.getItem('token')
    const response = await fetch(`${baseUrl}/users/${userId}`, {
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    })
    const data = await response.json()
    return data[0]
}

const getUsers = async() => {
    const response = await fetch(`${baseUrl}/users`);
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

const addPetToList = async( status, petId, userId ) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${baseUrl}/users/myPets/${userId}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({status, petId})
    }) 
    const userInfo = await response.json()
    return(userInfo)
}

const searchDog = async(something) => {
    const response = await fetch(`${baseUrl}/pets/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(something)
    })
    const answer = await response.json()
    return answer
}

const updateDogStatus = async(status, userId , petId) => {
    const response = await fetch(`${baseUrl}/pets/${petId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({status, userId})
    })
    const result = await response.json()
}

const getMyPets = async(id) => {
    const response = await fetch(`${baseUrl}/pets/myPets/${id}`)
    let data = await response.json()
    if (data.length < 1){
        data = null
    }
    return data
}

const getDogInfo = async(id) => {
    const response = await fetch(`${baseUrl}/pets/update/${id}`)
    const data = await response.json()
    return data
}

const removeDog = async(id) => {
    const response = await fetch(`${baseUrl}/pets/delete/${id}`, {
        method: 'DELETE'
    })
    const data = await response.text()
    return data
}

const removeDogFromUsers = async(id) => {
    const response = await fetch(`${baseUrl}/users/removeDog/${id}`, {
        method: 'DELETE'
    })
    const data = await response.text()
    console.log(data)
}


export { createToken, getStorageInfo, updateUser, signup, 
        login, searchDog, updateDogStatus, addPetToList,
        getMyPets, getDogInfo, removeDog, getUsers, removeDogFromUsers }