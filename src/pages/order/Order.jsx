// react-dependencies
import { useRef } from "react";
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion"
import emailjs from '@emailjs/browser';

// CONTEXT
import { useContext } from "react";
import { Context } from "../../context/Context";

// project-component's imports


// project's styles/img
import './order.scss'
import { useState } from "react";


export const Order = () => {


    const [searchParams, setSearchParams] = useSearchParams()

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({mode: 'onBlur'})

    // Подвязка с Email.js
    const form = useRef();
    const onSubmit = () => {
        
        emailjs
            .sendForm('service_re69tqa', 'template_html9em', form.current, {
                publicKey: 'imaGQuR0P15J34yyu',
            }).then(
                () => {
                    alert('Сообщение отправлено! Мы с вами свяжемся');
                },
                (error) => {
                    alert('Ошибка ', error.text);
                },
        )

        reset()
        setSearchParams('done')
      }
    const {getTotalPrice} = useContext(Context)
    const total = getTotalPrice()


    // Работа с ReCAPTCHA через 'react-google-recaptcha'
    const [captchaFlag, setCaptchaFlag] = useState(true)
    function onChange() {
        setCaptchaFlag(false)
    }

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
            <section className="f">
                <form id="form" ref={form} className="form" method="post" onSubmit={handleSubmit(onSubmit)}>

                    <div className="form__group">
                        <label htmlFor="input-1" className="form__label">ИМЯ</label>
                        <input className="form__input" id="input-1" type="text"
                            {
                                ...register('name', {
                                    required: 'Напишите имя, пожалуйста',
                                    minLength: {
                                        value: 2,
                                        message: 'Минимум 2 символа!'
                                    }
                                })
                            }
                        />
                        {errors?.name && <span className="form__error">{errors?.name?.message}</span>}
                        
                    </div>


                    <div className="form__group">
                        <label htmlFor="input-2" className="form__label">Адрес</label>
                        <input className="form__input" id="input-2" type="text"
                            {
                                ...register('adress', {
                                    required: 'Напишите адрес, пожалуйста',
                                })
                            }
                        />
                        {errors?.adress && <span className="form__error">{errors?.adress?.message}</span>}
                    </div>


                    <div className="form__group">
                        <label htmlFor="input-3" className="form__label">Способ оплаты</label>
                        <input className="form__input" id="input-3" type="text"
                            {
                                ...register('pay', {
                                    required: 'Напишите способ оплаты, пожалуйста',
                                })
                            }
                        />
                        {errors?.pay && <span className="form__error">{errors?.pay?.message}</span>}
                    </div>

                    <input type="hidden" name='totalPrice' value={total+'$'}/>

                    <ReCAPTCHA
                        sitekey="6Lf62PgpAAAAAFWynmojRIjYayGYdjrO2dU5eEGm"
                        onChange={onChange}
                        className="recaptcha"
                    />

                    <button 
                        className="form__btn btn" 
                        type="submit" 
                        disabled={captchaFlag}
                        >
                            GO
                        </button>
                </form>
            </section>
        </main>
    )
}
