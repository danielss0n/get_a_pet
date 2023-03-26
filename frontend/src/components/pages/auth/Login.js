import { useState, useContext } from 'react'
import { Context } from '../../../context/UserContext'
import { Link } from 'react-router-dom';
import Input from '../../form/Input'

export default function Login() {
    const [ user, setUser ] = useState({})
    const { login } = useContext(Context)

    function handleChange(e) {
        setUser({...user, [e.target.name] : e.target.value})
    }
    function handleSubmit(e) {
        e.preventDefault()
        login(user)
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Email"
                    type="text"
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
                <input class="btn waves-effect waves-light green darken-1 white-text" type="submit" value="Entrar"/>
                <p>Não tem conta?<Link to="/register">Clique aqui</Link></p>
            </form>
        </div>
    );
}