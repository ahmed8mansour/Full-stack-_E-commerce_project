import React from 'react'

import shirt from "../assests/images/productsLayout/image 7.png"
import image1 from "../assests/images/landing_page/15e68c103095df99e905b164718348af952a0f64 (1).png"
import image2 from "../assests/images/landing_page/345742c27cc557f42cf1d489f7cc811856b90e9f (1).png"
import image3 from "../assests/images/landing_page/57234b01d5fcac5632cf6823570ca2d1d53d7d73 (1).png"
import image4 from "../assests/images/landing_page/6115920b12942762aefb7c7ac954e78b76284504 (1).png"
import image5 from "../assests/images//landing_page/769b9d60ff941dde9bc0e54431b8d8fe3182f5e9 (1).png"

import { useDispatch, useSelector } from 'react-redux'
import { backendURL } from '../store/Constants'
import { Link } from 'react-router-dom'
import { productHomePageNewArrivalsNext  , productHomePageTopRatedNext} from '../featuers/product/productActions'
import { toast } from 'react-toastify';


export default function ProductsLayout(props){
    const dispatch = useDispatch()
    const error_notify = (msg) => toast.error(msg);
    const state_product = useSelector((state) => state.product)
    var product_cards = null

    if (state_product.home_page_data_loading == true){
        return "loading..."
    } else if (Array.isArray(props.products_details)) {
        product_cards = props.products_details.map((element, index, array) => {
            return (
                <div class="col" key={element.id}>
                    <Link  reloadDocument to={`/shop/${element.style}/${element.id}`} className='product_card_link'>
                    <div class="card">
                        <img src={`${backendURL}${element.image1}`} class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">{element.name}</h5>
                            <p class="card-text card_stars ">
                                {[...Array(Math.floor(element.rate)).keys()].map((star, index) => {
                                    return (
                                        <i class={`fa-solid fa-star`}></i>
                                    )
                                })}
                                <span className='rate'>{element.rate}/<span className='rate_full'>5</span></span>
                            </p>
                            <p class="card-text card_price">${element.price_after} <span className='card_last_price'>${element.price_before}</span>  <span className='card_discount'>- {element.available_discount}%</span> </p>
                        </div>
                    </div>
                    </Link>
                </div>
            )
        })
    } else {
        product_cards = null;
    }
// =============================================================
// =============================================================
// =============================================================

async function Load_more(layout , next_url) {
    const request_data={
        url : next_url
    }
    try{
        if (layout === "NEW ARRIVALS"){
            await dispatch(productHomePageNewArrivalsNext(request_data)).unwrap()
        }else if (layout === "TOP SELLING"){
            await dispatch(productHomePageTopRatedNext(request_data)).unwrap()
        } 
    }
    catch(error){
        console.log(error)
        error_notify("Loading More Products Failed!!")
    }
    
}

    return(
        

        <div className='products_layout'>
            <div className='products_container container'>
                { (props.page === "home" || props.page === "specific_product")  &&
                <h1 className='products_layout_title'>{props.layout_name}</h1>
                }
                
                
                <div className='products_layout_cards'>
                    <div className={ props.page === "home" || props.page === "specific_product" ? "row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 g-4" : "row row-cols-1 row-cols-sm-2 row-cols-lg-2 row-cols-xl-3 gx-4 gy-5"}>

                        {product_cards}



                    </div>
                </div>
                
                
                {
                    props.products_details?.length < 8 &&
                    props.page === "home" &&
                    <div className='text-center layout_btn_area'>
                        <button
                            type='button'
                            disabled={state_product.next_top_loading || state_product.next_newest_loading}
                            onClick={() => Load_more(props.layout_name, props.next_url)}
                            className='btn layout_load_more text-center'
                        >
                            {(state_product.next_top_loading || state_product.next_newest_loading)
                                ? (
                                    <div className="spinner-border text-dark" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                )
                                : "Load More"
                            }
                        </button>
                    </div>
                }



            </div>
        </div>
    )

}


