// react-dependencies
import { useState, useEffect, useTransition, useContext } from "react"
import { NavLink } from "react-router-dom"
import axios from "axios" // для подгрузки карточек

// project-component's imports
import { getMainDataCards } from "../../data/getDataCards"
import { Context } from "../../context/Context"

import { useLocalStorage } from "../../hooks/useLocalStorage"

// project's styles/img
import { Preloader } from "../../data/Preloader"


export const MainCards = () => {

    const [isPending, setTransition] = useTransition()
    const [cards, getCards] = useState(0)
    useEffect(() => {
        setTransition(() => getMainDataCards()
            .then(
                response => getCards(response.data)
            )
            .catch(
                error => alert(error.status)
            ))
    }, [])


    // Подгрузка карточек
    const [count, getCount] = useState(6)
    function getAdditionalCards(){
        
      setTransition( () => {
        return axios({
            url: `http://localhost:3000/cards?_limit=${count + 3}`,
        }).then(
            response => getCards(response.data)
        ).then(
            getCount(() => count + 3)
        ).catch(
            error => alert(error.status)
        )}
      )
    }

    // отображение кол-ва добавленного в Корзину / добавление в Корзину + то же самое про Избранное
    const {cartMain, addToCart, favoritesMain, addToFavorites} = useContext(Context)


    const arrayData = Array.from(cards)
    const readyCards = arrayData.map((card) => {
        let [img, title, info, price, id] = [card.img, card.title, card.info, card.price, card.id]
        const cartCount = cartMain[id]
        return(
            isPending ? <Preloader /> :
                <li 
                    className="cards__li"
                    key={id}
                    id={id}
                    >
                        <img src={img} alt="" />
                    <NavLink to={`/one-card/${id}`} className="cards__title">
                        {title}
                    </NavLink>
                        <p>{info}</p>
                        <div className="card__li-options">
                            <span className="cards__price">{price}$</span>
                            <a href="#!" className="cards__basket btn" onClick={() => {
                                addToCart(id)
                            }}>
                                <svg width={'32px'} version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 33 33" fill="#000">
                                    <g>
                                    <path d="M28.313,33H4.688c-0.137,0-0.268-0.056-0.362-0.155c-0.094-0.099-0.144-0.232-0.138-0.369L5.313,8.851   c0.013-0.267,0.232-0.476,0.5-0.476h21.375c0.267,0,0.487,0.209,0.5,0.476l1.125,23.625c0.006,0.137-0.043,0.27-0.138,0.369   C28.58,32.944,28.449,33,28.313,33z M5.212,32h22.576L26.711,9.375H6.289L5.212,32z"/>
                                    <path d="M21.905,11.375c-0.276,0-0.5-0.224-0.5-0.5v-4.97C21.405,3.201,19.205,1,16.5,1s-4.905,2.201-4.905,4.905v4.97   c0,0.276-0.224,0.5-0.5,0.5s-0.5-0.224-0.5-0.5v-4.97C10.595,2.649,13.244,0,16.5,0s5.905,2.649,5.905,5.905v4.97   C22.405,11.151,22.182,11.375,21.905,11.375z"/>
                                    </g>
                                </svg>
                                {cartCount > 0  &&  <span className='card__li-count'>({cartCount})</span>}
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
    })

    return(
        <ul className="cards__list">

            {readyCards}

            <button className="cards__loading-btn btn" onClick={() => getAdditionalCards()}>
                Загрузить
            </button>
        </ul>
    )
}