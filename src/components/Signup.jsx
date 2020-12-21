import React, { useState, useContext, useEffect } from 'react'
import Modal from 'react-modal'
import { DogContext } from '../libs/DogContext'
import cartoonDogs from '../images/cartoonDogs.jpg'
import './signUpModal.css'
import { v4 as uuidv4 } from 'uuid';

Modal.setAppElement("#root");


function SignUp() {

    const { userProfile, setUserProfile, users, setUsers } = useContext(DogContext);
    const [ isOpen, setIsOpen ] = useState( false );
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');


    
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
        setUserProfile({firstName: firstName, lastName: lastName, phoneNumber: phone, 
            email: email, password: password, userId: uuidv4()})
        setFirstName('');
        setLastName('');
        setPhone('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setIsOpen( false )
    }

    useEffect(() => {
        if(userProfile.firstName){
            setUsers((users) =>{ 
                return [userProfile, ...users]})
        }
    }, [userProfile])

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
                <input id='first-name' type='text' placeholder='Your First Name...' 
                    value= {firstName}
                    onChange = {(event) => setFirstName(event.target.value)}
                />
                <input type='text' placeholder='Your Last Name...' 
                    value= {lastName}
                    onChange = {(event) => setLastName(event.target.value)}
                />
                </div>
                <input className='inputs' type='tel' placeholder='Your Phone number...' 
                    value= {phone}
                    onChange = {(event) => setPhone(event.target.value)}
                />
                <input className='inputs' type='email' placeholder='Your Email...' 
                    value= {email}
                    onChange = {(event) => setEmail(event.target.value)}
                />
                <input className='inputs' type='password' placeholder='Your password.' 
                    value= {password}
                    onChange = {(event) => setPassword(event.target.value)}
                />
                <input className='inputs' type='password' placeholder='confirm password.' 
                    value= {confirmPassword}
                    onChange = {(event) => setConfirmPassword(event.target.value)}
                />
                <input id='sign-in' type='submit' 
                    onClick = {(event)=>{handleModalSubmit(event)}} value='Sign Up'/>
                </div>
                <img id='dogCartoon' src={cartoonDogs} alt='dogs'/>
            </Modal>          
        </div>
    )
}

export default SignUp
