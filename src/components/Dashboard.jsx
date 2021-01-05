import React, { useState, useEffect, useContext } from 'react'
import { DogContext } from '../libs/DogContext'
import UserModel from './UserModal'
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { getUsers, removeDog, removeDogFromUsers } from '../libs/api'
import './dashboard.css'

function Dashboard() {

    const { pets, setPets } = useContext(DogContext)
    const [ users, setUsers ] = useState()

    const allUsers = async() =>{
        const data = await getUsers()
        setUsers(data)
    }

    const getPets = async() => {
        const response = await fetch("http://localhost:5000/pets");
        const data = await response.json();
        setPets(data);
    }

    const deleteDog = (event, id) => {
        event.preventDefault()
        removeDogFromUsers(id)
        removeDog(id)
    }

    useEffect(() => {
        allUsers()
        getPets()
    }, [])

    return (
        <div className='cont'>
            <div className='users'>
            <h2 className='title-user'>Users</h2>
            {users? users.map(user => 
                <div key={user._id}>
                <div className='userBox'>
                <div className='text'>
                    <h4 className='userName' style={{marginRight: '2rem'}}>{user.firstName} {user.lastName}</h4>
                    <h4>{user.admin?'Administrator':'Pet owner'}</h4> 
                </div>
                    <UserModel id = {user._id} name = {user.firstName + ' ' +user.lastName}
                        phoneNumber ={user.phoneNumber} email = {user.email} />
                    
                </div>
                </div>
            ):null}
            </div>
            <div className='pets'>
                <h2 className='title-pet' >Pets</h2>
                {pets? pets.map(pet => 
                    <div key={pet._id}>
                    <div className='petBox'>
                    <div className='text'>
                        <h4 className='userName' >{pet.dogName}</h4>
                        <h4 className='userName' >{pet.dogType}</h4>
                        <h4 className='userName' >{pet.status}</h4>
                    </div>
                        <div className='updateLink'>
                            <Link to={`/updatePet/${pet._id}`}><FaEdit /></Link>
                        </div>
                        <button className='delete' type='click' 
                            onClick={(event) => deleteDog(event, pet._id)} ><FaTrash /></button>
                    </div>
                    </div>):null} 
            </div>
        </div>
    )
}

export default Dashboard
