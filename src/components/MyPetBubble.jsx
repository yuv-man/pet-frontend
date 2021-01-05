import React from 'react'
import { FaMars } from 'react-icons/fa';
import { FaVenus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './myPetBubble.css' 
import { updateDogStatus, addPetToList } from '../libs/api'


function MyPetBubble(props) {

    const returnPet = async(event) => {
        event.preventDefault()
        const localId = await localStorage.getItem('currentUser')
        const userId = localId.substring(1, localId.length - 1);
        updateDogStatus('available', userId , props.petId)
        addPetToList('available', props.petId, userId)
    }

    return (
        <div className='dogBubble'>
        <div className='dog-desc'>
            <img className='myDogImage' src={props.avatar} alt={props.name}/>
            <div className='info'>
            <div>
                <div className='name-gender'>
                    <h2>{props.name} </h2>
                    {props.dogGender==='male'? <h2><FaMars /></h2>:<h2><FaVenus /></h2>}
                </div>
                <h4 className='status'>Type: {props.type}</h4>
                <h4 className='statusB' >Status: {props.status}</h4>
            </div>
            </div>  
        </div>
        <div>
            <div className='more-info'>
                    <Link to={`DogProfile/${props.petId}`} >More details</Link>
                </div>
                <button className= 'returnPet' type='click' 
                    onClick={returnPet}>return pet</button>
        </div>
        </div>
    )
}

export default MyPetBubble
