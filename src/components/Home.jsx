import React, { useState, useContext, useEffect } from 'react'
import { DogContext } from '../libs/DogContext'
import groupDogs from '../images/groupDogs.png'
import { getStorageInfo } from '../libs/api'


function Home() {

    const { isLogin, firstName } = useContext(DogContext);
    // const [ firstName, setFirstName ] = useState('')

    // useEffect(() => {
    //     if(isLogin){
    //         const userId = localStorage.getItem('currentUser')
    //         getStorageInfo(userId).then(user => setFirstName(user.firstName))            
    //     }
    // }, [])
    
    return (
        <div>
        {isLogin ? <h1 className = 'header'>Welcome Back, {firstName}</h1> 
            : <h1 className = 'header'>Find your new best friend!</h1>}
            
            <div className = 'title'>
                <h2 className='header-text'>Congratulations <br />on adopting your new pet. <br/> 
                    We are here to help you and your new pet <br/>enjoy a great life together.</h2>
                <img src={groupDogs} alt='goupDogs'/>    
            </div>
        </div>
    )
}

export default Home
