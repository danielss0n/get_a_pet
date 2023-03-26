import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../../utils/api'
import Input from '../../form/Input'
import RoundedImage from '../../layout/RoundedImage';

export default function Profile() {
    
    const [ user, setUser ] = useState({})
    const [ preview, setPreview ] = useState()
    const [ token ] = useState(localStorage.getItem('token')||'')

    useEffect(() => {
        api.get('/users/checkuser', {
            header: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data)
        })
    }, [token])

    function onFileChange(e){
        setPreview(e.target.files[0])
        setUser({...user, [e.target.name] : e.target.files[0]})    
    }

    function handleChange(e){
        setUser({...user, [e.target.name] : e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let msgType = "Perfil atualizado"

        const formData = new FormData()

        const userFormData = await Object.keys(user).forEach((key) => 
            formData.append(key, user[key])
        )
        formData.append('user', userFormData)

        const data = await api
        .patch(`/users/${user._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            toast.success(msgType)
            return response.data
        }).catch((error) => {
            toast.error(error.response.data.message)
            return error.response.data
        })
    }

    return (
        <div>
            <h1>Perfil</h1>
            {(user.image || preview) && (
                <RoundedImage 
                    src={
                        preview 
                        ? URL.createObjectURL(preview) 
                        : `${process.env.REACT_APP_API}/images/users/${user.image}`
                    }
                    alt={user.name}
                />
            )}
            <form onSubmit={handleSubmit}>
                <Input
                    text="Image"
                    type="file"
                    name="image"
                    handleOnChange={onFileChange}
                />
                <Input
                    text="Email"
                    type="text"
                    name="email"
                    placeholder="Digite o seu email"
                    handleOnChange={handleChange}
                    value={user.email || ''}
                />
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleChange}
                    value={user.name || ''}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o seu telefone"
                    handleOnChange={handleChange}
                    value={user.phone || ''}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua senha"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Confirmação de senha"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme a sua senha"
                    handleOnChange={handleChange}
                />
                <input class="btn waves-effect waves-light green darken-1 white-text" type="submit" value="Editar" />
            </form>
        </div>
    );
}