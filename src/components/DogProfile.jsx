import React, { useContext, useEffect } from 'react'
import { DogContext } from '../libs/DogContext'
import './doggie.css'
import { withRouter } from 'react-router-dom'
import { FaMars } from 'react-icons/fa';
import { FaVenus } from 'react-icons/fa';
import { FaRuler } from 'react-icons/fa';
import { FaWeightHanging } from 'react-icons/fa';

function DogProfile(props) {

    const { pets, setPets } = useContext(DogContext)
    const id = (props.match.params.dogId);
    let petObj = {};

    const getPet = (id) =>{
        const thePet = pets.filter(pet => pet.dogId === id);
        petObj = thePet[0];
    }

    const avatarPath = 'http://localhost:5000/pets/'

    getPet(id);

    return (
        <div>
        <div className='bubble'>
            <div className='dog-profile'>
                <div className='image'>
                    <img className='petImage' src={avatarPath + petObj.picture} alt={petObj.dogName}/>
                </div>
                <div className='info-bubble'>
                    <div>
                    <div className='name-gender'>
                        <h1 className='dog-name'>{petObj.dogName}</h1>
                        {petObj.dogGender==='male'? <h1><FaMars /></h1>:<h1><FaVenus /></h1>}
                    </div>
                        <h4>Type: {petObj.dogType}</h4>
                        <h4>Status: {petObj.status}</h4>
                        <h4>Hypoallergenic: {petObj.hypoallergenic}</h4>
                        <h4>Dietary restrictions: {petObj.dietary}</h4>      
                        <div className='rectungale'>
                            <h4><FaRuler style={{fontSize:'20px', marginBottom:'1rem'}}/><br/>height: {petObj.height} cm</h4>  
                        </div>
                        <div className='rectungale'>
                            <h4><FaWeightHanging style={{fontSize:'20px', marginBottom:'1rem'}} /><br/>weight: {petObj.weight} kg</h4> 
                        </div>
                    </div>
                    <p>{petObj.comment}</p>
                </div>
            </div>
            
        </div>
            <div className='btns'>
                <input className='adopt' type='click' value='Adopt'/>
                <input className='foster' type='click' value='Foster'/>
            </div>
            
        </div>
    )
}

export default withRouter(DogProfile);
