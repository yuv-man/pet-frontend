import React from 'react'
import './dogBubble.css'
import { FaMars } from 'react-icons/fa';
import { FaVenus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { DogContext } from '../libs/DogContext';

function DogBubble(props) {


    return (
        <div className='dog-bubble'>
            <img className='dog-image' src={props.avatar} alt={props.name}/>
            <div className='info'>
            <div>
                <div className='name-gender'>
                    <h2>{props.name} </h2>
                    {props.dogGender==='male'? <h2><FaMars /></h2>:<h2><FaVenus /></h2>}
                </div>
                <h4>Type: {props.type}</h4>
                <h4>Status: {props.status}</h4>
            </div>
            <div className='btns'>
                <div className='desc'>
                    <Link to={`DogProfile/${props.petId}`} >More details</Link>
                </div>
            </div>
            </div>
        </div>
    )
}

export default DogBubble