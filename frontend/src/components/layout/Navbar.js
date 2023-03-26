import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/UserContext";

export default function Navbar() {
    const { authenticated, logout } = useContext(Context)

    return (
        <nav class="yellow darken-2">
            <div class="container">
                <div class="nav-wrapper yellow darken-2">
                    <ul id="nav-mobile" class="left">
                        <li><Link to="/" class="white-text">Get a Pet</Link></li>

                        {authenticated ? (
                            <>
                                <li><Link class="white-text" to="/user/profile">Perfil</Link></li>
                                <li><Link class="white-text" to="/pet/mypets">Meus pets</Link></li>
                                <li><Link class="white-text" to="/pet/myadoptions">Minhas adoções</Link></li>
                                <li onClick={logout}><Link class="white-text" to="/">Sair</Link></li>             
                            </>
                        ) : (
                            <>
                                <li><Link class="white-text" to="/register">Registrar</Link></li>
                                <li><Link class="white-text" to="/login">Logar</Link></li>
                            </> 
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}