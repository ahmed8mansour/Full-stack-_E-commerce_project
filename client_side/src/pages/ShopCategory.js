import React from 'react'
import { useParams , useLocation, Outlet , Link , NavLink, useNavigate} from "react-router-dom";




// components
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PaginationItem from '@mui/material/PaginationItem';
import CircularProgress from '@mui/material/CircularProgress';

import Skeleton from '@mui/material/Skeleton';
import useWindowDimensions from '../hooks/WindowDimentsions';


// redux toolkit
import ProductsLayout from '../Layouts/ProductsLayout'
import PageLayout from '../Layouts/PageLayout'
import filterIcon from '../assests/images/shopcategory/Frame.svg';
import { useDispatch, useSelector } from 'react-redux'

import { productFilterPageDefault , productFilterPaginate , productFilterApplyingPaginate, productFilterApplying} from '../featuers/product/productActions';
import {  toast } from 'react-toastify';
import { backendURL } from '../store/Constants';

export default function ShopCategory(){

// ====================================================
// ====================================================
// ====================================================
// Hooks and Redux
const { category } = useParams();
const { width, height } = useWindowDimensions();
const dispatch = useDispatch();
const state_filter_product = useSelector((state) => state.product?.filter_product);
const state_product = useSelector((state) => state.product);
const firstLoad = React.useRef(true);

// ====================================================
// ====================================================
// State Declarations
const [page, setPage] = React.useState(1); // current page
const [pageType, setPageType] = React.useState(() => {
    if (category === 'casual') return 'casual';
    if (category === 'gym') return 'gym';
    if (category === 'formal') return 'formal';
    if (category === 'party') return 'party';
    return '';
});
const [selectedColor, setSelectedColor] = React.useState(null);
const [Filters, setFilters] = React.useState({
    category: null,
    size: null,
    color: null,
    priceRange: [0, 1000],
});

const [requestFilterData , setrequestFilterData] = React.useState(null)

// ====================================================
// ====================================================
// Constants
const error_notify = (msg) => toast.error(msg);
let LIMIT = 2;
// 8
if (width > 1200 || width < 576) {
    LIMIT = 2;
    // 9
}
var totalPages = Math.ceil(state_filter_product?.count / LIMIT);

const startIndex = (page - 1) * LIMIT + 1;
let endIndex = page * LIMIT;
if (endIndex > state_filter_product?.count) endIndex = state_filter_product?.count;

// ====================================================
// ====================================================
// ====================================================
// Effects
React.useEffect(() => {
    const filterBtns = document.getElementsByClassName("filter_btn");
    const allSelected = Filters.category !== null && Filters.size !== null && Filters.style !== null;
    Array.from(filterBtns).forEach(btn => {
        if (allSelected) {
            btn.removeAttribute('disabled');
        } else {
            btn.setAttribute('disabled', true);
        }
    });
}, [Filters.category, Filters.size, Filters.style]);

React.useEffect(() => {
    const requestData = {
        pageType: pageType,
        limit: LIMIT
    };
    dispatch(productFilterPageDefault(requestData)).unwrap().then(() => {
        console.log("default style page done");
    }).catch((err) => {
        console.log("default style failed");
    });
}, []);

React.useEffect(() => {
    if (firstLoad.current) {
        firstLoad.current = false;
        return;
    }
        PaginateDispatchdata(page);
}, [page]);

// ====================================================
// ====================================================
// ====================================================
// data proccessing function

// Range slider
const handleRangeChange = (event, newValue) => {
    setFilters(prev => ({ ...prev, priceRange: newValue }));
};

// Category, size, style radio
const handleRadioChange = (group, labelText) => {
    setFilters(prev => ({ ...prev, [group]: labelText }));
};

// Color
const handleColorCheck = (color) => {
    setSelectedColor(color);
    setFilters(prev => ({ ...prev, color }));
};
// Apply filters
async function handleApplyFilters() {
    if (Filters.category === null || Filters.size === null) {
        alert("Please select all filters");
        return;
    }

    var requestFilterData = {
        pageType: pageType,
        limit: LIMIT,
        category: null,
        priceRange: null,
        SelectedColor: null,
        SelectedSize: null
    };

    if (Filters.category === "Shirts") {
        requestFilterData.category = "shirt";
    } else if (Filters.category === "Jeans") {
        requestFilterData.category = "jeans";
    } else if (Filters.category === "Shorts") {
        requestFilterData.category = "short";
    } else if (Filters.category === "T-shirts") {
        requestFilterData.category = "t-shirt";
    } else if (Filters.category === "Hoddie") {
        requestFilterData.category = "hoddie";
    }

    requestFilterData.priceRange = `${Filters.priceRange[0]}-${Filters.priceRange[1]}`;
    requestFilterData.SelectedColor = Filters.color;
    requestFilterData.SelectedSize = Filters.size;
    if (requestFilterData.SelectedSize === "X-Large") requestFilterData.SelectedSize = "XLarge";

    try {
        await dispatch(productFilterApplying(requestFilterData)).unwrap();
        setPage(1);
        setrequestFilterData(requestFilterData)
    } catch (err) {
        error_notify(err.detail);
    }
}

// Pagination
async function PaginateDispatchdata(pageNumber) {
    const offset = (pageNumber - 1) * LIMIT;
    var url = null
    if (state_product.is_filtered){
        url = `${backendURL}products/DefaultStylePage/${category}/filter/${LIMIT}/?limit=${LIMIT}&offset=${offset}`;
    }else{
        
        url = `${backendURL}products/DefaultStylePage/${category}/${LIMIT}/?limit=${LIMIT}&offset=${offset}`;
    }
    console.log(pageNumber);
    console.log(offset);
    console.log(url);

    try {
        if (state_product.is_filtered){
            const {limit , pageType , ...requestFilterData2} = requestFilterData
            requestFilterData2.url = url
        
            await dispatch(productFilterApplyingPaginate(requestFilterData2)).unwrap();

        }else{
            await dispatch(productFilterPaginate(url)).unwrap();
        
        }
        console.log("نجح البانجينيشن لداتا الديفولت ");
    } catch (err) {
        console.log(err);
    }
}

// Pagination change
const handlePageChange = (event, value) => {
    console.log("=========================");
    console.log("the number of the page is :", value);
    setPage(value);
};

// Slider value text
function valuetext(value) {
    return `${value}$`;
}



    return(
        <PageLayout>
            <div className='shop_category my_section'>
                <div className='shop_category_container container'>
                    <nav aria-label="breadcrumb"  className='nav_crumb'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page" >{pageType}</li>
                            </ol>
                    </nav>
                    <div className='shop_category_content'>
                        <div className='row gx-3'>
                            { width > 767.98 &&
                            <div className='col-lg-3'>
                                <div className='filter_col'>
                                    <div className='filter_header d-flex justify-content-between align-items-center'>
                                        <span className='filter_title'>Filters</span>
                                        <img alt="filter_icon" className='filter_icon' src={filterIcon} />
                                    </div>
                                    <hr/>
                                    <div className='filter_item'>
                                                {['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'].map((label, idx) => (
                                                    <React.Fragment key={label}>
                                                        <input
                                                            type="radio"
                                                            className="btn-check"
                                                            name="category"
                                                            id={`cat${idx}`}
                                                            autoComplete="off"
                                                            onChange={() => handleRadioChange('category', label)}
                                                        />
                                                        <label className="btn" htmlFor={`cat${idx}`}>{label}</label>
                                                    </React.Fragment>
                                                ))}
                                    </div>
                                    <hr/>
                                    <div class="accordion" id="accordionPanelsStayOpenExample">
                                        <div class="accordion-item ">
                                            <h2 classs="accordion-header">
                                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                                    Range
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
                                                <div class="accordion-body">
                                                <Box>
                                                    <Slider
                                                        getAriaLabel={() => 'Temperature range'}
                                                        value={Filters.priceRange}
                                                        onChange={handleRangeChange}
                                                        valueLabelDisplay="auto"
                                                        getAriaValueText={valuetext}
                                                        min={0}
                                                        max={1000}
                                                    />
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography
                                                            variant="body2"
                                                        >
                                                            {0}$
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                        >
                                                            {1000}$
                                                        </Typography>
                                                    </Box>

                                                </Box>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div class="accordion-item ">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                                                    Colors
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse show">
                                                <div class="accordion-body">
                                                    <div className='filter_colors d-flex flex-wrap'>
                                                        {['red', 'green', 'blue', 'yellow', 'black'].map(color => (
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
                                            </div>
                                        </div>
                                        <hr/>
                                        <div class="accordion-item ">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree">
                                                    Size
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse show">
                                                <div class="accordion-body size_filter d-flex flex-wrap">

                                                    {['Small', 'Medium', 'Large', 'X-Large'].map((label, idx) => (
                                                        <React.Fragment key={label}>
                                                            <input
                                                                type="radio"
                                                                className="btn-check"
                                                                name="size"
                                                                id={`size${idx}`}
                                                                autoComplete="off"
                                                                onChange={() => handleRadioChange('size', label)}
                                                            />
                                                            <label className="btn" htmlFor={`size${idx}`}>{label}</label>
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <hr/>
                                        <div class="accordion-item ">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="true" aria-controls="panelsStayOpen-collapseFour">
                                                    Dress Style
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse show">
                                                <div class="accordion-body filter_item style_link_filter">
                                                    
                                                    {['Casual', 'Formal', 'Party', 'Gym'].map((label, idx) => (
                                                        <React.Fragment key={label}>
                                                            <Link to={`/shop/${label.toLowerCase()}/`} style={{textDecoration:"none", color:"unset"}} reloadDocument>
                                                                <div className='style_link d-flex align-items-center justify-content-between'>
                                                                    <a name="style" id={`style${idx}`} > {label} </a>
                                                                    <i class="fa-solid fa-angle-right"></i>
                                                                </div>
                                                            </Link>
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <button className='btn filter_btn' onClick={handleApplyFilters}> Apply Filter</button>
                                </div>
                            </div>
                            }
                            <div className='col-lg-9 '>
                                <div className='products_col d-flex flex-column' style={{ minHeight: '100%' }}>
                                    <div className='products_header d-flex justify-content-between align-items-center'>
                                        <span className='products_title' style={{textTransform:"capitalize"}}>{pageType}</span>
                                        <div className='sort_by flex-wrap d-flex align-items-center'>
                                            <span>Showing {startIndex}-{endIndex} of {state_filter_product?.count} Products</span>
                                            {
                                                width > 767.98 &&
                                                <>
                                            <span className='sort_by_text'>Sort By:</span>
                                            <select className='form-select' aria-label="Default select example">
                                                <option selected>Default</option>
                                                <option value="1">Popular</option>
                                                <option value="2">Newest</option>
                                            </select>
                                                </>
                                            }
                                        
                                        {
                                            width < 767.98 &&
                                        <img alt="filter_icon" className='filter_icon' src={filterIcon} data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" />
                                        }
                                        </div>
                                    </div>
                                    {state_product?.filter_data_loading ? 
                                        <Box sx={{ width: "100%" , marginTop:"20px" , marginBottom:"20px"}}>
                                            <CircularProgress size="3rem" color='secondary' />
                                            {/* <Skeleton variant="circular" width={50} height={50} /> */}
                                            {/* <Skeleton /> */}
                                            {/* <Skeleton animation="wave" /> */}
                                            {/* <Skeleton animation={false} /> */}
                                        </Box>
                                    :
                                        <div className='products_list'>
                                            <ProductsLayout page="style" products_details= {state_filter_product?.results} />
                                        </div> 
                                    }

                                        {width<768 && 
                                        <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                                            <div class="offcanvas-body small">
                                                <div className='filter_col'>
                                        <div className='filter_header d-flex justify-content-between align-items-center'>
                                            <span className='filter_title'>Filters</span>
                                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <hr/>
                                        <div className='filter_item'>
                                                    {['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'].map((label, idx) => (
                                                        <React.Fragment key={label}>
                                                            <input
                                                                type="radio"
                                                                className="btn-check"
                                                                name="category"
                                                                id={`cat${idx}`}
                                                                autoComplete="off"
                                                                onChange={() => handleRadioChange('category', label)}
                                                            />
                                                            <label className="btn" htmlFor={`cat${idx}`}>{label}</label>
                                                        </React.Fragment>
                                                    ))}

                                        </div>
                                        <hr/>
                                        <div class="accordion" id="accordionPanelsStayOpenExample">
                                            <div class="accordion-item ">
                                                <h2 classs="accordion-header">
                                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                                        Range
                                                    </button>
                                                </h2>
                                                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
                                                    <div class="accordion-body">
                                                    <Box>
                                                        <Slider
                                                            getAriaLabel={() => 'Temperature range'}
                                                            value={Filters.priceRange}
                                                            onChange={handleRangeChange}
                                                            valueLabelDisplay="auto"
                                                            getAriaValueText={valuetext}
                                                            min={0}
                                                            max={1000}
                                                        />
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography
                                                                variant="body2"
                                                            >
                                                                {0}$
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                            >
                                                                {1000}$
                                                            </Typography>
                                                        </Box>

                                                    </Box>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div class="accordion-item ">
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                                                        Colors
                                                    </button>
                                                </h2>
                                                <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse show">
                                                    <div class="accordion-body">
                                                        <div className='filter_colors d-flex flex-wrap'>
                                                            {['red', 'green', 'blue', 'yellow', 'black'].map(color => (
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
                                                </div>
                                            </div>
                                            <hr/>
                                            <div class="accordion-item ">
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree">
                                                        Size
                                                    </button>
                                                </h2>
                                                <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse show">
                                                    <div class="accordion-body size_filter d-flex flex-wrap">

                                                        {[ 'Small', 'Medium', 'Large', 'X-Large'].map((label, idx) => (
                                                            <React.Fragment key={label}>
                                                                <input
                                                                    type="radio"
                                                                    className="btn-check"
                                                                    name="size"
                                                                    id={`size${idx}`}
                                                                    autoComplete="off"
                                                                    onChange={() => handleRadioChange('size', label)}
                                                                />
                                                                <label className="btn" htmlFor={`size${idx}`}>{label}</label>
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <hr/>
                                            <div class="accordion-item ">
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="true" aria-controls="panelsStayOpen-collapseFour">
                                                        Dress Style
                                                    </button>
                                                </h2>
                                                <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse show">
                                                    <div class="accordion-body filter_item style_link_filter">
                                                        
                                                        {['Casual', 'Formal', 'Party', 'Gym'].map((label, idx) => (
                                                            <React.Fragment key={label}>
                                                                <Link to={`/shop/${label.toLowerCase()}/`} style={{textDecoration:"none", color:"unset"}} reloadDocument>
                                                                    <div className='style_link d-flex align-items-center justify-content-between'>
                                                                        <a name="style" id={`style${idx}`} > {label} </a>
                                                                        <i class="fa-solid fa-angle-right"></i>
                                                                    </div>
                                                                </Link>
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                        <button className='btn filter_btn' onClick={handleApplyFilters} data-bs-dismiss="offcanvas" aria-label="Close"> Apply Filter</button>
                                    </div>
                                            </div>
                                        </div>
                                        }
                                        <Stack spacing={2} style={{marginTop:"auto"}}>
                                        <hr/>
                                            { state_filter_product &&
                                            <Pagination 
                                                count={totalPages} 
                                                shape="rounded" 
                                                size='large' 
                                                page={page}
                                                onChange={handlePageChange}
                                                siblingCount={width > 768 ? 1 : 0}
                                                boundaryCount={width > 768 ? 1 : 1}
                                                renderItem={(item) => (
                                                    <PaginationItem
                                                        components={{
                                                        previous: () => <span > <i class="fa-solid fa-arrow-left" style={{marginRight:"10px"}}></i> {width>500 && "Previous"} </span>,
                                                        next: () => <span >{width > 500 && "Next"} <i class="fa-solid fa-arrow-right" style={{marginLeft:"10px"}}></i> </span>,
                                                    }}
                                                    {...item}
                                                />
                                            )}
                                            />
                                            }
                                        </Stack>

                                    
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </PageLayout>
    )
}