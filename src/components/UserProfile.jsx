import React, { useEffect, useContext, useState } from 'react'
import { DogContext } from '../libs/DogContext';
import './userProfile.css'
import imageProfile from '../images/shiba-inu-profile.png'

function UserProfile() {

    const { userProfile, setUserProfile, users, setUsers } = useContext(DogContext);
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ bio, setBio ] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        setUserProfile({firstName: firstName, lastName: lastName, phoneNumber: phone, 
            email: email, password: password, bio: bio})
        setFirstName('');
        setLastName('');
        setPhone('');
        setEmail('');
        setPassword('');
        setBio('');
    }

    
    return (
        <form className='userForm'>
        <h1 className='userTitle'>User Profile</h1>
            <img id='proImage' src={imageProfile} alt='profile'/>
                <div className='userNames'>
                <div className='fullUserInput' id='firstName'>
                    <label htmlFor='firstName'>Fisrt name</label>
                    <input type='text' className='nameInput'
                        value= {firstName}
                        onChange = {(event) => setFirstName(event.target.value)}
                    />
                </div>
                <div className='fullUserInput'>
                    <label htmlFor="lastName">Last name</label>
                    <input type='text' name = 'lastName' className='nameInput' 
                        value= {lastName}
                        onChange = {(event) => setLastName(event.target.value)}
                    />
                </div>
                </div>
                <div className='fullUserInput'>
                    <label htmlFor='phone'>Phone number</label>
                    <input className='userInput' type='tel' 
                        value= {phone}
                        onChange = {(event) => setPhone(event.target.value)}
                    />
                </div>
                <div className='fullUserInput'>
                    <label htmlFor='email'>E-mail</label>
                    <input className='userInput' type='email' 
                        value= {email}
                        onChange = {(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='fullUserInput'>
                    <label htmlFor='password'>Password</label>
                    <input className='userInput' type='password'
                        value= {password}
                        onChange = {(event) => setPassword(event.target.value)}
                    />
                </div>
                <textarea id = 'bio' rows="5" cols="50" 
                            className='userBio' type='text' placeholder="User bio"
                            value= {bio}
                            onChange = {(event) => setBio(event.target.value)}
                        /> 
                    <input id='change' type='submit' 
                        onClick = {(event)=>{handleSubmit(event)}} value='Save changes'/>
            
        </form>
    )
}

export default UserProfile
