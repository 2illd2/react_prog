// react-dependencies
import { useContext } from "react"
import { NavLink } from "react-router-dom"

// project-component's imports
import { CartContext } from "../../context/Context"

// project's styles/img
import './filterCardsPattern.scss'
import { Preloader } from "../../data/Preloader"


export const FilterCardsPattern = ({filterState, filterCardsText, isTitlePending}) => {

    const {cartMain, addToCart} = useContext(CartContext)

    let titleCardsArray = []

    const renderData = Array.from(filterState)
    const renderArray = renderData.map((card) => {
        let [img, title, info, price, id] = [card.img, card.title, card.info, card.price, card.id]
        const cardCount = cartMain[id]

        if(title.toLowerCase().includes(filterCardsText.toLowerCase())){
            
            titleCardsArray.push(title)

            return(
                    <li 
                        className="cards__li"
                        key={id}
                        >
                            <img src={img} alt="" />
                        <NavLink to={`/one-card/${id}`} className="cards__title">
                            {title}
                        </NavLink>
                            <p>{info}</p>
                            <div className="card__li-options">
                                <span className="cards__price">{price}</span>
                                <a href="#!" className="cards__basket btn" onClick={() => addToCart(id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={'32px'} version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 33 33" fill="#fff">
                                        <g>
                                        <path d="M28.313,33H4.688c-0.137,0-0.268-0.056-0.362-0.155c-0.094-0.099-0.144-0.232-0.138-0.369L5.313,8.851   c0.013-0.267,0.232-0.476,0.5-0.476h21.375c0.267,0,0.487,0.209,0.5,0.476l1.125,23.625c0.006,0.137-0.043,0.27-0.138,0.369   C28.58,32.944,28.449,33,28.313,33z M5.212,32h22.576L26.711,9.375H6.289L5.212,32z"/>
                                        <path d="M21.905,11.375c-0.276,0-0.5-0.224-0.5-0.5v-4.97C21.405,3.201,19.205,1,16.5,1s-4.905,2.201-4.905,4.905v4.97   c0,0.276-0.224,0.5-0.5,0.5s-0.5-0.224-0.5-0.5v-4.97C10.595,2.649,13.244,0,16.5,0s5.905,2.649,5.905,5.905v4.97   C22.405,11.151,22.182,11.375,21.905,11.375z"/>
                                        </g>
                                    </svg>
                                    {cardCount > 0  &&  <span className='card__li-count'>({cardCount})</span>}
                                </a>
                            </div>
                    </li>
            )

        }

    })

    console.log(titleCardsArray)
    
    return(
        <ul className="cards__list--filter">
            {
                isTitlePending ? <Preloader /> :
                
                titleCardsArray.length > 0  ?  renderArray  :  <h1 className="filter-nothing">Nothing was found :(</h1>
            }
        </ul>
    )
}