import React, { useEffect, useContext, useState } from 'react'
import { DogContext } from '../libs/DogContext';
import './userProfile.css'
import imageProfile from '../images/shiba-inu-profile.png'
import { getStorageInfo, updateUser } from '../libs/api'
import { withRouter, useHistory } from 'react-router-dom'


function UserProfile() {

    const { setFirstName, isLogin } = useContext(DogContext);
    const [ user, setUser ] = useState({firstName: '', lastName: '', phoneNumber: '',
    password:'', email:'', isAdmin:'false', bio:'', _id:'' })
    const [ newPassword, setNewPassword ] = useState('');
    const [ message, setMessage ] = useState('')
    const history = useHistory()

    const handleSubmit = async(event) => {
        event.preventDefault();
        if (newPassword){
            user.password = [newPassword];
        }
        setFirstName(user.firstName)
        const update = await updateUser(user._id, user)
        setMessage(update);
    }

    const handleChange = (event) => {
        setUser((user) => ({...user, [event.target.name] : event.target.value}))
        setMessage('')
    }

    const passwordChange = (event) => {
        setNewPassword(event.target.value)
    }

    useEffect(() => {
        if(isLogin){
            console.log('cool')
            setProfile()
            setMessage('')
        } else {
            history.push('/')
        }
    }, [isLogin])   
    
    const setProfile = async()=>{
        const userId = await localStorage.getItem('currentUser')
        const id = userId.substring(1, userId.length -1)
        const user = await getStorageInfo(id)
            setUser(user)
            return user
    }   
    
    return (
        <form className='userForm'>
        <h1 className='userTitle'>User Profile</h1>
            <img id='proImage' src={imageProfile} alt='profile'/>
                <div className='userNames'>
                <div className='fullUserInput' id='firstName'>
                    <label htmlFor='firstName'>Fisrt name</label>
                    <input type='text' className='nameInput' name='firstName'
                        value= {user && user.firstName}
                        onChange = {handleChange}
                    />
                </div>
                <div className='fullUserInput'>
                    <label htmlFor="lastName">Last name</label>
                    <input type='text' name = 'lastName' className='nameInput' 
                        value= {user && user.lastName}
                        onChange = {handleChange}
                    />
                </div>
                </div>
                <div className='fullUserInput'>
                    <label htmlFor='phone'>Phone number</label>
                    <input className='userInput' type='tel' name='phoneNumber' 
                        value= {user && user.phoneNumber}
                        onChange = {handleChange}
                    />
                </div>
                <div className='fullUserInput'>
                    <label htmlFor='email'>E-mail</label>
                    <input className='userInput' type='email' name='email'
                        value= {user && user.email}
                        onChange = {handleChange}
                    />
                </div>
                <div className='fullUserInput'>
                    <label htmlFor='password'>New Password</label>
                    <input className='userInput' type='password' name='password'
                        value= {newPassword}
                        onChange = {passwordChange}
                    />
                </div>
                <textarea id = 'bio' rows="5" cols="50" 
                            className='userBio' type='text' placeholder="User bio" name='bio'
                            value= {user && user.bio}
                            onChange = {handleChange}
                        /> 
                    {message && <div>{message}</div>}
                    <input id='change' type='submit' 
                        onClick = {(event)=>{handleSubmit(event)}} value='Save changes'/>
            
        </form>
    )
}

export default withRouter(UserProfile)
