import React, { useContext } from 'react'
import { DogContext } from '../libs/DogContext'
import groupDogs from '../images/groupDogs.png'



function Home() {

    const { isLogin, firstName } = useContext(DogContext);
    
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
