import React, { useState, useEffect, useContext } from 'react'
import { DogContext } from '../libs/DogContext'
import UserModel from './UserModal'
import { Link, useHistory } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaUserShield } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { getUsers, removeDog, removeDogFromUsers, 
        removeUser, updateUser,removeOwner } from '../libs/api'
import './dashboard.css'

function Dashboard() {

    const { pets, setPets, isLogin, update, setUpdate } = useContext(DogContext)
    const [ users, setUsers ] = useState()
    const history = useHistory()

    const allUsers = async() =>{
        const data = await getUsers()
        setUsers(data)
    }

    const setAdmin = async(user) => { 
        console.log(user)
        if(user.admin){
            user.admin = false
        } else {
            user.admin = true    
        }
        updateUser(user._id, user)
        setUpdate(update + 1)
    }

    const deleteUser = (user) => {
        let messege = window.confirm("Are you sure you want to delete the user?");
        if (messege === true) {
            removeOwner(user._id)
            removeUser(user._id)
            setUpdate(update - 1)
        }
    }

    const getPets = async() => {
        const response = await fetch("http://localhost:5000/pets");
        const data = await response.json();
        setPets(data);
    }

    const deleteDog = (event, id) => {
        event.preventDefault()
        let messege = window.confirm("Are you sure you want to delete the dog?");
        if (messege === true) {
            removeDogFromUsers(id)
            removeDog(id)
        }
    }

    useEffect(() => {
        if(isLogin){
            allUsers()
            getPets()
        } else {
            history.push('/')
        }
    }, [isLogin, update]) 


    return (
        <div className='cont'>
            <div className='users'>
            <h2 className='title-user'>Users</h2>
            {users? users.map(user => 
                <div className='userBox' key={user._id}>
                <div className='text'>
                    <h4 className='userName' style={{marginRight: '2rem'}}>{user.firstName} {user.lastName}</h4>
                    <h4>{user.admin?'Administrator':'Pet owner'}</h4> 
                </div>
                <div className='btns'>
                    <button className='admin' type='click' onClick={() => setAdmin(user)}>
                    {user.admin?<FaUser/>:<FaUserShield/>}</button>
                        <UserModel id = {user._id} name = {user.firstName + ' ' +user.lastName}
                            phoneNumber ={user.phoneNumber} email = {user.email} />
                    <button type='click' className='delete' 
                    onClick={() => deleteUser(user)}> <FaTrash /></button>
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
