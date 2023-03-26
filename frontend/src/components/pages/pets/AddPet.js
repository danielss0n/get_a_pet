import api from '../../../utils/api'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import PetForm from '../../form/PetForm';

export default function AddPet() {
    const navigate = useNavigate()
    const [ token ] = useState(localStorage.getItem('token') || '')

    async function registerPet(pet) {
        const formData = new FormData
        let msgType = 'success'
        
        await Object.keys(pet).forEach((key) => {
            if(key === 'images') {
                for(let i = 0; i < pet[key].length; i++) {
                    formData.append('images', pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        })

        const data = await api.post('/pets/create', formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            msgType = 'error'
            return error.response.data
        })

        if(msgType !== 'error'){
            toast.success(data.message)
            navigate("/pet/mypets")
        } else {
            toast.error(data.message)
        }

    }

    return (
        <div>
            <h1>Cadastre um Pet</h1>
            <p>Depois ele ficará disponível para adoção</p>
            <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet"></PetForm>
        </div>
    );
}