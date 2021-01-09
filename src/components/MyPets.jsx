import React, { useState, useEffect, useContext } from 'react'
import { getMyPets } from '../libs/api'
import MyPetBubble from './MyPetBubble'
import { DogContext } from '../libs/DogContext'
import { useHistory } from 'react-router-dom'
import sadShibaInu from '../images/sad-shiba-inu.png'

function MyPets() {
    
    const { isLogin, myPets, setMyPets, update } = useContext(DogContext)
    const history = useHistory()
    const avatarPath = 'http://localhost:5000/pets/'


    const myDogs = async() => {
        const userId = await localStorage.getItem('currentUser')
        const id = userId.substring(1, userId.length - 1)
        let pets = await getMyPets(id);
        setMyPets(pets)
    }
    
    useEffect(() => {
        if(isLogin){
            myDogs()
        } else {
            history.push('/')
        }
    }, [isLogin, update])

    return (
        <div className='dogList'>
        {myPets ? myPets.map(pet => 
            <MyPetBubble key = {pet._id} 
                name = {pet.dogName} type = {pet.dogType} 
                status = {pet.status} avatar = { avatarPath + pet.picture } 
                petId = {pet._id} 
                dogGender = {pet.dogGender} />
        ): <div className='sad-shiba-inu'>
            <img src={sadShibaInu}/>
            <br/> <h1>No pets in your list</h1>
            </div>}
        </div>
    )
}

export default MyPets
