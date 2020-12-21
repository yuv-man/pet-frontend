import React, { useState } from 'react';
import '../App.css';
import { FaSearch } from 'react-icons/fa'
import './homePage.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
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
    const [ userProfile, setUserProfile ] = useState({firstName: '', lastName: '', phoneNumber: '',
        userId:'', password:'', email:'', avatar:'', isAdmin:'false', bio:'' });
    const [ user, setUser ] = useState( false );
    const [ pets, setPets ] = useState([]);
    const [ users, setUsers] = useState([]);
    const [ isAdmin, setIsAdmin ] = useState( true );

    return (
        <Router>
        <DogContext.Provider value = {{ user, setUser, userProfile, setUserProfile,
            pets, setPets, users, setUsers }}>
        <nav className = 'nav-bar'>
        <div className = 'nav-list'>
            <div className='left-header'>
                <img className='dog-logo' src={dogLogo} alt='shiba-inu'/>
                <div>
                    <Link to="/home">Home</Link>
                </div>
                <div>
                    <Link to="/userProfile">User Profile</Link>
                </div>
                <div>
                    <FaSearch className='searchIcon'/>
                    <Link to="/search">Search</Link>
                </div>
                {user ? <div>
                    <Link to="/myPets">My Pets</Link>
                </div> : null}
                {isAdmin ? <div>
                    <Link to="/petForm">Add Pet</Link>
                </div> : null}
            </div>
            {user? <input className='sign-up' type='submit' 
                value='Log out'/> : <div className='right-header'>
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