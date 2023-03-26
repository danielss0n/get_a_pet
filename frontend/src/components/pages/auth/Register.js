import Input from '../../form/Input'
import { useState } from 'react';
import { useContext } from 'react';
import { Context } from '../../../context/UserContext'

export default function Register() {
    const [ user, setUser ] = useState({})
    const { register } = useContext(Context)

    function handleChange(e) {
        setUser({...user, [e.target.name] : e.target.value})
    }
    function handleSubmit(e) {
        e.preventDefault()
        register(user)
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o seu telefone"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Email"
                    type="email"
                    name="email"
                    placeholder="Digite o seu email"
                    handleOnChange={handleChange}
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
                <input class="btn waves-effect waves-light green darken-1 white-text" type="submit" value="Cadastrar" />
            </form>
        </div>
    );
}
  
