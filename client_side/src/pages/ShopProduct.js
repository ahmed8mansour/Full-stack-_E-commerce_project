import React from 'react'
import { useParams , useLocation, Outlet , Link , NavLink, useNavigate} from "react-router-dom";

import PageLayout from '../Layouts/PageLayout'

import useWindowDimensions from '../hooks/WindowDimentsions';
import ProductsLayout from '../Layouts/ProductsLayout';

import product1 from "../assests/images/shopProduct/product1.png"
import product2 from "../assests/images/shopProduct/product2.png"
import product3 from "../assests/images/shopProduct/product3.png"

// shop/casual/2
export default function ShopProduct(){
// ====================================================
// ====================================================
// hooks calling
    const {category , id} = useParams()
    const {width , height} = useWindowDimensions()

    console.log(category , id)
    
// ====================================================
// ====================================================
// useState and variable declartion
    const [selectedColor, setSelectedColor] = React.useState(null);
    const [ProductCounter, setProductCounter] = React.useState(1);
    const [imagePreview , setimagePreview] = React.useState(product2)
    const [selected, setSelected] = React.useState(0); // State variable to store selected rating
    const [hover, setHover] = React.useState(0); // State variable to store hover state



    const review_card_lenght = 6
    const review_card = Array.from({ length: review_card_lenght }).map((_, idx) => {
        return(
        <div className='col-md-6 col-12'>
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
        </div>
            
        )
    }
    );
// ====================================================
// ====================================================
// conditions ( rendering )


// ====================================================
// ====================================================
// data processing function

        const handleColorCheck = (color) => {
        setSelectedColor(color);
    };
    

    return(
        <PageLayout>
            <div className='shop_product my_section'>
                <div className='shop_product_container container'>
                    <nav aria-label="breadcrumb" className='nav_crumb'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item"><a href="#">Shop</a></li>
                                <li className="breadcrumb-item"><a href="#">{category}</a></li>
                                <li className="breadcrumb-item active" aria-current="page" >{id}</li>
                            </ol>
                    </nav>
                    <div className='shop_product_content'>
                        <div className='product_top'>
                            <div className='row d-flex gx-3 gy-3'>

                                <div className='col-12 order-1 order-md-0 col-md-12 col-lg-2 col-xl-2'>
                                    <div className='product_images_left w-100 h-100 d-flex flex-lg-column align-items-center justify-content-between'>
                                        {[product1 , product2 , product3].map((img, idx) => (
                                            <div
                                                key={idx}
                                                className='product_img_container '
                                                style={{
                                                    cursor:"pointer",
                                                    borderRadius:"20px",
                                                    height: "32%",
                                                    backgroundImage: `url(${img})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    backgroundRepeat: "no-repeat",
                                                    objectFit:"cover",
                                                    width: "100%",
                                                    border : img == imagePreview && "1px solid black"
                                                }}
                                                onClick={ () => {
                                                    return setimagePreview(img)
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>


                                <div className='col-12 order-0 col-md-6 col-lg-5 col-xl-4'>
                                    <div className='product_image_preview h-100'>
                                        <img alt="preview_img" style={{borderRadius:"20px"}} className='product_img img-fluid object-fit-cover h-100 w-100' src={imagePreview} />
                                    </div>

                                </div>
                                <div className='col-12 order-2 col-md-6 col-lg-5 col-xl-6'>

                                    <div className='product_details'>
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
                                        <p className='product_about'> This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.</p>
                                        <hr/>
                                        <div className='product_select_color'>
                                            <div className="select_color_title product_detail_title">
                                                Select Colors
                                            </div>
                                            <div className='filter_colors d-flex flex-wrap'>
                                                            {['rgba(49, 79, 74, 1)', 'rgba(79, 70, 49, 1)', 'rgba(49, 52, 79, 1)'].map(color => (
                                                                <span
                                                                    key={color + Math.random()}
                                                                    className='color_item'
                                                                    style={{ backgroundColor: color }}
                                                                    onClick={() => handleColorCheck(color)}
                                                                >
                                                                    {selectedColor === color && <i className="fa-solid fa-check"></i>}
                                                                </span>
                                                        ))}

                                            </div>
                                        </div>
                                        <hr/>
                                        <div className='product_choose_size'>
                                            <div className="choose_size_title product_detail_title">
                                                Choose Size
                                            </div>
                                            {[ 'Small', 'Medium', 'Large', 'X-Large'].map((label, idx) => (
                                                <React.Fragment key={label}>
                                                    <input
                                                        type="radio"
                                                        className="btn-check"
                                                        name="size"
                                                        id={`size${idx}`}
                                                        autoComplete="off"
                                                        // onChange={() => handleRadioChange('size', label)}
                                                    />
                                                    <label className="btn" htmlFor={`size${idx}`}>{label}</label>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        <hr/>
                                        <div className="product_form_btns row gx-3">
                                            <div className='col-4 col-sm-3 col-md-5 col-xl-3'>
                                                <div className=' counter_btns d-flex align-items-center justify-content-between'>
                                                    <button className='btn counter_span minus' onClick={e => setProductCounter( e => Math.max(1 , e-1) )}>-</button>
                                                    <span className='counter_span counter_indicator'>{ProductCounter}</span>
                                                    <button className='btn counter_span plus'  onClick={e => setProductCounter( e => e+1)}>+</button>
                                                </div>
                                            </div>
                                            <div className='col-8 col-sm-9 col-md-7 col-xl-9'>
                                                <button className='btn add_to_btn'>
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>

                                        


                                    </div>


                                </div>

                            </div>
                        </div>




                        <div className="product_bottom">
                            <ul class="nav nav-tabs row justify-content-between" id="myTab" role="tablist">
                                <li class="nav-item col-6" role="presentation">
                                    <button class="nav-link active" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews" type="button" role="tab">
                                        Rating & Reviews
                                    </button>
                                </li>
                                <li class="nav-item col-6" role="presentation">
                                    <button class="nav-link" id="faq-tab" data-bs-toggle="tab" data-bs-target="#faq" type="button" role="tab">
                                        FAQs
                                    </button>
                                </li>
                            </ul>
                                                                    
                            <div class="tab-content mt-3" id="myTabContent">
                                <div class="tab-pane fade active show " id="reviews" role="tabpanel">
                                    
                                    <div className='reviews_header d-flex align-items-center justify-content-between '>
                                        <h1 className='reviews_header_title  position-relative' style={{width:"fit-content"}}>All Reviews
                                            {/* <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            99+
                                                <span class="visually-hidden">unread messages</span>
                                            </span> */}
                                        </h1>
                                        <button className='btn review_header_btn'type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                            Write a Review
                                        </button>


                                    </div>

                                    <div className='reviews_collapse_container' style={{paddingRight:"20px"}}>

                                        <div class="collapse" id="collapseExample">
                                                <div class="collapse_content">
                                                    <div className='reviws_form_section'>
                                                        {[1, 2, 3, 4, 5].map((num) => (
                                                            <i className="fa-solid fa-star"
                                                                key={num}
                                                                onClick={() => setSelected(num)}
                                                                onMouseOver={() => setHover(num)} 
                                                                onMouseLeave={() => setHover(selected)}
                                                                size={50}
                                                                style={{
                                                                    color:num <= hover ? "orange" : "grey"
                                                                }}
                                                            ></i>
                                                        ))}
                                                    </div>
                                                    <form>

                                                        <div class="form-floating">
                                                            <input class="form-control" type='text' placeholder="Leave a comment here" id="inputText"/>
                                                            <label for="inputText">Name</label>
                                                        </div>

                                                        <div class="form-floating">
                                                            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                                                            <label for="floatingTextarea">Comments</label>
                                                        </div>
                                                        <button className='btn form_submit_btn' type='submit'>
                                                            Submit
                                                        </button>
                                                    </form>
        
                                            </div>
                                        </div>
                                    </div>


                                    <div className='reviews_container row g-3  w-100'>
                                        {review_card}
                                    </div>
                                    <div className='load_btn_container text-center'>
                                        <button className='btn reviews_load_btn'>
                                            Load More Reviews
                                        </button>
                                    </div>
                                </div>


                                <div class="tab-pane fade" id="faq" role="tabpanel">
                                            <h1 className='faqs_tilte'>FAQs</h1>
                                            <div className='faqs_content'>
                                                    <div className="accordion" id="accordionExample">
                                                        
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingOne">
                                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                What material is this product made of?
                                                            </button>
                                                            </h2>
                                                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                The product is made from 100% high-quality cotton. It's soft on the skin and perfect for everyday wear.
                                                            </div>
                                                            </div>
                                                        </div>

                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingTwo">
                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                Is the product machine washable?
                                                            </button>
                                                            </h2>
                                                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                Yes, it is machine washable. Use a cold, gentle cycle and turn the garment inside out to preserve the print.
                                                            </div>
                                                            </div>
                                                        </div>

                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingThree">
                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                Are the sizes true to standard measurements?
                                                            </button>
                                                            </h2>
                                                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                Yes, our sizes follow standard US/EU measurements. We recommend checking the size chart before ordering for the best fit.
                                                            </div>
                                                            </div>
                                                        </div>

                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingFour">
                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                                Will the color fade after washing?
                                                            </button>
                                                            </h2>
                                                            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                No, the fabric is pre-treated and the colors are designed to stay vibrant even after multiple washes, if care instructions are followed.
                                                            </div>
                                                            </div>
                                                        </div>

                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header" id="headingFive">
                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                                Can I return or exchange the item if it doesn't fit?
                                                            </button>
                                                            </h2>
                                                            <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                Absolutely! We offer a hassle-free return and exchange policy within 14 days of delivery, as long as the item is unworn and in original condition.
                                                            </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                            </div>
                                </div>
                            </div>

                        </div>






                        
                    </div>
                <br/>
                <br/>
                <br/>
                    <div className='shop_product_bottom_cards'>
                        <ProductsLayout 
                        layout_name="YOU MIGHT ALSO LIKE" 
                        page="specific_product"
                        products_details= {"products_details"} // images and rates and all data from state
                        />
                    </div>

                </div>

            </div>
        </PageLayout>
    )


}