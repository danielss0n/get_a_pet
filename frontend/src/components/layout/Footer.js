import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <footer class="page-footer yellow darken-2" style={{"marginTop":"5%"}}>
            <div class="container">
                <div class="row">

                <div class="col l6 s12">
                    <h5 class="white-text">Footer Content</h5>
                    <p class="white-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
                </div>

                <div class="col l4 offset-l2 s12">
                    <h5 class="white-text">Links</h5>
                    
                    <ul>
                        <li><Link class="grey-text white-text" to="#">Link 1</Link></li>
                        <li><Link class="grey-text white-text" to="#">Link 1</Link></li>
                    </ul>
                </div>
                </div>
            </div>
                <div class="footer-copyright transparent">
                    <div class="container">
                    © 2023 Get a Pet
                </div>
            </div>
        </footer>
    );
}