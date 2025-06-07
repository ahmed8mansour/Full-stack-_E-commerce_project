import React from 'react'

import starImage from "../assests/images/landing_page/Vector.png"
import versace from "../assests/images/landing_page/versace.png"
import calvin from "../assests/images/landing_page/Group.png"
import gucci from "../assests/images/landing_page/gucci-logo-1 1.png"
import prada from "../assests/images/landing_page/prada-logo-1 1.png"
import zara from "../assests/images/landing_page/zara-logo-1 1.png"

import EmblaCarousel from '../component/EmblaCarousel'

import NavBar from '../Layouts/NavBar'
import ProductsLayout from '../Layouts/ProductsLayout'
import Footer from '../Layouts/Footer'

import useWindowDimensions from '../hooks/WindowDimentsions'



export default function Home(){
    const {width , height } = useWindowDimensions()


    // slides here
    const SLIDE_COUNT = 5
    const SLIDES = Array.from({ length: SLIDE_COUNT }).map((_, idx) => {
        return(
        <div className='slide_card' key={idx}>
            <p className="card-text card_stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half"></i>
            </p>
            <h2 className='review_name'>Sarah M. <i class="fa-solid fa-circle-check"></i> </h2>
            <div className='review_text'>
                "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”
            </div>
        </div>
        )
    }
    );
    return(
        <div className='home_page'>
            <div className='home_container'>
                <NavBar/>
                <div className='landing_page my_section'>
                    <div className='landing_top'>
                        <div className='landing_top_container container'>
                            <div className='row'>
                                <div className='landing_left col-12 col-md-7 col-lg-6 col-xl-6 '>
                                    <h1 className='landing_title'>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
                                    <p className='landing_pretext'>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
                                    <button className='btn landing_btn' >Shop Now</button>
                                    <div className='landing_cards d-flex align-items-center justify-content-between'>
                                        <div className='landing_card'>
                                            <h2>200+</h2>
                                            <p>International Brands</p>
                                        </div>
                                        <div className='landing_card'>
                                            <h2>2,000+</h2>
                                            <p>High-Quality Products</p>
                                        </div>
                                        <div className='landing_card'>
                                            <h2>30,000+</h2>
                                            <p>Happy Customers</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='landing_right col-12 col-md-5 col-lg-6 col-xl-6'>
                                    <img src={starImage} className='big_star' alt="Vector" />
                                    <img src={starImage} className='small_star' alt="Vector"/>
                                    {/* {   width < 768 &&
                                    <img src={landingsmallImage} alt="landing_image" className='landing_small_img'/>
                                    } */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='landing_bottom'>
                        <div className='landing_bottom_container container'>
                            <div className='brands d-flex align-items-center justify-content-between flex-wrap'>
                                <img alt="brand" src={versace}/>
                                <img alt="brand" src={zara}/>
                                <img alt="brand" src={gucci}/>
                                <img alt="brand" src={prada}/>
                                <img alt="brand" src={calvin}/>
                            </div>
                        </div>
                    </div>
                </div>

                <ProductsLayout 
                layout_name="NEW ARRIVALS" 
                page="home"
                products_details= {"products_details"} // images and rates and all data from state
                />
                <br/>
                <br/>
                <div className='container'>
                <hr/>
                </div>
                <br/>
                <br/>
                <ProductsLayout 
                layout_name="TOP SELLING" 
                page="home"
                products_details= {"products_details"} // images and rates and all data from state
                />
                <br/>
                

                <div className='styles_section my_section'>
                    <div className='container styles_container'>
                        <h1 className='style_title'>BROWSE BY dress STYLE</h1>
                        <div className='style_cards row justify-content-between align-items-center g-3'>
                            <div className='style_card casual_card'>
                                Casual
                            </div>
                            <div className='style_card formal_card'>
                                Formal
                            </div>
                            <div className='style_card party_card'>
                                Party
                            </div>
                            <div className='style_card gym_card'>
                                Gym
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='reviws_slider_section my_section'>
                    <div className='slider_header container'></div>
                    <div className='slider_header container'>
                        <h1 className='slider_title'> OUR HAPPY CUSTOMERS </h1>
                    </div>
                    <div className='container'>
                    <EmblaCarousel slides={SLIDES}/>
                    </div>
                </div>

                <Footer/>


            </div>
        </div>
    )

}