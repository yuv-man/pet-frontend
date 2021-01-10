import React, {  useContext, useEffect } from 'react'
import DogBubble from './DogBubble'
import { DogContext } from '../libs/DogContext';

function DogsList() {


    // const baseUrl = 'http://localhost:5000'
    const baseUrl = 'https://pet-backend-yuval.herokuapp.com'
    const { pets, setPets } = useContext(DogContext)

    const getData = async() => {
        const response = await fetch(`${baseUrl}/pets`);
        const data = await response.json();
        setPets(data);
    }

    useEffect(() => {
        getData()
    }, [])

    const avatarPath = `${baseUrl}/pets/`

    return (
        <div className='dogList'>
        {pets.length !== 0 ? pets.map(pet => 
            <DogBubble key = {pet._id} 
                name = {pet.dogName} type = {pet.dogType} 
                status = {pet.status} avatar = { avatarPath + pet.picture } petId = {pet._id}
                dogGender = {pet.dogGender} />
        ): <h1>No pets found</h1>}
        </div>
    )
}

export default DogsList
