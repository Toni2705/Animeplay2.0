// Footer.js
import React from 'react';
import '../styles/footer.css';

function Footer({ fixed }) {
    return (
        <footer className={`footer ${fixed ? 'footer-fixed' : ''}`}>
            <div className="footer-content">
                <p>&copy; 2024 AnimePlay. Todos los derechos reservados.</p>
                <p>Desarrollado por AnimePlay Team</p>
                <p>
                    <a href="#">Términos y Condiciones</a> | 
                    <a href="#"> Política de Privacidad</a> | 
                    <a href="#"> Contacto</a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
