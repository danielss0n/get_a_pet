import api from '../../../utils/api'
import { useState, useEffect } from 'react';
import PetForm from '../../form/PetForm';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

export default function EditPet({handleSubmit}) {
    const [ pet, setPet ] = useState({})
    const [ token ] = useState(localStorage.getItem('token') || '')
    const { id } = useParams()

    useEffect(() =>{
        api.get(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        })
        .then((response)=>{
            setPet(response.data.pet)
        })
    }, [token, id])

    async function updatePet(pet) {
        let msgType = 'success'

        const formData = new FormData()
        const petFormData = await Object.keys(pet).forEach((key) => {
            if(key === 'images') {
                for(let i; i < pet[key].length; i++) {
                    formData.append('images', pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        })

        formData.append('pet', petFormData)
        const data = await api.patch(`pets/${pet._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            return response.data
        }).catch((error) => {
            msgType = 'error'
            return error.response.data
        })

        if(msgType !== 'error'){
            toast.success(data.message)
        } else {
            toast.error(data.message)
        }
    }
   
    return (
        <div class="row">
            <h1>Editando Pet: {pet.name}</h1>
            { pet.name && (
                <PetForm
                    handleSubmit={updatePet}
                    btnText="Atualizar"
                    petData={pet}
                />
            ) }
        </div>
    );
}