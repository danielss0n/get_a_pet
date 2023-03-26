import api from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function useAuth() {

    const [ authenticated, setAuthenticated ] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    async function register(user){
        let msgText = "Cadastro realizado com sucesso!"
        let msgType = 'success'

        try {
            
            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })
            await authUser(data)
            toast.success(msgText)
        
        } catch (error) {
            console.log(error)
            msgText = error.response.data.message
            msgType = 'error'
            toast.error(msgText)
        }
    }

    async function authUser(data) {
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        navigate('/')
    }

    async function login(user) {
        let msgText = "Login realizado com sucesso!"

        try {
            const data = await api.post('/users/login', user).then((response) => {
                return response.data
            })
            await authUser(data)
            toast.success(msgText)

        } catch (error) {
            msgText = error.response.data.message
            toast.error(msgText)
        }
    }

    function logout() {
        const msgText = "Logout realizado com sucesso!"
        
        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        
        navigate('/')
        toast.success(msgText)
    }

    return { register, authenticated, login, logout }
}
