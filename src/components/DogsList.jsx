import React, { useState, useContext, useEffect } from 'react'
import DogBubble from './DogBubble'
import { Link } from 'react-router-dom';
import { DogContext } from '../libs/DogContext';

function DogsList() {

    const { pets, setPets } = useContext(DogContext)

    const getData = async() => {
        const response = await fetch("http://localhost:5000/pets");
        const data = await response.json();
        setPets(data);
    }

    useEffect(() => {
        getData()
    }, [])

    const avatarPath = 'http://localhost:5000/pets/'

    return (
        <div className='dogList'>
        {pets.length != 0 ? pets.map(pet => 
            <DogBubble key = {pet._id} 
                name = {pet.dogName} type = {pet.dogType} 
                status = {pet.status} avatar = { avatarPath + pet.picture } petId = {pet._id}
                dogGender = {pet.dogGender} />
        ): <h1>No pets found</h1>}
        </div>
    )
}

export default DogsList
