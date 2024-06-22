// react-dependencies
import { useState, useEffect, useContext } from 'react'
import { motion } from "framer-motion"

// project-component's imports
import { MainCards } from '../../components/MainCards/MainCards'
import { Form } from '../../components/Form/Form'

// project's styles/img
import './main.scss'
import bigCar from './resource/bigCar.png'



export const Main = () => {


    return(
        <main>
            <motion.div 
                className="page-animation"
                initial={{scale: 1}}
                animate={{scale: 0, opacity: .5, borderRadius: "50%"}}
                exit={{scale: 1}}
                transition={{duration: 2, type: "spring"}}
            ></motion.div>
            <section className="layout">
                <div className="container">

                    <div className="layout__body">

                        <div className="layout__text">
                            <h1>Найдите, забронируйте и арендуйте <span>легко</span></h1>
                            <p>Возьмите машину в любом месте и в любое время, когда вам это нужно)</p>
                        </div>

                        <img src={bigCar} alt="" className="layout__img" />

                    </div>

                </div>
            </section>


            <section className="cards">
                <div className="container">
                    <div className="cards__body">

                        <h1 className="cards__title section-title">
                            Наши машины
                        </h1>

                        <MainCards />

                    </div>
                </div>
            </section>


            <section className="form-main">
                <div className="container">

                    <h1 className="form__title section-title">
                        Подпишитесь на обновления!
                    </h1>

                    <Form />

                </div>
            </section>


        </main>
    )
} 