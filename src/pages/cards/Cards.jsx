// react-dependencies
import { useState, useEffect, useTransition, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

// project-component's imports
import { getPageDataCards, sortCardsByPrice__DEC, sortCardsByPrice__INC, sortCardsByCountry__Germany, sortCardsByCountry__USA } from '../../data/getDataCards'
import { Preloader } from '../../data/Preloader'

import { Context } from '../../context/Context'


// project's styles/img
import './cards.scss'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export const Cards = ({filterCardsText, isTitlePending}) => {

    const [allCards, setAllCards] = useState(0)
    const [allCardsPending, setAllCardsTransition] = useTransition()
    useEffect( () => {
        setAllCardsTransition( () => getPageDataCards()
            .then(
                response => setAllCards(response.data)
            )
            .catch(
                error => alert(error.status)
            )
        )
    }, [])


    // state и функция его изменения для MUI(менюшка)
    const [open, setOpen] = useState(false)
    function openFlag(){
        setOpen(!open)
    }
    // ФУНКЦИИ СОРТИРОВКИ:
    const sortInc = () => {   // 1)СОРТИРОВКА по возрастанию через ЗАПРОС
        setAllCardsTransition( () => {
                sortCardsByPrice__INC()
                    .then(
                        response => setAllCards(response.data)
                    )
                    .catch(
                        error => alert(error.status)
                    )
            }
        )
    }
    const sortDec = () => {   // 2)СОРТИРОВКА по убыванию через ЗАПРОС
        setAllCardsTransition( () => {
            sortCardsByPrice__DEC()
                    .then(
                        response => setAllCards(response.data)
                    )
                    .catch(
                        error => alert(error.status)
                    )
            }
        )
    }
    const sortByGermany = () => {   // 3)СОРТИРОВКА по стране через ЗАПРОС
        setAllCardsTransition( () => {
            sortCardsByCountry__Germany()
                    .then(
                        response => setAllCards(response.data)
                    )
                    .catch(
                        error => alert(error.status)
                    )
            }
        )
    }
    const sortByUSA = () => {   // 4)СОРТИРОВКА по стране через ЗАПРОС
        setAllCardsTransition( () => {
            sortCardsByCountry__USA()
                    .then(
                        response => setAllCards(response.data)
                    )
                    .catch(
                        error => alert(error.status)
                    )
            }
        )
    }
    const noSort = () => {   // 5) БЕЗ СОРТИРОВКИ
        setAllCardsTransition( () => getPageDataCards()
            .then(
                response => setAllCards(response.data)
            )
            .catch(
                error => alert(error.status)
            )
        )
    }


    // отображение кол-ва добавленного в корзину / добавление в корзину
    const {cartMain, addToCart, favoritesMain, addToFavorites} = useContext(Context)
    

    const cardsArray = Array.from(allCards)
    // const cardsArray__SORT_INC = cardsArray.sort((a,b) => a.price - b.price)  ЭТО СОРТИРОВКА НА Front-e, методом .sort()
    // const cardsArray__SORT_DEC = cardsArray.sort((a,b) => b.price - a.price)  Но мы делаем сортировку на беке, через запросы(json-server)
    const allCardsData = cardsArray.map((card) => {
        let [img, title, info, price, country, id] = [card.img, card.title, card.info, card.price, card.made, card.id]

        const cardCount = cartMain[id]

        if(!filterCardsText){  // Если в поиск ничего не введено - показываем стандартный набор из 20 товаров
            return(
                <li 
                    className="card__li"
                    key={id}
                    >
                        <img src={img} alt="" />
                    <NavLink to={`/one-card/${id}`} className="card__title">
                        {title}
                    </NavLink>
                        <span className="card__country">{country}</span>
                        <p>{info}</p>
                        <div className="card__li-options">
                            <span className="card__price">{price}$</span>
                            <a href="#!" className="card__basket btn" onClick={() => {
                                addToCart(id)
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={'32px'} version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 33 33" fill="#000">
                                    <g>
                                    <path d="M28.313,33H4.688c-0.137,0-0.268-0.056-0.362-0.155c-0.094-0.099-0.144-0.232-0.138-0.369L5.313,8.851   c0.013-0.267,0.232-0.476,0.5-0.476h21.375c0.267,0,0.487,0.209,0.5,0.476l1.125,23.625c0.006,0.137-0.043,0.27-0.138,0.369   C28.58,32.944,28.449,33,28.313,33z M5.212,32h22.576L26.711,9.375H6.289L5.212,32z"/>
                                    <path d="M21.905,11.375c-0.276,0-0.5-0.224-0.5-0.5v-4.97C21.405,3.201,19.205,1,16.5,1s-4.905,2.201-4.905,4.905v4.97   c0,0.276-0.224,0.5-0.5,0.5s-0.5-0.224-0.5-0.5v-4.97C10.595,2.649,13.244,0,16.5,0s5.905,2.649,5.905,5.905v4.97   C22.405,11.151,22.182,11.375,21.905,11.375z"/>
                                    </g>
                                </svg>
                                {cardCount > 0  &&  <span className='card__li-count'>({cardCount})</span>}
                            </a>
                        </div>
                        <svg width={'64px'} height={'64px'} version="1.1" viewBox="0 0 512 512"
                             onClick={() => {
                                addToFavorites(id)
                             }}
                             className={favoritesMain[id] > 0 ? 'heart active' : 'heart'}
                        >
                            <path d="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9  c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8  c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8  c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"/>
                        </svg>
                </li>
            )
        } else{  // А если в поиск что-то ввели - показываем ТОЛЬКО товары, чьи title - сходятся с введённым в поиск текстом 

            if(title.toLowerCase().includes(filterCardsText.toLowerCase())){
                return(
                        <li 
                            className="card__li"
                            key={id}
                            >
                                <img src={img} alt="" />
                            <NavLink to={`/one-card/${id}`} className="card__title">
                                {title}
                            </NavLink>
                                <span className="card__country">{country}</span>
                                <p>{info}</p>
                                <div className="card__li-options">
                                    <span className="card__price">{price}</span>
                                    <a href="#!" className="card__basket btn" onClick={() => {
                                        addToCart(id)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={'32px'} version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 33 33" fill="#000">
                                            <g>
                                            <path d="M28.313,33H4.688c-0.137,0-0.268-0.056-0.362-0.155c-0.094-0.099-0.144-0.232-0.138-0.369L5.313,8.851   c0.013-0.267,0.232-0.476,0.5-0.476h21.375c0.267,0,0.487,0.209,0.5,0.476l1.125,23.625c0.006,0.137-0.043,0.27-0.138,0.369   C28.58,32.944,28.449,33,28.313,33z M5.212,32h22.576L26.711,9.375H6.289L5.212,32z"/>
                                            <path d="M21.905,11.375c-0.276,0-0.5-0.224-0.5-0.5v-4.97C21.405,3.201,19.205,1,16.5,1s-4.905,2.201-4.905,4.905v4.97   c0,0.276-0.224,0.5-0.5,0.5s-0.5-0.224-0.5-0.5v-4.97C10.595,2.649,13.244,0,16.5,0s5.905,2.649,5.905,5.905v4.97   C22.405,11.151,22.182,11.375,21.905,11.375z"/>
                                            </g>
                                        </svg>
                                        {cardCount > 0  &&  <span className='card__li-count'>({cardCount})</span>}
                                    </a>
                                </div>
                                <svg width={'64px'} height={'64px'} version="1.1" viewBox="0 0 512 512"
                                    onClick={() => {
                                        addToFavorites(id)
                                    }}
                                    className={favoritesMain[id] > 0 ? 'heart-active' : null}
                                >
                                    <path d="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9  c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8  c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8  c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"/>
                                </svg>
                        </li>
                )
            }

        }

    })


    return(

        allCardsPending
                        ?
        <Preloader />
                        :
        isTitlePending 
                        ?
        <Preloader />   
                        :
        <main className="main">
            <motion.div 
                className="page-animation"
                initial={{scale: 1}}
                animate={{scale: 0, opacity: .5, borderRadius: "50%"}}
                exit={{scale: 1}}
                transition={{duration: 2, type: "spring"}}
            >
            </motion.div>
            <section className="all-cards">
                <div className="container">
                    <div className="all-cards__body">
                        <h1 className="section-title">Каталог</h1>
                        <div className='filters'>
                            <Button
                                className='filters__btn'
                                onClick={openFlag}
                            >
                                <svg fill="none" height="50" viewBox="0 0 28 28" width="50" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M4.40675 7.25H3C2.44772 7.25 2 6.80228 2 6.25C2 5.69772 2.44772 5.25 3 5.25H4.40675C4.82853 3.94437 6.05398 3 7.5 3C8.94602 3 10.1715 3.94437 10.5933 5.25H25C25.5523 5.25 26 5.69772 26 6.25C26 6.80228 25.5523 7.25 25 7.25H10.5933C10.1715 8.55563 8.94602 9.5 7.5 9.5C6.05398 9.5 4.82853 8.55563 4.40675 7.25ZM5.75 6.25C5.75 5.2835 6.5335 4.5 7.5 4.5C8.4665 4.5 9.25 5.2835 9.25 6.25C9.25 7.2165 8.4665 8 7.5 8C6.5335 8 5.75 7.2165 5.75 6.25Z" fill="#ffcbcb" fill-rule="evenodd"/><path clip-rule="evenodd" d="M3 15.25H17.4458C17.8676 16.5556 19.093 17.5 20.5391 17.5C21.9851 17.5 23.2105 16.5556 23.6323 15.25H25C25.5523 15.25 26 14.8023 26 14.25C26 13.6977 25.5523 13.25 25 13.25H23.6323C23.2105 11.9444 21.9851 11 20.5391 11C19.093 11 17.8676 11.9444 17.4458 13.25H3C2.44772 13.25 2 13.6977 2 14.25C2 14.8023 2.44772 15.25 3 15.25ZM20.5391 12.5C19.5726 12.5 18.7891 13.2835 18.7891 14.25C18.7891 15.2165 19.5726 16 20.5391 16C21.5056 16 22.2891 15.2165 22.2891 14.25C22.2891 13.2835 21.5056 12.5 20.5391 12.5Z" fill="#ffcbcb" fill-rule="evenodd"/><path clip-rule="evenodd" d="M10.4067 23.25H3C2.44772 23.25 2 22.8023 2 22.25C2 21.6977 2.44772 21.25 3 21.25H10.4067C10.8285 19.9444 12.054 19 13.5 19C14.946 19 16.1715 19.9444 16.5933 21.25H25C25.5523 21.25 26 21.6977 26 22.25C26 22.8023 25.5523 23.25 25 23.25H16.5933C16.1715 24.5556 14.946 25.5 13.5 25.5C12.054 25.5 10.8285 24.5556 10.4067 23.25ZM11.75 22.25C11.75 21.2835 12.5335 20.5 13.5 20.5C14.4665 20.5 15.25 21.2835 15.25 22.25C15.25 23.2165 14.4665 24 13.5 24C12.5335 24 11.75 23.2165 11.75 22.25Z" fill="#ffcbcb"/></svg>
                            </Button>
                            <Menu
                                className='filters__menu'
                                open={open}
                                onClick={openFlag}
                            >
                                <MenuItem 
                                    onClick={() => {
                                        openFlag()
                                        sortInc()
                                    }} 
                                    className='filters__item'>
                                    По цене(возрастание)
                                </MenuItem>
                                <MenuItem 
                                    onClick={() => {
                                        openFlag()
                                        sortDec()
                                    }} 
                                    className='filters__item'>
                                    По цене(убывание)
                                </MenuItem>
                                <MenuItem 
                                    onClick={() => {
                                        openFlag()
                                        sortByGermany()
                                    }} 
                                    className='filters__item'>
                                    Производство(Германия)
                                </MenuItem>
                                <MenuItem 
                                    onClick={() => {
                                        openFlag()
                                        sortByUSA()
                                    }} 
                                    className='filters__item'>
                                    Производство(США)
                                </MenuItem>
                                <MenuItem 
                                    onClick={() => {
                                        openFlag()
                                        noSort()
                                    }} 
                                    className='filters__item'>
                                    Все
                                </MenuItem>
                            </Menu>
                        </div>
                        <ul className="cards__list-page">
                            {allCardsData}
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    )
}