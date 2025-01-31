// react-dependencies
import { useState, useContext, useRef } from "react";
import { NavLink, useSearchParams, useLocation } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion";
import { listVariants, itemVariants } from "./FramerMotionVariants";
import { Context } from '../../context/Context'

// project-component's imports

// project's styles/img
import './header.scss';
import { Badge } from "@mui/material";


const Header = ({setFilterCardsText, startTitleTransition}) => {

    const [searchFlag, setSearchFlag] = useState(false)
    const searchRef = useRef()
    function changeSearchFlag(){
        setSearchFlag(() => !searchFlag)
        searchRef.current.focus()
    }


    const [searchFieldParams, setSearchFieldParams] = useSearchParams()
    

    // Функция фильтрации карточек
    function filterCards(text){
        startTitleTransition(() => setFilterCardsText(() => text))
        setSearchFieldParams(text)
    }

    // чтобы поиск был только в каталоге
    const location = useLocation()

    // Для бейджа
    const {cartMain} = useContext(Context)
    let bageSum = 0;
    for(let i in cartMain){
        bageSum += cartMain[i]
    }

    // Анимация progress-line на FrameMotion через хук useTransform()
    const {scrollYProgress} = useScroll()
    const background = useTransform(
        scrollYProgress,
        [0, 1],
        ['rgba(67, 98, 255)', 'rgba(226, 121, 255)']
    )

    return(
        <header className="header">
            <motion.div 
                    className="progress-line"
                    style={{
                        position: "fixed",
                        top: 0,
                        transformOrigin: 'left',
                        width: "100%",
                        height: "8px",
                        borderRadius: "50px",
                        
                        scaleX: scrollYProgress,
                        background,
                    }}
                >
            </motion.div>
            <div className="container">
                <div className="header__menu">


                    <div className="header__left">
                        <motion.svg width="116" height="27" viewBox="0 0 116 27" fill="none" 
                            className="logo"
                            initial={{x: -30, opacity: 0}}
                            animate={{x: 0, opacity: 1}}
                            transition={{
                                duration: 1.5,
                                delay: .3,
                                type: "spring"
                            }}
                        >
                            <g clip-path="url(#clip0_46_26129)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.8619 22.5344C11.6945 22.5344 10.5781 22.3138 9.55404 21.9102L5.87842 24.3015C7.88879 25.6047 10.2877 26.3609 12.8619 26.3609C17.6219 26.3609 21.7785 23.7753 24.0019 19.9319L20.6884 18.0177C19.125 20.7183 16.2056 22.5344 12.8619 22.5344Z" fill="#1572D3"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.27734 3.92239L8.06235 13.5009L4.27734 23.0776L10.2538 19.1888L19.0006 13.5009L10.2538 7.81114L4.27734 3.92239Z" fill="#1572D3"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.8618 4.46554C16.2056 4.46554 19.1249 6.28167 20.6883 8.98229L24.0019 7.0681C21.7765 3.22462 17.6219 0.639038 12.8618 0.639038C10.2857 0.639038 7.88872 1.39529 5.87646 2.69845L9.55398 5.08978C10.578 4.6862 11.6926 4.46554 12.8618 4.46554Z" fill="#1572D3"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.82885 21.5481L4.58274 17.1238L6.0198 13.499L4.58274 9.87621L2.82885 5.45187C1.05988 7.65461 0 10.4533 0 13.5009C0 16.5467 1.05988 19.3454 2.82885 21.5481Z" fill="#1572D3"/>
                            </g>
                            <path d="M38.864 19L36.4 14.648H35.344V19H33.104V7.832H37.296C38.16 7.832 38.896 7.98667 39.504 8.296C40.112 8.59467 40.5653 9.00533 40.864 9.528C41.1733 10.04 41.328 10.616 41.328 11.256C41.328 11.992 41.1147 12.6587 40.688 13.256C40.2613 13.8427 39.6267 14.248 38.784 14.472L41.456 19H38.864ZM35.344 12.968H37.216C37.824 12.968 38.2773 12.824 38.576 12.536C38.8747 12.2373 39.024 11.8267 39.024 11.304C39.024 10.792 38.8747 10.3973 38.576 10.12C38.2773 9.832 37.824 9.688 37.216 9.688H35.344V12.968ZM45.594 9.64V12.44H49.354V14.216H45.594V17.176H49.834V19H43.354V7.816H49.834V9.64H45.594ZM61.4216 19H59.1816L54.1096 11.336V19H51.8696V7.816H54.1096L59.1816 15.496V7.816H61.4216V19ZM71.2353 7.832V9.64H68.2593V19H66.0193V9.64H63.0433V7.832H71.2353ZM72.3256 13.4C72.3256 12.3013 72.571 11.32 73.0616 10.456C73.563 9.58133 74.2403 8.904 75.0936 8.424C75.9576 7.93333 76.923 7.688 77.9896 7.688C79.2376 7.688 80.331 8.008 81.2696 8.648C82.2083 9.288 82.8643 10.1733 83.2376 11.304H80.6616C80.4056 10.7707 80.043 10.3707 79.5736 10.104C79.115 9.83733 78.5816 9.704 77.9736 9.704C77.323 9.704 76.7416 9.85867 76.2296 10.168C75.7283 10.4667 75.3336 10.8933 75.0456 11.448C74.7683 12.0027 74.6296 12.6533 74.6296 13.4C74.6296 14.136 74.7683 14.7867 75.0456 15.352C75.3336 15.9067 75.7283 16.3387 76.2296 16.648C76.7416 16.9467 77.323 17.096 77.9736 17.096C78.5816 17.096 79.115 16.9627 79.5736 16.696C80.043 16.4187 80.4056 16.0133 80.6616 15.48H83.2376C82.8643 16.6213 82.2083 17.512 81.2696 18.152C80.3416 18.7813 79.2483 19.096 77.9896 19.096C76.923 19.096 75.9576 18.856 75.0936 18.376C74.2403 17.8853 73.563 17.208 73.0616 16.344C72.571 15.48 72.3256 14.4987 72.3256 13.4ZM91.9989 16.872H87.5509L86.8149 19H84.4629L88.4789 7.816H91.0869L95.1029 19H92.7349L91.9989 16.872ZM91.3909 15.08L89.7749 10.408L88.1589 15.08H91.3909ZM102.364 19L99.9 14.648H98.844V19H96.604V7.832H100.796C101.66 7.832 102.396 7.98667 103.004 8.296C103.612 8.59467 104.065 9.00533 104.364 9.528C104.673 10.04 104.828 10.616 104.828 11.256C104.828 11.992 104.615 12.6587 104.188 13.256C103.761 13.8427 103.127 14.248 102.284 14.472L104.956 19H102.364ZM98.844 12.968H100.716C101.324 12.968 101.777 12.824 102.076 12.536C102.375 12.2373 102.524 11.8267 102.524 11.304C102.524 10.792 102.375 10.3973 102.076 10.12C101.777 9.832 101.324 9.688 100.716 9.688H98.844V12.968ZM110.71 19.112C109.931 19.112 109.227 18.9787 108.598 18.712C107.979 18.4453 107.489 18.0613 107.126 17.56C106.763 17.0587 106.577 16.4667 106.566 15.784H108.966C108.998 16.2427 109.158 16.6053 109.446 16.872C109.745 17.1387 110.15 17.272 110.662 17.272C111.185 17.272 111.595 17.1493 111.894 16.904C112.193 16.648 112.342 16.3173 112.342 15.912C112.342 15.5813 112.241 15.3093 112.038 15.096C111.835 14.8827 111.579 14.7173 111.27 14.6C110.971 14.472 110.555 14.3333 110.022 14.184C109.297 13.9707 108.705 13.7627 108.246 13.56C107.798 13.3467 107.409 13.032 107.078 12.616C106.758 12.1893 106.598 11.624 106.598 10.92C106.598 10.2587 106.763 9.68267 107.094 9.192C107.425 8.70133 107.889 8.328 108.486 8.072C109.083 7.80533 109.766 7.672 110.534 7.672C111.686 7.672 112.619 7.95467 113.334 8.52C114.059 9.07467 114.459 9.85333 114.534 10.856H112.07C112.049 10.472 111.883 10.1573 111.574 9.912C111.275 9.656 110.875 9.528 110.374 9.528C109.937 9.528 109.585 9.64 109.318 9.864C109.062 10.088 108.934 10.4133 108.934 10.84C108.934 11.1387 109.03 11.3893 109.222 11.592C109.425 11.784 109.67 11.944 109.958 12.072C110.257 12.1893 110.673 12.328 111.206 12.488C111.931 12.7013 112.523 12.9147 112.982 13.128C113.441 13.3413 113.835 13.6613 114.166 14.088C114.497 14.5147 114.662 15.0747 114.662 15.768C114.662 16.3653 114.507 16.92 114.198 17.432C113.889 17.944 113.435 18.3547 112.838 18.664C112.241 18.9627 111.531 19.112 110.71 19.112Z" fill="#1572D3"/>
                            <defs>
                            <clipPath id="clip0_46_26129">
                            <rect width="24" height="25.7219" fill="white" transform="translate(0 0.639038)"/>
                            </clipPath>
                            </defs>
                        </motion.svg>



                        <nav className="header__nav">
                            <motion.ul className="header__nav-list" variants={listVariants} initial="hidden" animate="visible">
                                <motion.li className="header__nav-li" variants={itemVariants}><NavLink to="/">Главная</NavLink></motion.li>
                                <motion.li className="header__nav-li" variants={itemVariants}><NavLink to="/catalog">Каталог</NavLink></motion.li>
                                <motion.li className="header__nav-li" variants={itemVariants}><NavLink to="/order">Заказ</NavLink></motion.li>
                                <motion.li className="header__nav-li" variants={itemVariants}><NavLink to="/favorites">Избранное</NavLink></motion.li>
                            </motion.ul>
                        </nav>
                    </div>

                    <div className="header__options">

                        {
                            location.pathname == '/catalog'  
                                                            ?  
                            <div className="search-box">
                                <a className="search-btn" href="#!" onClick={changeSearchFlag}>
                                    <svg width={'32px'} fill="#000" version="1.1" viewBox="0 0 488.4 488.4">
                                        <g>
                                            <g>
                                                <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6    s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2    S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7    S381.9,104.65,381.9,203.25z"/>
                                            </g>
                                        </g>
                                    </svg>
                                </a>
                                <input className={searchFlag ? 'search-txt active' : 'search-txt'} type="text" name="" 
                                    onChange={(e) => filterCards(e.target.value)}  
                                    ref={searchRef}
                                />
                            </div> 
                                                            :
                            null
                        }
                <Badge color="secondary" badgeContent={bageSum}>  
                        <NavLink to='/cart' className="basket">
                            <svg xmlns="http://www.w3.org/2000/svg" width={'32px'} version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 33 33" fill="#000">
                                <g>
                                <path d="M28.313,33H4.688c-0.137,0-0.268-0.056-0.362-0.155c-0.094-0.099-0.144-0.232-0.138-0.369L5.313,8.851   c0.013-0.267,0.232-0.476,0.5-0.476h21.375c0.267,0,0.487,0.209,0.5,0.476l1.125,23.625c0.006,0.137-0.043,0.27-0.138,0.369   C28.58,32.944,28.449,33,28.313,33z M5.212,32h22.576L26.711,9.375H6.289L5.212,32z"/>
                                <path d="M21.905,11.375c-0.276,0-0.5-0.224-0.5-0.5v-4.97C21.405,3.201,19.205,1,16.5,1s-4.905,2.201-4.905,4.905v4.97   c0,0.276-0.224,0.5-0.5,0.5s-0.5-0.224-0.5-0.5v-4.97C10.595,2.649,13.244,0,16.5,0s5.905,2.649,5.905,5.905v4.97   C22.405,11.151,22.182,11.375,21.905,11.375z"/>
                                </g>
                            </svg>
                        </NavLink>
                </Badge>
                    </div>


                </div>
            </div>

        </header>
    )
}

export default Header;
