// react-dependencies
import { NavLink } from "react-router-dom"

// project-component's imports

// project's styles/img
import './footer.scss'
import logo from './resource/logo.png';


const Footer = () => {


    return(
        <footer className="footer">
            <div className="container">
                <div className="footer__body">


                    <ul className="footer__list">
                        <li className="header__nav-li"><NavLink to="/">Главная</NavLink></li>
                        <li className="header__nav-li"><NavLink to="/catalog">Каталог</NavLink></li>
                        <li className="header__nav-li"><NavLink to="/order">Заказ</NavLink></li>
                        <li className="header__nav-li"><NavLink to="/favorites">Избранное</NavLink></li>
                    </ul>


                </div>
            </div>
        </footer>
    )
}

export default Footer;