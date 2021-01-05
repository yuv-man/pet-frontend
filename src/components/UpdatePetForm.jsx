import React, { useState, useContext, useEffect } from 'react'
import { DogContext } from '../libs/DogContext'
import { withRouter } from 'react-router-dom'
import './dogForm.css'
import { getDogInfo } from '../libs/api'

function UpdatePetForm(props) {

    const { isLogin } = useContext(DogContext)
    const [ dogProfile, setDogProfile ] = useState({
        dogName: '',status:'', height:'',weight:'',hypoallergenic:'',
        dietary: '', comment: '', dogType:'',dogGender:''
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

    const postData = (id) => {
        let formData = new FormData();
        console.log(id)
        if(avatar){
            formData.append('avatar', avatar);
            formData.append('dogProfile', JSON.stringify(dogProfile))
            
            fetch(`http://localhost:5000/pets/updateFile/${id}`, { 
                method:'PUT',
                body: formData
                })
                .then(success => { console.log('good job')})
                .catch(error => console.log(error))
        } else {
            fetch(`http://localhost:5000/pets/update/${id}`, { 
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dogProfile)
                })
                .then(success => { console.log('nice')})
                .catch(error => console.log(error))
        }
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        postData(props.match.params.id);
        setAvatar('')
    } 
    
    const setProfile = async()=>{
        const id = props.match.params.id
        const dog = await getDogInfo(id)
        setDogProfile(dog)
            return dog
    } 

    useEffect(() => {
            setProfile()
    }, [])     

    return (
        <div>
            <form className='form'>
                <h1 className='pet-title'>Update Dog Profile</h1>
                
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
                            <option value={dogProfile.status}>{dogProfile.status}</option>
                            {dogProfile.status==='available'?null:
                                <option value='available'>available</option>}
                            {dogProfile.status==='Foster'?null:
                                <option value='foster'>foster</option>}
                            {dogProfile.status==='Adopt'?null:
                                <option value='adopt'>adopt</option>}
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
                            <option value={dogProfile.dogGender}>{dogProfile.dogGender}</option>
                            {dogProfile.dogGender==='female' ?<option value='male'>Male</option>:
                            <option value='female'>Female</option>}
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
                            <option value={dogProfile.hypoallergenic}>{dogProfile.hypoallergenic}</option>
                            {dogProfile.hypoallergenic==='yes' ?<option value='no'>No</option>:
                            <option value='yes'>Yes</option>}
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
                <input id='add-pet' type='submit' style={{backgroundColor: '#2A1B40'}}
                    onClick = {(event)=>{handleSubmit(event)}} value='Update pet'/>
            </form>
        </div>
    )
}

export default withRouter(UpdatePetForm)
