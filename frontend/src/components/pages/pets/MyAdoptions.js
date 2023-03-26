import api from '../../../utils/api'
import { useState, useEffect } from 'react';
import PetForm from '../../form/PetForm';
import { toast } from 'react-toastify';
import { useParams, Link } from 'react-router-dom';
import RoundedImage from '../../layout/RoundedImage';

export default function MyAdoptions() {
    const [ pets, setPets ] = useState({})
    const [ token ] = useState(localStorage.getItem('token') || '')
    const { id } = useParams()

    useEffect(() =>{
        api.get(`/pets/myadoptions`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        })
        .then((response)=>{
            setPets(response.data.pets)
        })
    }, [token])
   
    return (
        <div>
            <div class="row">
                {pets.length > 0 && 
                    pets.map((pet) => (
                        <div>
                            <div class="col s12 m4" key={pet.id}>
                                <div class="card" key={pet._id}>
                                    <div class="card-image">
                                    <RoundedImage
                                        src={`${process.env.REACT_APP_API}images/pets/${pet.images[0]}`}
                                        alt={pet.name}
                                        width="75px"
                                    />
                                    <span class="card-title">{pet.name}</span>
                                    </div>
                                    <div class="card-content">
                                    <span>{pet.name}</span>
                                </div>
                                <p>
                                    <span>Ligue para:</span> {pet.user.phone}
                                </p>
                                <p>
                                    <span>Fale com:</span> {pet.user.name}
                                </p>
                                <div class="card-action">
                                    {pet.availabe ? (
                                        <p>Adoção em processo</p>
                                    ) : (
                                        <p>Parabéns por concluir a adoção</p>
                                    )}
                                </div>
                                </div>
                            </div>
                        </div>
                        ))
                    }
                { pets.length === 0 && (
                    <p>Não há pets adotados</p>
                )}
            </div>
        </div>
    );
}