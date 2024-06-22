import { useState, useEffect } from "react";
import { cartData } from "../context/cartData";

export const useLocalStorage = () => {
    

    const [storageState, setStorageState] = useState([])

    const setStorage = (id) => {
        let field = cartData.find((el) => el.id == id)
        setStorageState(prev => [...prev, field])
    }

    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(storageState))
    }, [storageState])

    return [setStorage, storageState]
}

