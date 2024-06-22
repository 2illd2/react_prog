// react-dependencies
import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

// project-component's imports
import { Context } from "../../context/Context"
import { FavoritesItem } from "../../components/FavoritesItem/FavoritesItem"  // 1 item в избранном
import { cartData } from "../../context/cartData" // статичный массив объектов карточек

// project's styles/img
import './favorites.scss'


export const Favorites = () => {

    const {favoritesMain} = useContext(Context)

    let sum = 0
    for(let f in favoritesMain){
        sum+=favoritesMain[f]
    }

    const navigate = useNavigate()
    useEffect(() => {
        if(sum == 0){
            setTimeout(() => {
                navigate('/', {replace: false})
            }, 3500)
        }
    }, [sum])


    return (

        sum == 0
                    ?
        <main>
            <motion.div 
                className="page-animation"
                initial={{scale: 1}}
                animate={{scale: 0, opacity: .5, borderRadius: "50%"}}
                exit={{scale: 1}}
                transition={{duration: 2, type: "spring"}}
            ></motion.div>
            <h2 className="cart-empty-title">
                У вас нет товаров в Избранном! Перенаправляем вас на главную страницу...
            </h2>            
        </main>
                    :
        <main>
            <motion.div 
                className="page-animation"
                initial={{scale: 1}}
                animate={{scale: 0, opacity: .5, borderRadius: "50%"}}
                exit={{scale: 1}}
                transition={{duration: 2, type: "spring"}}
            ></motion.div>
            <section className="cart">
                <div className="container">
                    <div className="cart__body">

                        <h1 className="section-title">Избранное</h1>

                        <ul className="cart__list">
                            {
                                cartData.map((card) => {
                                    if (favoritesMain[card.id] !== 0){
                                        return <FavoritesItem data={card}/>
                                    }
                                })
                            }
                        </ul>

                    </div>
                </div>
            </section>
        </main>
  )
}
