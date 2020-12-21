import React, { useState }from 'react'
import './searchForm.css'
import { FaSearch } from 'react-icons/fa'
import { FaAngleDoubleDown } from 'react-icons/fa';
import { FaAngleDoubleUp } from 'react-icons/fa';


function SearchForm() {

    const [ search, setSearch ] = useState('');
    const [ isAdvanced, setIsAdvanced ] = useState( false );

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleAdvanced = (event) => {
        event.preventDefault();
        setIsAdvanced(!isAdvanced)
    }

    const advanced = 
        <div className='advancedSearch'>
            <input className='advanced' type='text' placeholder='Dog type'/>
            <input className='advanced' type='text' placeholder='Dog height'/>
            <input className='advanced' type='text' placeholder='Dog weight'/>
            <input className='advanced' type='text' placeholder='Dog name'/>
        </div>

    return (
        <div>
            <form >
            <div>
                
            </div>
                <div className='search-form'>
                    <FaSearch className='search-icon'/>
                    <input id='search-text' type='text' placeholder = 'search a friend' value = {search} 
                        onChange = {(event) => {setSearch(event.target.value)}}/>
                </div>
                <input id='search-btn' type='submit' 
                    value='Search' onClick={(event=>{handleSubmit(event)})}/>
                <button id='advanced-search' type='click'
                    onClick={(event)=>{handleAdvanced(event)}}>{isAdvanced?<FaAngleDoubleUp/>:<FaAngleDoubleDown/>}</button>
                </form>   
                <div>
                    {isAdvanced? advanced : null}
                </div>
        </div>
    )
}

export default SearchForm
