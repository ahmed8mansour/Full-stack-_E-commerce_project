import React from 'react'
import { useParams , useLocation, Outlet , Link , NavLink, useNavigate, Navigate} from "react-router-dom";

import PageLayout from '../Layouts/PageLayout'

import useWindowDimensions from '../hooks/WindowDimentsions';
import ProductsLayout from '../Layouts/ProductsLayout';

import product1 from "../assests/images/shopProduct/product1.png"
import product2 from "../assests/images/shopProduct/product2.png"
import product3 from "../assests/images/shopProduct/product3.png"

import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { productSpecificData , productReviewRegister , productReviewNext } from '../featuers/product/productActions';
import { cartItemRegister } from '../featuers/cart/cartActions';
// shop/casual/2
export default function ShopProduct(){
// ====================================================
// ====================================================
// hooks calling
    const {category , id} = useParams()
    const {width , height} = useWindowDimensions()
    const dispatch = useDispatch();
    const navigate  = useNavigate()
    const nameRef = React.useRef()
    const commentRef = React.useRef()
    const [text, setText] = React.useState("");
    const maxLength = 250;

    
    const error_notify = (msg) => toast.error(msg || "Reviewing Failed");
    const success_notify = (msg) => toast.success(msg || "Reviewing succeeded");
// ====================================================
// ====================================================
// useState and variable declartion
    const state_product = useSelector((state)=>state.product)
    const product_data = state_product.specific_product?.product_data || null
    const product_faqs = state_product.specific_product?.FAQs || null
    const product_reviews = state_product.specific_product?.Reviews || null

    const [selectedColor, setSelectedColor] = React.useState(null);
    const [selectedSize, setSelectedSize] = React.useState(null);
    const [ProductCounter, setProductCounter] = React.useState(1);
    const [imagePreview , setimagePreview] = React.useState(product_data?.image1)
    const [selected, setSelected] = React.useState(0); // State variable to store selected rating
    const [hover, setHover] = React.useState(0); // State variable to store hover state


// ضايل مشكلة تعرض الاسم في الريفيوز
    const review_card = product_reviews?.results?.map((review, idx , array) => {
        return(
        <div className='col-md-6 col-12' key={review?.id}>
                <div className='slide_card' key={idx}>
                    <p className="card-text card_stars">
                        {
                            [...Array(Math.floor(review?.rating)).keys()].map(()=> {
                                return (
                                    <i class={`fa-solid fa-star`}></i>
                                )
                            })
                        }
                    </p>
                    <h2 className='review_name'>{review?.name}  <i class="fa-solid fa-circle-check"></i> </h2>
                    <div className='review_text'>
                        "{review?.comment}”
                    </div>
                </div>
        </div>
            
        )
    }
    );
    const faqs_card = product_faqs?.map((faq , index , array)=>{

        return(
            <div className="accordion-item">
                <h2 className="accordion-header" id={`heading${index}`}>
                <button className={index == 0 ? "accordion-button" :"accordion-button collapsed" } type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded={index ==0 ? "true" : "false" } aria-controls={`collapse${index}`}>
                    {faq?.question}
                </button>
                </h2>
                <div id={`collapse${index}`} className={index == 0 ? "accordion-collapse collapse show" :"accordion-collapse collapse" } aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    {faq?.answer}
                </div>
                </div>
            </div>
        )
    })

// ====================================================
// ====================================================
// useEffects 

React.useEffect(()=>{
    dispatch(productSpecificData({id ,style:category })).unwrap().then(()=>{
        console.log("user specfic data done")
    })
    .catch((error)=>{
        console.log("there is error")
    })
},[])


React.useEffect(() => {
    if (product_data?.image1) {
        setimagePreview(product_data.image1);
    }
}, [product_data]);

// ====================================================
// ====================================================
// conditions ( rendering )

if (state_product.specific_product_loading == true){
    console.log("--------------------------------specific product loading")
    return "loading from specific product loading....."
}else if (state_product.specific_product_error){
    console.log("there is error")
    return "there is error ,  no product here"

}


// ====================================================
// ====================================================
// data processing function
// color
const handleColorCheck = (color) => {
    setSelectedColor(color);
};

// size
const handleRadioChange = (labelText) => {
    setSelectedSize(labelText);
};

console.log(selectedColor , selectedSize ,ProductCounter)

async function AddToCart() {
    const requestbody = {
        product:product_data?.id,
        quantity:ProductCounter,
        selected_color:selectedColor,
        selected_size:selectedSize,
    }
    if(!requestbody.selected_size || !requestbody.selected_color){
        error_notify("You Must choose the color and the size")
        return;
    }
    console.log(requestbody)
    try{
        await dispatch(cartItemRegister(requestbody)).unwrap()
        navigate('/cart')
        success_notify("Adding To Cart Succeeded")
    }catch(error){
        console.log(error)
        error_notify("Adding To Cart Failed")
    }
    
}

async function ReviewRegisterSubmit(e) {
        e.preventDefault()
        try {
            const reviewData = {
                name: nameRef.current?.value,
                comment: commentRef.current?.value,
                rating: selected,
                product: product_data?.id
            };
            console.log(reviewData)
            await dispatch(productReviewRegister(reviewData)).unwrap();
            dispatch(productSpecificData({id ,style:category })).unwrap();
            setSelected(0)
            setHover(0)
            setText("")
            success_notify();
        } catch (error) {
            console.log(error);
            error_notify();
        }
}


async function load_more(){
    console.log(product_reviews.next)
    try{
        await dispatch(productReviewNext(product_reviews.next)).unwrap()

    }catch(error){
        console.log(error)
        error_notify("Load More Reviews Failed")
    }

}

const handleChange = (e) => {
    const newText = e.target.value;

    if (newText.length <= maxLength) {
        setText(newText);
    }
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
                                        {[product_data?.image1 , product_data?.image2 || product_data?.image1 , product_data?.image3 || product_data?.image1].map((img, idx) => (
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

                                    <div className='product_details' key={product_data?.id}>
                                        <h5 class="card-title">{product_data?.name}</h5>
                                        <p class="card-text card_stars ">
                                            {
                                                [...Array(product_data?.rate).keys()].map((star, index) => {
                                                return (
                                                    <i class={`fa-solid fa-star`}></i>
                                                )
                                            })
                                            
                                            }
                                            
                                            <span className='rate'>{product_data?.rate}/<span className='rate_full'>5</span></span>
                                        </p>
                                        <p class="card-text card_price">${product_data?.price_after} <span className='card_last_price'>${product_data?.price_before}</span>  <span className='card_discount'>-{product_data?.available_discount}%</span> </p>
                                        <p className='product_about'>{product_data?.description}</p>
                                        <hr/>
                                        <div className='product_select_color'>
                                            <div className="select_color_title product_detail_title">
                                                Select Colors
                                            </div>
                                            <div className='filter_colors d-flex flex-wrap'>
                                                            {product_data?.available_colors.map(color => (
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
                                            {product_data?.available_sizes.map((label, idx) => (
                                                <React.Fragment key={label}>
                                                    <input
                                                        type="radio"
                                                        className="btn-check"
                                                        name="size"
                                                        id={`size${idx}`}
                                                        autoComplete="off"
                                                        onChange={() => handleRadioChange(label)}
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
                                                <button className='btn add_to_btn' onClick={AddToCart}>
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
                                                    <form onSubmit={ReviewRegisterSubmit}>

                                                        <div class="form-floating">
                                                            <input class="form-control" ref={nameRef} required type='text' placeholder="Leave a comment here" id="inputText"/>
                                                            <label for="inputText">Name</label>
                                                        </div>

                                                        <div class="form-floating">
                                                            <textarea class="form-control" value={text} onChange={handleChange} maxLength={maxLength} style={{minHeight:"160px"}} required placeholder="Leave a comment here" id="floatingTextarea" ref={commentRef}></textarea>
                                                            <label for="floatingTextarea">Comments</label>
                                                        </div>
                                                        <p style={{ textAlign: "right", marginTop: "4px", color: text.length === maxLength ? "red" : "gray" }}>
                                                            {text.length} / {maxLength}
                                                        </p>
                                                        <button className='btn form_submit_btn' type='submit'>
                                                            Submit
                                                        </button>
                                                    </form>
        
                                            </div>
                                        </div>
                                    </div>


                                    <div className='reviews_container row g-3  w-100'>
                                        {review_card}
                                        {review_card?.length == 0 &&
                                        "There are no Reviews for This Product"
                                        }
                                    </div>
                                    
                                    
                                    {
                                        product_reviews?.count !== review_card?.length &&
                                    <div className='load_btn_container text-center'>
                                        <button className='btn reviews_load_btn' disabled={state_product?.next_review_loading && "true"} onClick={load_more}>
                                            {state_product?.next_review_loading 
                                            ?
                                            <div className="spinner-border text-dark" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            :
                                            
                                            "Load More Reviews"
                                        }
                                        </button>
                                    </div>
                                    }
                                    
                                </div>


                                <div class="tab-pane fade" id="faq" role="tabpanel">
                                            <h1 className='faqs_tilte'>FAQs</h1>
                                            <div className='faqs_content'>
                                                    <div className="accordion" id="accordionExample">
                                                        {faqs_card}
                                                        {faqs_card?.length == 0 &&
                                                            "There are no FAQs for This Product"
                                                        }
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
                        products_details={state_product.specific_product ? state_product.specific_product.AlsoLikeProduct : []} // images and rates and all data from state
                        />
                    </div>

                </div>

            </div>
        </PageLayout>
    )


}