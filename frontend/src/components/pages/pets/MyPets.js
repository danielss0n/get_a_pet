import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoundedImage from '../../layout/RoundedImage'
import { toast } from "react-toastify";
import api from "../../../utils/api";

export default function MyPets() {
    const [ pets, setPets ] = useState([])
    const [ token ] = useState(localStorage.getItem('token') || '')
    const navigate = useNavigate()

    useEffect(() => {
        api.get('/pets/mypets', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setPets(response.data.pets)
        })
    }, [token])

    async function removePet(id) {
        var msgType = 'sucess'
        const data = await api.delete(`/pets/${id}`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            const updatedPets = pets.filter((pet) => pet._id != id)
            setPets(updatedPets)
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        if(msgType !== 'error'){
            toast.success(data.message)
            navigate("/pet/mypets")
        } else {
            toast.error(data.message)
        }
    }

    async function concludeAdoption(id) {
        let msgType = 'success'

        const data = await api
          .patch(`/pets/conclude/${id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
          .then((response) => {
            return response.data
          })
          .catch((err) => {
            console.log(err)
            msgType = 'error'
            return err.response.data
          })
    
          if(msgType !== 'error'){
                toast(data.message)
                navigate("/pet/mypets")
            } else {
                toast(data.message)
            }
    }

    return (
        <div>
            <div>
                <h1>MyPets</h1>
                <Link to="/pet/add">Cadastrar Pet</Link>
            </div>
            <div class="row">
                { pets.length > 0 && 
                    pets.map((pet) => (
                        <div class="col s4 m4" key={pet.id}>
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
                                { pet.available ? (
                                    <>
                                
                                    <button class="btn waves-effect waves-light green darken-1 white-text" onClick={
                                        () => {
                                            concludeAdoption(pet._id)
                                        }
                                    }>Concluir adoção</button>
                                 
                                    </>
                                ): 
                                    <p>Pét já adotado</p>
                                }
                            </div>
                            <div class="card-action">

                                <Link to={`/pet/edit/${pet._id}`}>Editar Pet</Link> <br /><br />
                                <button class="btn waves-effect waves-light red white-text" onClick={() => {
                                    removePet(pet._id)
                                }}>Excluir</button>
                            </div>
                          </div>
                      </div>
                    ))
                }
                { pets.length === 0 && <p>Não há pets cadastrados</p> }
            </div>
        </div>  
    );
}