// React-dependencies
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Fragment, lazy, useState, useTransition } from 'react';
import { AnimatePresence } from 'framer-motion';

// Pages
import { Main } from "./pages/main/Main";
import { Cards } from './pages/cards/Cards';
import { OneCard } from './pages/oneCard/OneCard';
import { Cart } from './pages/cart/Cart';
import { Order } from './pages/order/Order';
import { Favorites } from './pages/favorites/Favorites';

import { MainContext } from './context/Context';

// Components
import Layout from './components/Layout';


const App = () => {

    // state-lifting for cards's filtering (Header/Main)
    const [filterCardsText, setFilterCardsText] = useState('')
    const [isTitlePending, startTitleTransition] = useTransition()


    const router = createBrowserRouter(
        createRoutesFromElements(
            
            <Route 
                path="/" 
                element={<Layout setFilterCardsText={setFilterCardsText} startTitleTransition={startTitleTransition} />} 
            >
                <Route 
                    index
                    element={<Main />} 
                /> 

                <Route 
                    path="catalog" 
                    element={<Cards filterCardsText={filterCardsText} isTitlePending={isTitlePending} />} 
                /> 
                <Route 
                    path="one-card/:id" 
                    element={<OneCard />} 
                /> 
                <Route 
                    path="cart" 
                    element={<Cart />} 
                /> 
                <Route 
                    path="favorites" 
                    element={<Favorites />} 
                /> 

                <Route 
                    path="order" 
                    element={<Order />} 
                /> 

            </Route> 
            

        )
      )


    return (
        <AnimatePresence mode="wait">
            <MainContext>
                <RouterProvider router={router} />
            </MainContext>
        </AnimatePresence>
    )
}

export default App; 
