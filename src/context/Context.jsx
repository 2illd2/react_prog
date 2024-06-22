// react-dependencies
import { createContext, useEffect, useState } from "react"
import { getPageDataCards } from "../data/getDataCards"

// project-component's imports
import {cartData} from './cartData'

// project's styles/img



// Создаём КОНТЕКСТ
export const Context = createContext()


export const MainContext = (props) => {


    // Корзина
    
    // Делаем новый Объект, с отслеживанием кол-ва товаров по ID  -   1-0, 2-0, 3-0, 4-0..  ^  если добавляем товар будет 1-1, 2-5, 3-0..
    function cartStorage(){
        let cart = {}
        cartData.forEach(item => {
            cart[item.id] = 0
        });

        return cart;
    }
    
    // Записываем этот объект в новый State и пишем Функции добавления/удаления/подсчёта суммы
    const [cartMain, setCartMain] = useState(cartStorage())

    const addToCart = (cartId) => {
        setCartMain((prev) => ({
            ...prev, 
            [cartId]: prev[cartId] + 1
        }))
    }
    const removeFromCart = (cartId) => {
        setCartMain((prev) => ({
            ...prev, 
            [cartId]: prev[cartId] - 1
        }))
    }
    const removeCompletelyFromCart = (cartId) => {
        setCartMain((prev) => ({
            ...prev, 
            [cartId]: prev[cartId] - prev[cartId]
        }))
    }
    const addArbitraryCout = (count, cartId) => {
        setCartMain((prev) => ({
            ...prev,
            [cartId]: count
        }))
    } 
    const getTotalPrice = () => {
        let totalPrice = 0
        for(let item in cartMain){
            if(cartMain[item] > 0){
                let element = cartData.find((product) => product.id == +item)
                totalPrice += cartMain[item] * parseInt(element.price)
            }
        }
        return totalPrice
    }


    // Избранное
    function favoritesStorage(){
        let favorites = {}
        cartData.forEach((item) => {
            favorites[item.id] = 0
        })
        return favorites
    }

    const [favoritesMain, setFavoritesMain] = useState(favoritesStorage())

    const addToFavorites = (favoritesId) => {
        setFavoritesMain((prev) => ({
            ...prev, 
            [favoritesId]: prev[favoritesId] + 1
        }))
    }
    const removeFromFavorites = (favoritesId) => {
        setFavoritesMain((prev) => ({
            ...prev, 
            [favoritesId]: prev[favoritesId] - 1
        }))
    }



    const ContextValues = {
        cartMain,
        addToCart,
        removeFromCart,
        removeCompletelyFromCart,
        addArbitraryCout,
        getTotalPrice,

        favoritesMain,
        addToFavorites,
        removeFromFavorites
    }



    return(
        <Context.Provider value={ContextValues}>
            {props.children} 
        </Context.Provider>
    )
    // *props.children - дочерние элементы Компонента(элементы внутри тегов этого Компонента)
} 