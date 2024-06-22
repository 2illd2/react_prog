// react-dependencies
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import axios from "axios"

// project-component's imports

// project's styles/img
import './form.scss'


export const Form = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({mode: 'onBlur'})

    const onSubmit = (data) => {
        console.log(data)
        reset()
        setSearchParams('done')
    }


    const sendForm = async () => {

        let formData = new FormData(this)

        return axios({
            url: 'mailer.php',
            method: 'post',
            data: formData,
        }).then(async (response) => {
            if (response.ok) {
                alert('Форма отправлена успешно!')
                return await response.text()
            } else {
                alert('Ошибка отправки!')
                this.reset()
            }
        })
    }


    return(
        <form id="form" className="form" method="post" 
              onSubmit={() => {
                  handleSubmit(onSubmit)
                  sendForm()
                }
            }
        >

            <div className="form__group">
                <label htmlFor="input-1" className="form__label">Имя</label>
                <input className="form__input" id="input-1" type="text" placeholder="Иван"
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
                <label htmlFor="input-2" className="form__label">Фамилия</label>
                <input className="form__input" id="input-2" type="text" placeholder="Иванов"
                    {
                        ...register('email', {
                            required: 'Напишите фамилию, пожалуйста',
                            pattern: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
                        })
                    }
                />
                {errors?.email && <span className="form__error">{errors?.email?.message}</span>}
            </div>


            <div className="form__group">
                <label htmlFor="input-3" className="form__label">Комментарий:</label>
                <textarea className="form__textarea" id="input-3" placeholder="Хочу рассказать о.."/>
            </div>


            <button className="form__btn btn" type="submit">GO</button>
        </form>
    )
}