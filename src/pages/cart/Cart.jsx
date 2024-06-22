// react-dependencies
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

// project-component's imports
import { Context } from "../../context/Context"
import { CartItem } from "../../components/CartItem/CartItem"  // 1 item в корзине
import { cartData } from "../../context/cartData" // статичный массив объектов карточек

import { useLocalStorage } from "../../hooks/useLocalStorage"

// project's styles/img
import './cart.scss'


export const Cart = () => {

    const {cartMain, getTotalPrice} = useContext(Context)  // State кол-ва карточек по id (1-0, 2-100, 3-0, 4-0..)

    // делаем переадресацию на главную страницу, если корзина пуста
    let sum = 0;
    for(let i in cartMain){
        sum += cartMain[i]
    }
    const navigate = useNavigate()

    useEffect(() => {
        if(sum == 0){
            setTimeout(() => {
                navigate('/', {replace: false})
            }, 3500)
        }
    }, [sum])


    // объявляем функцию подсчёта всей стоимости
    const total = getTotalPrice()

    // надо сделать рендер корзины через localStorage, но пояему то при заходе на страницу корзины - он обнуляется
    const [storageState] = useLocalStorage()
    

    return(

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
                Ваша корзина пуста! Перенаправляем вас на главную страницу...
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

                        <h1 className="section-title">Корзина</h1>

                        <ul className="cart__list">
                            {
                                cartData.map((card) => {
                                    if (cartMain[card.id] !== 0){
                                        return <CartItem data={card}/>
                                    }
                                })
                            }
                        </ul>

                        {total > 0  ?  <h1 className="total-price">{total}$</h1>  :  null}

                    </div>
                </div>
            </section>
        </main>
    )
} 