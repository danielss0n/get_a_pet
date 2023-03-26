import api from "../../utils/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import RoundedImage from "../layout/RoundedImage";
export default function Home() {
    const [ pets, setPets ] = useState([])

    useEffect(() => {

        api.get('/pets').then((response) => {
            setPets(response.data.pets)

        })
    }, [])

    return (
        <div>
            <h1>Adote um Pet</h1>
            <p>Veja os detalhes de cada um e conheça o tutor deles</p>
            <div class="row">
                {pets.length > 0 && 
                    pets.map((pet) => (
                        <div>
                            <div class="col s12 m4" key={pet.id}>
                                <div class="card">
                                    <div class="card-image">
                                    <RoundedImage
                                        src={`${process.env.REACT_APP_API}images/pets/${pet.images[0]}`}
                                        alt={pet.name}
                                        width="75px"
                                    />
                                    <span class="card-title">{pet.name}</span>
                                    </div>
                                    <div class="card-content">
                                    { pet.available ? 
                                    (
                                        <>
                                        {pet.adopter && (
                                            <p>Disponível para adotar</p>
                                        )}
                                        
                                        </>
                                    )

                                    : 
                                        <p>Pét já adotado</p>
                                    }
                                    <p>Idade: {pet.age}</p>
                                    <p>Peso: {pet.weight}</p> 
                                    <p>Cor: {pet.color}</p> 
                                </div>
                                    <div class="card-action">
                                        <Link to={`/pet/${pet._id}`}>Ver Mais</Link> <br /><br />
                    
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))
                    }
                    {pets.length === 0 && (
                        <p>Não há pets cadastrados</p>
                    )}
            </div>
        </div>
    );
}