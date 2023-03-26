import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import RoundedImage from "../../layout/RoundedImage";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";

export default function PetDetails() {
    const [ pet, setPet ] = useState([])
    const { id } = useParams()
    const [ token ] = useState(localStorage.getItem('token') || '')
    const navigate = useNavigate()

    useEffect(() => {
        api.get(`/pets/${id}`).then((response) => {
            setPet(response.data.pet)
        })
    }, [id])

    async function schedule() {
        let msgType = 'success'
        
    
        const data = await api
          .patch(`pets/schedule/${pet._id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
              },
          })
          .then((response) => {
            console.log(response.data)
            return response.data
          })
          .catch((error) => {
            console.log(error)
            msgType = 'error'
            return error.response.data
          })
    
          if(msgType !== 'error'){
            toast(data.message)
            navigate("/pet/mypets")
        } else {
            toast(data.message)
        }
        
      }

    return (
        <>
            {pet.name && (
                <div>
                    <h1>Conhecendo o Pet: {pet.name}</h1>
                    <p>Se tiver interesse, marque uma visita para conhece-lo</p>
                
                <div></div>
                    {pet.images.map((image, index) => (
                        <RoundedImage
                        src={`${process.env.REACT_APP_API}images/pets/${image}`}
                        alt={pet.name}
                        key={index}
                        width="75px"
                        />
                    ))}
                    <p>
                        <span>Peso:</span> {pet.weight}kg
                    </p>
                    <p>
                        <span>Idade:</span> {pet.age}
                    </p>
                    <p>
                        <span>Cor:</span> {pet.color}
                    </p>
                    {token ? (
                        <button 
                            class="btn waves-effect waves-light green white-text"
                            onClick={schedule}    
                        >Solicitar uma visita</button>
                    ) : (
                        <p>Você precisa <Link to="/register">criar uma conta</Link> para solicitar uma visita</p>
                    )}
                </div>
            )}
        </>
    );
}