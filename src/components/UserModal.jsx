import React, { useState, useEffect } from 'react'
import { getMyPets } from '../libs/api'
import { FaPhone } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaDog } from 'react-icons/fa';
import { FaPaw } from 'react-icons/fa';
import Modal from 'react-modal'
import './userModal.css'

function UserModal(props) {

    const [ isOpen, setIsOpen ] = useState( false );
    const [ myPets, setMyPets ] = useState()

    const handleModal = () => {
        setIsOpen( true )
    }

    const closeModal = () => {
        setIsOpen( false )
    }

    const showPets = async() =>{
        let pets = await getMyPets(props.id);
        setMyPets(pets)
    }

    useEffect(() => {
        showPets()
    }, [isOpen])

    return (
        <div className='userBtn'>
            <button type="click" onClick = {handleModal}>Info</button>  

            <Modal  style={{ content: { width : '30%', height: '20rem', borderRadius: '20px',
                display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' } }} 
                isOpen = {isOpen}>
                <div className='info'>
                <h1>{props.name}</h1>
                <h4><FaPhone />     {props.phoneNumber}</h4>
                <h4><FaEnvelope />   {props.email}</h4>
                <div className='dogBox'>
                <h2><FaDog/> User's Pets</h2>
                {myPets? myPets.map(pet => <li key = {pet._id} className='dogProp'>
                <div className='dogName'><FaPaw/>  {pet.dogName}</div>
                <div >{pet.dogType}</div></li>):<div>None</div>}
                </div>
                </div>
                <button className='close' type="click" onClick = {closeModal}>X</button> 
            </Modal>
            
        </div>
    )
}

export default UserModal
