import React, { useState } from 'react'
import Modal from 'react-modal'
import shibaInu from '../images/cuteShibaInu.png'

Modal.setAppElement("#root");

function Login() {

    const [ isOpen, setIsOpen ] = useState( false );
    const [ email, setEmail ] = useState('');
    const [ loginPassword, setLoginPassword ] = useState('');

    const handleModal = (event) => {
        event.preventDefault();
        setIsOpen( true )
    }

    const handleModalClose = (event) => {
        event.preventDefault();
        setIsOpen( false )
    }

    const handleModalSubmit = (event) => {
        event.preventDefault();
        setIsOpen( false )
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
                    <input id='login-btn' type='submit' 
                        onClick = {(event)=>{handleModalSubmit(event)}} value='Log In'/>
                </div>
            </Modal>          
        </div>
    )
}


export default Login
