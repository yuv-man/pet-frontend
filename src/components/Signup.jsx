import React, { useState, useContext, useEffect } from 'react'
import Modal from 'react-modal'
import { DogContext } from '../libs/DogContext'
import cartoonDogs from '../images/cartoonDogs.jpg'
import './signUpModal.css'
import { createToken, signup } from '../libs/api'
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from 'react-router-dom'

Modal.setAppElement("#root");


function SignUp() {

    const { setIsLogin, errorMessage, setErrorMessage, 
            setFirstName, loading, setLoading } = useContext(DogContext);
    const [ userProfile, setUserProfile ] = useState({firstName: '', lastName: '', phoneNumber: '',
        password:'', email:'', admin:'false', bio:'' });
    const [ isOpen, setIsOpen ] = useState( false );
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ message, setMessage ] = useState('')
    const history = useHistory()

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
                password:'', email:''});
        setConfirmPassword('');
        setErrorMessage( false )
        setIsOpen( false )
    }

    const checkPassword = async () => {
        if(userProfile.password === confirmPassword){
            const result = await signup( 
                userProfile.firstName, userProfile.lastName,
                userProfile.email, userProfile.phoneNumber, userProfile.password)
            if(typeof result === 'object'){
                console.log(result[0])
                createToken( userProfile.email );
                localStorage.setItem('currentUser', result[0])
                setFirstName(userProfile.firstName)
                setIsOpen( false )
                setIsLogin( true )
                setUserProfile({firstName: '', lastName: '', phoneNumber: '',
                    password:'', email:''});
                setConfirmPassword('');
                history.push('/')

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
        if(!userProfile.firstName){
            setMessage('first name is missing')
            setErrorMessage( true )
        } else if (!userProfile.lastName){
            setMessage('last name is missing')
            setErrorMessage( true )
        } else if (!userProfile.phoneNumber){
            setMessage('phone number is missing')
            setErrorMessage( true )
        } else if (!userProfile.email){
            setMessage('email is missing')
            setErrorMessage( true )
        } else if (!userProfile.password){
            setMessage('password is missing')
            setErrorMessage( true )
        } else {
            setLoading( true )
            checkPassword()
            setLoading( false )
        }
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
                <form className='right-side'>
                <input className='close' type='submit' 
                    onClick = {(event)=>{handleModalClose(event)}} value='x'/>
                <h1 className='sign-title'>Create Account</h1>
                <div className='names'>
                <input id='first-name' type='text' name='firstName'
                    placeholder='Your First Name...' required 
                    value= {userProfile.firstName}
                    onChange = {handleChange}
                />
                <input type='text' placeholder='Your Last Name...' name='lastName' 
                    value= {userProfile.lastName} required
                    onChange = {handleChange}
                />
                </div>
                <input className='inputs' type='tel' placeholder='Your Phone number...' 
                    name= 'phoneNumber' value= {userProfile.phoneNumber} required
                    onChange = {handleChange}
                />
                <input className='inputs' type='email' placeholder='Your Email...' 
                    name = 'email' value= {userProfile.email} required
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
                {errorMessage?<h3 className='error' >{message}</h3>:null}
                <input id='sign-in' type='submit' 
                    onClick = {(event)=>{handleModalSubmit(event)}} value='Sign Up'/>
                    <ClipLoader loading={loading} />
                </form>
                <img id='dogCartoon' src={cartoonDogs} alt='dogs'/>
            </Modal>          
        </div>
    )
}

export default SignUp
