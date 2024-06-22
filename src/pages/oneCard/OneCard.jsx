// react-dependencies
import { useState, useEffect, useTransition, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from "framer-motion"

// project-component's imports
import { getOneCard } from '../../data/getDataCards'
import { Preloader } from '../../data/Preloader'

import { Context } from '../../context/Context'
import { useLocalStorage } from '../../hooks/useLocalStorage'

// project's styles/img
import './oneCard.scss'



export const OneCard = () => {

    const { id } = useParams()
    const [oneCardData, setOneCardData] = useState(0)
    const [oneCardsPending, setOneCardTransition] = useTransition()

    useEffect(() => {
        setOneCardTransition( () => getOneCard(id)
            .then(
                response => setOneCardData(response.data)
            )
            .catch(
                error => alert(error.status)
            ))
    }, [])
    
    // отображение кол-ва добавленного в корзину / добавление в корзину
    const {cartMain, addToCart, favoritesMain, addToFavorites} = useContext(Context)


    const oneCardArray = Array.from(oneCardData)
    const oneCard = oneCardArray.map((card) => {
        let [img, title, info, price, id] = [card.img, card.title, card.info, card.price, card.id]
        const cardCount = cartMain[id]
        return(
            oneCardsPending ? <Preloader /> :
                    <div className="one-card__block" key={id}>
                        <div className="one-card__img">
                            <img src={'/' + img} alt="" />
                        </div>
                        <div className="one-card__info">
                            <h2>{title}</h2>
                            <h3>{price}$</h3>
                            <p>{info}</p>

                            <a href="#!" className="one-card__btn btn" onClick={() => {
                                addToCart(id)
                            }}>
                                Добавить
                                {cardCount > 0  &&  <span className='card__li-count'>({cardCount})</span>}
                            </a>
                            <svg width={'64px'} height={'64px'} version="1.1" viewBox="0 0 512 512"
                             onClick={() => {
                                addToFavorites(id)
                             }}
                             className={favoritesMain[id] > 0 ? 'heart active' : 'heart'}
                            >
                                <path d="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9  c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8  c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8  c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"/>
                            </svg>
                        </div>
                    </div>
        )
    })


    return(
        <main className="main">
            <motion.div 
                className="page-animation"
                initial={{scale: 1}}
                animate={{scale: 0, opacity: .5, borderRadius: "50%"}}
                exit={{scale: 1}}
                transition={{duration: 2, type: "spring"}}
            >
            </motion.div>
            <section className='one-card'>
                <div className="container">
                    <div className="one-card__body">

                        {oneCard}

                    </div>
                </div>
            </section>
        </main>
    )
}