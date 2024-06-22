// react-dependencies

// project-component's imports


// project's styles/img
import './more.scss'
import man1 from './resource/man1.png'
import man2 from './resource/man2.png'
import man3 from './resource/man3.png'
import star from './resource/star.svg'
import plant1 from './resource/plant1.png'
import plant2 from './resource/plant2.png'
import plant3 from './resource/plant3.png'

import { register } from 'swiper/element/bundle';
register();



export const More = () => {


    return(
        <main> 
 
            <section className="reviews">
                <div className="container">
                    <div className="reviews__body">

                        <h1 className="section-title">Customer Review</h1>

                        <div className="reviews__block">
                            <div className="reviews__item">
                                <div className="reviews__title">
                                    <img src={man1} alt="" />
                                    <div className="reviews__name">
                                        <h3>Maxn Raval</h3>
                                        <div className="reviews__stars">
                                            <img src={star} alt="" />
                                            <img src={star} alt="" />
                                            <img src={star} alt="" />
                                            <img src={star} alt="" />
                                            <img src={star} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <p className="reviews__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
                            </div>
                            <div className="reviews__item">
                                <div className="reviews__title">
                                    <img src={man2} alt="" />
                                    <div className="reviews__name">
                                        <h3>Venely Swoford</h3>
                                        <div className="reviews__stars">
                                            <img src={star} alt="" />
                                            <img src={star} alt="" />
                                            <img src={star} alt="" />
                                            <img src={star} alt="" />
                                            <img src={star} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <p className="reviews__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
                            </div>
                            <div className="reviews__item">
                                <div className="reviews__title">
                                    <img src={man3} alt="" />
                                    <div className="reviews__name">
                                        <h3>Lii Thakur</h3>
                                        <div className="reviews__stars">
                                            <img src={star} alt="" />
                                            <img src={star} alt="" />
                                            <img src={star} alt="" />
                                            <img src={star} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <p className="reviews__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>
                            </div>

                        </div>


                    </div>
                </div>
            </section>

            <section className="best">
                <div className="container">
                    <div className="best__body">

                        <h1 className="section-title">
                            Our BEST plants
                        </h1>


                        <swiper-container 
                            // navigation={{
                            //     prevEl: '.swiper-button-prev',
                            //     nextEl: '.swiper-button-next',    
                            //     enabled: true,
                            // }}
                            // pagination={{
                            //     el: '.swiper-pagination', 
                            //     clickable: true,
                            // }}
                            slides-per-view='1' 
                            space-between='40' 
                            speed='500'>
                            <swiper-slide>
                            <div className="best__slide swiper-slide">
                                    <img src={plant1} alt="" /> 
                                    <div className="best__text">
                                        <h1>We Have Small And Best O2 Plants Collection’s</h1>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua

                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                        </p>
                                        <h2>this plant is in our catalog &#128521;)</h2>
                                    </div>
                                </div>
                            </swiper-slide>
                            <swiper-slide>
                            <div className="best__slide swiper-slide">
                                    <img src={plant2} alt="" />
                                    <div className="best__text">
                                        <h1>We Have Small And Best O2 Plants Collection’s</h1>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua

                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                        </p>
                                        <h2>this plant is in our catalog &#128521;)</h2>
                                    </div>
                                </div>
                            </swiper-slide>
                            <swiper-slide>
                                <div className="best__slide swiper-slide">
                                    <img src={plant3} alt="" />
                                    <div className="best__text">
                                        <h1>We Have Small And Best O2 Plants Collection’s</h1>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua

                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                        </p>
                                        <h2>this plant is in our catalog &#128521;)</h2>
                                    </div>
                                </div>
                            </swiper-slide>
                        </swiper-container>
                        {/* <div className="swiper-pagination"></div>
                        <div className="swiper-block">
                            <div className="swiper-button-prev"></div>
                            <div className="swiper-button-next"></div>
                        </div> */}


                    </div>
                </div>
            </section>

        </main>
    )
}