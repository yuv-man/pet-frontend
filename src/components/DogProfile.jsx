import React, { useContext } from 'react'
import { DogContext } from '../libs/DogContext'
import './doggie.css'
import { withRouter } from 'react-router-dom'
import { FaMars } from 'react-icons/fa';
import { FaVenus } from 'react-icons/fa';
import { FaRuler } from 'react-icons/fa';
import { FaWeightHanging } from 'react-icons/fa';
import { updateDogStatus, addPetToList } from '../libs/api'

function DogProfile(props) {

    // const baseUrl = 'http://localhost:5000'
    const baseUrl = 'https://pet-backend-yuval.herokuapp.com'
    const { pets, setPets, isLogin } = useContext(DogContext)
    const id = (props.match.params.dogId);
    let petObj = {};

    const getPet = (id) =>{
        const thePet = pets.filter(pet => pet._id === id);
        petObj = thePet[0];
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const localId = await localStorage.getItem('currentUser')
        const userId = localId.substring(1, localId.length - 1);
        updateDogStatus(event.target.name, userId , id)
        addPetToList(event.target.name, id, userId)
    }

    const avatarPath = `${baseUrl}/pets/`
    
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
                        <h3>Type: {petObj.dogType}</h3>
                        <h3>Status: {petObj.status}</h3>
                        <h3>Hypoallergenic: {petObj.hypoallergenic}</h3>
                        <h3>Dietary restrictions: {petObj.dietary}</h3>      
                        <div className='rectungale'>
                            <h4><FaRuler style={{fontSize:'20px', marginBottom:'1rem'}}/><br/>
                            height: {petObj.height} cm</h4>  
                        </div>
                        <div className='rectungale'>
                            <h4><FaWeightHanging style={{fontSize:'20px', marginBottom:'1rem'}} /><br/>weight: {petObj.weight} kg</h4> 
                        </div>
                </div>
                    <p>{petObj.comment}</p>
                </div>
            </div>
            
        </div>
            {isLogin && petObj.status === 'available' && <div >
                <button className='adopt' type='click' name='Adopt'
                    onClick={handleSubmit}>Adopt</button>
                <button className='foster' type='click' name='Foster'
                    onClick={handleSubmit}>Foster</button>
            </div>}
            
        </div>
    )
}

export default withRouter(DogProfile);
