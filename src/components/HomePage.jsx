import React, { useState } from 'react';
import '../App.css';
import { FaSearch } from 'react-icons/fa'
import './homePage.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import Home from './Home';
import UserProfile from './UserProfile'
import { DogContext } from '../libs/DogContext'
import SignUp from './Signup'
import Login from './Login'
import SearchForm from './SearchForm'
import MyPets from './MyPets'
import dogLogo from '../images/shiba-inu-logo.png'
import DogsList from './DogsList';
import DogProfile from './DogProfile';
import DogForm from './DogForm'


function HomePage (){

    
    const [ loading , setLoading ] = useState( false );
    const [ isLogin, setIsLogin ] = useState( false );
    const [ currentUser, setCurrentUser ] = useState();
    const [ pets, setPets ] = useState([]);
    const [ users, setUsers] = useState([]);
    const [ isAdmin, setIsAdmin ] = useState( true );
    const [ errorMessage, setErrorMessage ] = useState( false )

    const logout = () => {
        setIsLogin( false );
        localStorage.setItem('token', null)
    }

    return (
        <Router>
        <DogContext.Provider value = {{ isLogin, setIsLogin, pets, setPets, users, setUsers, 
            currentUser, setCurrentUser, errorMessage, setErrorMessage }}>
        <nav className = 'nav-bar'>
        <div className = 'nav-list'>
            <div className='left-header'>
                <img className='dog-logo' src={dogLogo} alt='shiba-inu'/>
                <div>
                    <Link to="/home">Home</Link>
                </div>
                {isLogin && <div>
                    <Link to="/userProfile">User Profile</Link>
                </div>}
                <div>
                    <FaSearch className='searchIcon'/>
                    <Link to="/search">Search</Link>
                </div>
                {isLogin ? <div>
                    <Link to="/myPets">My Pets</Link>
                </div> : null}
                {isAdmin ? <div>
                    <Link to="/petForm">Add Pet</Link>
                </div> : null}
            </div>
            {isLogin? <input className='sign-up' type='submit' 
                value='Log out' onClick={logout}/> : <div className='right-header'>
                <Login/>
                <SignUp />
            </div>}
        </div>
        </nav>
            <Switch>
            <Route path="/search">
                <SearchForm />
                <DogsList/>
            </Route>
            <Route path="/dogProfile/:dogId">
                <DogProfile/>
            </Route>
            <Route path="/myPets">
                <MyPets />
            </Route>
            <Route path="/petForm">
                <DogForm />
            </Route>
            <Route path="/userProfile">
                <UserProfile />
            </Route>
            <Route path="/">
                <Home />
            </Route>
            </Switch>
        </DogContext.Provider>
        </Router>
    )
}

export default HomePage;