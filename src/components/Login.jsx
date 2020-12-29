import React, { useState, useContext } from 'react'
import Modal from 'react-modal'
import shibaInu from '../images/cuteShibaInu.png'
import {  createToken, login } from '../libs/api'
import { DogContext } from '../libs/DogContext'

Modal.setAppElement("#root");

function Login() {

    const { isLogin, setIsLogin, errorMessage, setErrorMessage } = useContext(DogContext)
    const [ isOpen, setIsOpen ] = useState( false );
    const [ email, setEmail ] = useState('');
    const [ loginPassword, setLoginPassword ] = useState('');
    const [ message, setMessage ] = useState('');

    const handleModal = (event) => {
        event.preventDefault();
        setIsOpen( true )
    }

    const handleModalClose = (event) => {
        event.preventDefault();
        setErrorMessage( false )
        setEmail('')
        setLoginPassword('')
        setIsOpen( false )
    }

    const handleModalSubmit = async(event) => {

        event.preventDefault();
        const userId = await login(email, loginPassword)
        if (!userId){
            setErrorMessage( true )
        } else {
            localStorage.setItem('currentUser', userId)
            createToken(userId, email)
            setIsLogin( true )
            setIsOpen( false )
        }
    }

    return (
        <div id='normal-div'>
        <input id='login' type='submit' 
        onClick = {(event)=>{handleModal(event)}} value='Login'/>
        <Modal style={{ content: { width : '30%', borderRadius: '20px', margin: '0 auto'} }}
        isOpen = {isOpen}>
            <input className='close' type='submit' 
                onClick = {(event)=>{handleModalClose(event)}} value='x'/>
                <h1 id='title-login' >Log In</h1>
                <div>
                    <img id = 'shiba-image' src={shibaInu} alt='shibaInu'/>
                </div>
                <div className='login-inputs'>
                    <input className='inputs' type='email' placeholder='Your Email...' 
                        value= {email}
                        onChange = {(event) => setEmail(event.target.value)}
                    />
                    <input className='inputs' type='password' placeholder='Your password.' 
                        value= {loginPassword}
                        onChange = {(event) => setLoginPassword(event.target.value)}
                    />
                    {errorMessage?<h3>e-mail or password is invalid</h3>:null}
                    <input id='login-btn' type='submit' 
                        onClick = {(event)=>{handleModalSubmit(event)}} value='Log In'/>
                </div>
            </Modal>          
        </div>
    )
}


export default Login
