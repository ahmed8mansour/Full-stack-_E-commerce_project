import React from 'react'

import shirt from "../assests/images/productsLayout/image 7.png"
export default function ProductsLayout(props){
    return(
        

        <div className='products_layout'>
            <div className='products_container container'>
                { (props.page === "home" || props.page === "specific_product")  &&
                <h1 className='products_layout_title'>{props.layout_name}</h1>
                }
                
                
                <div className='products_layout_cards'>
                    <div className={ props.page === "home" || props.page === "specific_product" ? "row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 g-4" : "row row-cols-1 row-cols-sm-2 row-cols-lg-2 row-cols-xl-3 gx-4 gy-5"}>
                        <div class="col">
                            <div class="card" >
                                <img src={shirt} class="card-img-top" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title">T-SHIRT WITH TAPE DETAILS</h5>
                                    <p class="card-text card_stars ">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star-half"></i>
                                        <span className='rate'>4.5/<span className='rate_full'>5</span></span>
                                    </p>
                                    <p class="card-text card_price">$120 <span className='card_last_price'>$260</span>  <span className='card_discount'>-20%</span> </p>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card" >
                                <img src={shirt} class="card-img-top" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title">T-SHIRT WITH TAPE DETAILS</h5>
                                    <p class="card-text card_stars ">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star-half"></i>
                                        <span className='rate'>4.5/<span className='rate_full'>5</span></span>
                                    </p>
                                    <p class="card-text card_price">$120 <span className='card_last_price'>$260</span>  <span className='card_discount'>-20%</span> </p>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card" >
                                <img src={shirt} class="card-img-top" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title">T-SHIRT WITH TAPE DETAILS</h5>
                                    <p class="card-text card_stars ">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star-half"></i>
                                        <span className='rate'>4.5/<span className='rate_full'>5</span></span>
                                    </p>
                                    <p class="card-text card_price">$120 <span className='card_last_price'>$260</span>  <span className='card_discount'>-20%</span> </p>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card" >
                                <img src={shirt} class="card-img-top" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title">T-SHIRT WITH TAPE DETAILS</h5>
                                    <p class="card-text card_stars ">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star-half"></i>
                                        <span className='rate'>4.5/<span className='rate_full'>5</span></span>
                                    </p>
                                    <p class="card-text card_price">$120 <span className='card_last_price'>$260</span>  <span className='card_discount'>-20%</span> </p>
                                </div>
                            </div>
                        </div>
                        {/* fot testing now  */}
                        {
                            props.page == "style" &&
                            <>
                            
                        <div class="col">
                            <div class="card" >
                                <img src={shirt} class="card-img-top" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title">T-SHIRT WITH TAPE DETAILS</h5>
                                    <p class="card-text card_stars ">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star-half"></i>
                                        <span className='rate'>4.5/<span className='rate_full'>5</span></span>
                                    </p>
                                    <p class="card-text card_price">$120 <span className='card_last_price'>$260</span>  <span className='card_discount'>-20%</span> </p>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card" >
                                <img src={shirt} class="card-img-top" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title">T-SHIRT WITH TAPE DETAILS</h5>
                                    <p class="card-text card_stars ">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star-half"></i>
                                        <span className='rate'>4.5/<span className='rate_full'>5</span></span>
                                    </p>
                                    <p class="card-text card_price">$120 <span className='card_last_price'>$260</span>  <span className='card_discount'>-20%</span> </p>
                                </div>
                            </div>
                        </div>

                        <div class="col">
                            <div class="card" >
                                <img src={shirt} class="card-img-top" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title">T-SHIRT WITH TAPE DETAILS</h5>
                                    <p class="card-text card_stars ">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star-half"></i>
                                        <span className='rate'>4.5/<span className='rate_full'>5</span></span>
                                    </p>
                                    <p class="card-text card_price">$120 <span className='card_last_price'>$260</span>  <span className='card_discount'>-20%</span> </p>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card" >
                                <img src={shirt} class="card-img-top" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title">T-SHIRT WITH TAPE DETAILS</h5>
                                    <p class="card-text card_stars ">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star-half"></i>
                                        <span className='rate'>4.5/<span className='rate_full'>5</span></span>
                                    </p>
                                    <p class="card-text card_price">$120 <span className='card_last_price'>$260</span>  <span className='card_discount'>-20%</span> </p>
                                </div>
                            </div>
                        </div>

                        <div class="col">
                            <div class="card" >
                                <img src={shirt} class="card-img-top" alt="..."/>
                                <div class="card-body">
                                    <h5 class="card-title">T-SHIRT WITH TAPE DETAILS</h5>
                                    <p class="card-text card_stars ">
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star-half"></i>
                                        <span className='rate'>4.5/<span className='rate_full'>5</span></span>
                                    </p>
                                    <p class="card-text card_price">$120 <span className='card_last_price'>$260</span>  <span className='card_discount'>-20%</span> </p>
                                </div>
                            </div>
                        </div>
                            </>
                        }
                    </div>
                </div>
                
                
                
                
                {
                    props.page == "home" &&
                <div className='text-center layout_btn_area'>
                <button type='button' className='btn layout_load_more text-center'> Load More</button>
                </div>
                }


            </div>
        </div>
    )

}


