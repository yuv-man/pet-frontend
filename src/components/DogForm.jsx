import React, { useState, useContext, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { DogContext } from '../libs/DogContext';
import './dogForm.css'

function DogForm() {

    const { setPets, pets } = useContext(DogContext);
    const [ dogProfile, setDogProfile ] = useState({
        dogName: '',status:'available', height:'',weight:'',hypoallergenic:'no',
        dietary: '', comment: '', dogType:'',dogGender:'male',dogId:uuidv4()
    })
    const [ avatar, setAvatar ] = useState('');
    const [ newPet, setNewPet ] = useState('')
    const handleImage = (event) => {
        if (event.target.files[0]){
            setAvatar(event.target.files[0])
        }
    }

    const handleChange = (event) => {    
        setDogProfile((dogProfile) => ({...dogProfile, [event.target.name]: event.target.value}))
    }

    const postData = () => {

        let formData = new FormData(); 
        formData.append('avatar', avatar);
        formData.append('dogProfile', JSON.stringify(dogProfile))

        
        fetch("http://localhost:5000/pets/uploads", { 
            method:'POST',
            body: formData
            })
            .then(success => { console.log('good job')})
            .catch(error => console.log(error))
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        setNewPet('new')
        postData();
        setDogProfile({dogName: '',status:'available', height:'',weight:'',hypoallergenic:'no',
        dietary: '', comment: '', dogType:'',dogGender:'male',dogId:uuidv4()
        })
        setAvatar('')
    }    

    return (
        <div>
            <form className='form'>
                <h1 className='pet-title'>Create Dog Profile</h1>
                
                <div className='formInputs'>
                <div className='fullInput'>
                    <label htmlFor="dogName">Dog's name</label>
                    <input className='petInput' type='text' name='dogName' 
                        value= {dogProfile.dogName}
                        onChange = {handleChange}
                    />
                </div>
                    <div className='fullInput'>
                        <label htmlFor='dogStatus'>Status</label>
                        <select className='petInput' name = 'status' id='status'
                        onChange = {handleChange}>
                            <option default value='available'>available</option>
                            <option value='foster'>foster</option>
                            <option value='adopt'>adopted</option>
                        </select>                          
                    </div>
                    <div className='fullInput'>
                        <label htmlFor="height">Height</label>
                        <input className='petInput' type='number' name='height' 
                            value= {dogProfile.height}
                            onChange = {handleChange}
                        />
                    </div>
                    <div className='fullInput'>
                        <label htmlFor="weight">Weight</label>
                        <input className='petInput' type='number' name='weight'  
                            value= {dogProfile.weight}
                            onChange = {handleChange}
                        />
                    </div>
                    <div className='fullInput'>
                        <label htmlFor='type'>Dog's type</label>
                        <input className='petInput' type='text' id='type' name='dogType'
                            value={dogProfile.dogType}
                        onChange = {handleChange}>
                        </input> 
                    </div>
                    <div className='fullInput'>
                        <label htmlFor='dogGender'>Dog gender</label>
                        <select className='petInput' name='dogGender' id='dogGender'
                        onChange = {handleChange}>
                            <option value='male' default>Male</option>
                            <option value='female'>Female</option>
                        </select> 
                    </div>
                    <div className='fullInput'>
                        <label htmlFor='Dietary'>Dietary restrictions</label>
                        <input className='petInput' type='text' name='dietary'
                            value= {dogProfile.dietary}
                            onChange = {handleChange}
                        />
                    </div>
                        <div className='fullInput'>
                        <label htmlFor='hypoallergenic'>Hypoallergenic</label>
                        <select className='petInput' name='hypoallergenic' id='hypoallergenic'
                        onChange = {handleChange}>
                            <option value='no' default>No</option>
                            <option value='yes'>Yes</option>
                        </select> 
                    </div>
                        <textarea id = 'desc' rows="5" cols="50" name='comment' 
                            className='petInput' type='text' placeholder="Pet's description"
                            value= {dogProfile.comment}
                            onChange = {handleChange}
                        /> 
                    <div>
                        
                        <div id='dog-photo'>   
                        <label>Dog Image</label>
                        <input type='file'  
                            onChange = {(event) => handleImage(event)}
                        /> 
                        </div>
                        </div>
                </div>
                <input id='add-pet' type='submit' 
                    onClick = {(event)=>{handleSubmit(event)}} value='Add pet'/>
            </form>
        </div>
    )
}

export default DogForm

// Type: French Buldog