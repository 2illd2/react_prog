import { Outlet } from "react-router-dom";
import { lazy } from "react";
import { Preloader } from "../data/Preloader";
const Header = lazy( () => import('./Header/Header'))  // Динамические импорты Компонентов для lazy-loading
const Footer = lazy( () => import('./Footer/Footer'))

const Layout = ({setFilterCardsText, startTitleTransition}) => {
  return (
    <div className="wrapper">
        <Header setFilterCardsText={setFilterCardsText} startTitleTransition={startTitleTransition}/>
            <Outlet />
        <Footer />
    </div>
  )
};
  
export default Layout;