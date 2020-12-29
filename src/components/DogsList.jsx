import React, { useState, useContext, useEffect } from 'react'
import DogBubble from './DogBubble'
import { Link } from 'react-router-dom';
import { DogContext } from '../libs/DogContext';

function DogsList() {

    const { pets, setPets } = useContext(DogContext)

    const getData = async() => {
        const response = await fetch("http://localhost:5000/pets/pets");
        const data = await response.json();
        // console.log(data)
        setPets(data);
    }

    useEffect(() => {
        getData()
    }, [])

    const avatarPath = 'http://localhost:5000/pets/'

    return (
        <div className='dogList'>
        {pets? pets.map(pet => 
            <DogBubble key = {pet.dogId} 
                name = {pet.dogName} type = {pet.dogType} 
                status = {pet.status} avatar = { avatarPath + pet.picture } petId = {pet.dogId}
                dogGender = {pet.dogGender} />
        ): null}
        </div>
    )
}

export default DogsList
