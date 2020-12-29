import React, { useState, useContext, useEffect } from 'react'
import Modal from 'react-modal'
import { DogContext } from '../libs/DogContext'
import cartoonDogs from '../images/cartoonDogs.jpg'
import './signUpModal.css'
import { v4 as uuidv4 } from 'uuid';
import { getStorageInfo, createToken, signup } from '../libs/api'

Modal.setAppElement("#root");


function SignUp() {

    const { isLogin, setIsLogin, errorMessage, setErrorMessage } = useContext(DogContext);
    const [ userProfile, setUserProfile ] = useState({firstName: '', lastName: '', phoneNumber: '',
        userId: uuidv4(), password:'', email:'', isAdmin:'false', bio:'' });
    const [ isOpen, setIsOpen ] = useState( false );
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ message, setMessage ] = useState('')

    const handleChange = (event) => {    
        setUserProfile((userProfile) => ({...userProfile, [event.target.name]: event.target.value}))
    }
    
    const handleModal = (event) => {
        event.preventDefault();
        setIsOpen( true )
    }

    const handleModalClose = (event) => {
        event.preventDefault();
        setUserProfile({firstName: '', lastName: '', phoneNumber: '',
                userId: uuidv4(), password:'', email:''});
        setConfirmPassword('');
        setIsOpen( false )
    }

    const checkPassword = async () => {
        if(userProfile.password === confirmPassword){
            const result = await signup(userProfile.userId, 
                userProfile.firstName, userProfile.lastName,
                userProfile.email, userProfile.phoneNumber, userProfile.password)
            if(!result){
                createToken( userProfile.userId, userProfile.email );
                localStorage.setItem('currentUser', userProfile.userId)
                setIsOpen( false )
                setIsLogin( true )
                setUserProfile({firstName: '', lastName: '', phoneNumber: '',
                    userId: uuidv4(), password:'', email:''});
                setConfirmPassword('');
            }else{
                setMessage(result)
                setErrorMessage( true )
            }
        } else {
            setMessage('Confirmation password is not correct')
            setErrorMessage( true )
        }
    }

    const handleModalSubmit = (event) => {
        event.preventDefault();
        checkPassword()
    }

    useEffect(() => {
        setErrorMessage( false )
    }, [])

    return (
        <div className='sign-up-form'>
            <input className='sign-up' type='submit' 
                onClick = {(event)=>{handleModal(event)}} value='Sign Up'/>

            <Modal  style={{ content: { width : '60%', borderRadius: '20px',
                display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' } }} 
                isOpen = {isOpen}>
                <div className='right-side'>
                <input className='close' type='submit' 
                    onClick = {(event)=>{handleModalClose(event)}} value='x'/>
                <h1 className='sign-title'>Create Account</h1>
                <div className='names'>
                <input id='first-name' type='text' name = 'firstName' placeholder='Your First Name...' 
                    value= {userProfile.firstName}
                    onChange = {handleChange}
                />
                <input type='text' placeholder='Your Last Name...' name='lastName' 
                    value= {userProfile.lastName}
                    onChange = {handleChange}
                />
                </div>
                <input className='inputs' type='tel' placeholder='Your Phone number...' 
                    name= 'phoneNumber' value= {userProfile.phoneNumber}
                    onChange = {handleChange}
                />
                <input className='inputs' type='email' placeholder='Your Email...' 
                    name = 'email' value= {userProfile.email}
                    onChange = {handleChange}
                />
                <input className='inputs' type='password' placeholder='Your password.' 
                    name = 'password' value= {userProfile.password}
                    onChange = {handleChange}
                />
                <input className='inputs' type='password' placeholder='confirm password.' 
                    value= {confirmPassword}
                    onChange = {(event) => setConfirmPassword(event.target.value)}
                />
                {errorMessage?<h3>{message}</h3>:null}
                <input id='sign-in' type='submit' 
                    onClick = {(event)=>{handleModalSubmit(event)}} value='Sign Up'/>
                </div>
                <img id='dogCartoon' src={cartoonDogs} alt='dogs'/>
            </Modal>          
        </div>
    )
}

export default SignUp
