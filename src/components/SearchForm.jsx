import React, { useContext, useState }from 'react'
import './searchForm.css'
import { FaSearch } from 'react-icons/fa'
import { FaAngleDoubleDown } from 'react-icons/fa';
import { FaAngleDoubleUp } from 'react-icons/fa';
import { searchDog } from '../libs/api'
import DogsList from './DogsList';
import { DogContext } from '../libs/DogContext';
import ClipLoader from "react-spinners/ClipLoader";



function SearchForm() {

    const { setPets, loading, setLoading } = useContext(DogContext)
    const [ search, setSearch ] = useState({dogType:'', status:'', 
        height:'', weight:'', dogName:''});
    const [ isAdvanced, setIsAdvanced ] = useState( false );


    const handleChange = (event) => {
        setSearch({...search, [event.target.name]: event.target.value})
    }
    
    const handleAdvanced = (event) => {
        event.preventDefault();
        setIsAdvanced(!isAdvanced)
        setSearch({...search, status:'', 
            height:'', weight:'', dogName:''})
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        setLoading( true )
        const results = await searchDog(search)
        setPets(results)
        setLoading( false )
    }

    const advanced = 
        <div className='advancedSearch'>
            
            <select className='advanced' name='status'
                onChange = {handleChange}>
                <option value=''> Dog status</option>
                <option value='available'>Available</option>
                <option value='foster'>Foster</option>
                <option value='adopt'>Adopt</option>
            </select> 
            <input className='advanced' type='number' name = 'height' placeholder='Dog height greater than...'
            value = {search.height} onChange={handleChange}/>
            <input className='advanced' type='number' name = 'weight' placeholder='Dog weight greater than...'
            value = {search.weight} onChange={handleChange}/>
            <input className='advanced' type='text' name = 'dogName' placeholder='Dog name'
            value = {search.dogName} onChange={handleChange}/>
        </div>


    return (
        <div>
            <form >
            <div>
            </div>
                <div className='search-form'>
                    <FaSearch className='search-icon'/>
                    <input id='search-text' type='text' placeholder = 'search by breed' 
                    value = {search.dogType} name = 'dogType' 
                    onChange = {handleChange}/>
                </div>
                <input id='search-btn' type='submit' 
                    value='Search' onClick={(event=>{handleSubmit(event)})}/>
                <button id='advanced-search' type='click' 
                    onClick={(event)=>{handleAdvanced(event)}}>{isAdvanced?<FaAngleDoubleUp/>:<FaAngleDoubleDown/>}</button>
                </form>   
                <div>
                    {isAdvanced? advanced : null}
                </div>
                <ClipLoader loading={loading} />
                <DogsList/>
        </div>
    )
}

export default SearchForm
