import React from 'react'
import { useParams , useLocation, Outlet , Link , NavLink, useNavigate} from "react-router-dom";




// components
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PaginationItem from '@mui/material/PaginationItem';

import useWindowDimensions from '../hooks/WindowDimentsions';


// redux toolkit
import ProductsLayout from '../Layouts/ProductsLayout'
import PageLayout from '../Layouts/PageLayout'
import filterIcon from '../assests/images/shopcategory/Frame.svg';

export default function ShopCategory(){

// ====================================================
// ====================================================
// hooks calling
    const {category} = useParams()
    const {width , height} = useWindowDimensions()
    
    // ====================================================
    // ====================================================
    // useState and variable declartion

    const [pageType, setPageType] = React.useState(() => {
        if (category === 'casual') return 'casual';
        if (category === 'gym') return 'gym';
        if (category === 'formal') return 'formal';
        if (category === 'party') return 'party';
        return '';
    });


    const [selectedColor, setSelectedColor] = React.useState(null);
    const [Filters , setFilters] = React.useState({
        category: null,
        size: null,
        style: null,
        color: null,
        priceRange: [0, 1000],
    });

// ====================================================
// ====================================================
// conditions ( rendering )


// ====================================================
// ====================================================
// data processing function

    // range
    const handleRangeChange = (event, newValue) => {
    setFilters(prev => ({ ...prev, priceRange: newValue }));
    };
    // catgory - size -style
    const handleRadioChange = (group, labelText) => {
    setFilters(prev => ({ ...prev, [group]: labelText }));
    };
    
    // color 
    const handleColorCheck = (color) => {
        setSelectedColor(color);
        setFilters(prev => ({ ...prev, color }));
    };


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


    const handleApplyFilters = () => {
        if (Filters.category === null || Filters.size === null || Filters.style === null) {
            alert("Please select all filters");
            return;
        }
        console.log(Filters);
    };

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
    {/* 
                                        <input type="radio" className="btn-check" name="category" id="option1" autoComplete="off"  />
                                        <label className="btn" htmlFor="option1">T-shirts</label>

                                        <input type="radio" className="btn-check"  id="option2" autoComplete="off" />
                                        <label className="btn" htmlFor="option2">Shorts</label>

                                        <input type="radio" className="btn-check"  id="option3" autoComplete="off" />
                                        <label className="btn" htmlFor="option3">Shirts</label>

                                        <input type="radio" className="btn-check" id="option4" autoComplete="off" />
                                        <label className="btn" htmlFor="option4">Hoodie</label>

                                        <input type="radio" className="btn-check"  id="option5" autoComplete="off" />
                                        <label className="btn" htmlFor="option5">Jeans</label> */}

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

                                                    {['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large' , 'XX-Large', '3X-Large', '4X-Large'].map((label, idx) => (
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
                                                <div class="accordion-body filter_item">
                                                    
                                                    {['Casual', 'Formal', 'Party', 'Gym'].map((label, idx) => (
                                                        <React.Fragment key={label}>
                                                            <input
                                                                type="radio"
                                                                className="btn-check"
                                                                name="style"
                                                                id={`style${idx}`}
                                                                autoComplete="off"
                                                                onChange={() => handleRadioChange('style', label)}
                                                            />
                                                            <label className="btn" htmlFor={`style${idx}`}>{label}</label>
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
                            <div className='col-lg-9'>
                                <div className='products_col'>
                                    <div className='products_header d-flex justify-content-between align-items-center'>
                                        <span className='products_title' style={{textTransform:"capitalize"}}>{pageType}</span>
                                        <div className='sort_by flex-wrap d-flex align-items-center'>
                                            <span>Showing 1-10 of 100 Products</span>
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
                                    <div className='products_list'>
                                        <ProductsLayout page="style" products_details= "vfdvd" />
                                    </div>
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
    {/* 
                                        <input type="radio" className="btn-check" name="category" id="option1" autoComplete="off"  />
                                        <label className="btn" htmlFor="option1">T-shirts</label>

                                        <input type="radio" className="btn-check"  id="option2" autoComplete="off" />
                                        <label className="btn" htmlFor="option2">Shorts</label>

                                        <input type="radio" className="btn-check"  id="option3" autoComplete="off" />
                                        <label className="btn" htmlFor="option3">Shirts</label>

                                        <input type="radio" className="btn-check" id="option4" autoComplete="off" />
                                        <label className="btn" htmlFor="option4">Hoodie</label>

                                        <input type="radio" className="btn-check"  id="option5" autoComplete="off" />
                                        <label className="btn" htmlFor="option5">Jeans</label> */}

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

                                                    {['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large' , 'XX-Large', '3X-Large', '4X-Large'].map((label, idx) => (
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
                                                <div class="accordion-body filter_item">
                                                    
                                                    {['Casual', 'Formal', 'Party', 'Gym'].map((label, idx) => (
                                                        <React.Fragment key={label}>
                                                            <input
                                                                type="radio"
                                                                className="btn-check"
                                                                name="style"
                                                                id={`style${idx}`}
                                                                autoComplete="off"
                                                                onChange={() => handleRadioChange('style', label)}
                                                            />
                                                            <label className="btn" htmlFor={`style${idx}`}>{label}</label>
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <button className='btn filter_btn' onClick={handleApplyFilters}> Apply Filter</button>
                                </div>
                                        </div>
                                    </div>
                                    }
                                    <hr/>

                                    {/* <nav aria-label="..." className='style_nav_pagination'>
                                        <ul class="pagination justify-content-between">
                                            <li class="page-item"><a href="#" class="page-link ">
                                                <i class="fa-solid fa-arrow-left" style={{marginRight:"10px"}}></i>
                                                Previous
                                                </a></li>
                                            <div className='d-flex justify-content-center align-items-center pagination_center'>
                                            <li class="page-item">
                                                <a class="page-link" href="#">1</a>
                                            </li>
                                            <li class="page-item active">
                                            <a class="page-link" href="#" aria-current="page">2</a>
                                            </li>
                                            <li  class="page-item">
                                                <a class="page-link" href="#">3</a>
                                            </li>
                                            </div>

                                            <li class="page-item"><a class="page-link" href="#">
                                                Next <i class="fa-solid fa-arrow-right" style={{marginLeft:"10px"}}></i>
                                                </a></li>
                                        </ul>
                                    </nav> */}

                                    <Stack spacing={2}>
                                        <Pagination count={20} shape="rounded" size='large' 
                                            siblingCount={width > 768 ? 1 : 0}
                                            boundaryCount={width > 768 ? 1 : 1}
                                            renderItem={(item) => (
                                                <PaginationItem
                                                    components={{
                                                    previous: () => <span> <i class="fa-solid fa-arrow-left" style={{marginRight:"10px"}}></i> {width>500 && "Previous"} </span>,
                                                    next: () => <span>{width > 500 && "Next"} <i class="fa-solid fa-arrow-right" style={{marginLeft:"10px"}}></i> </span>,
                                                }}
                                                {...item}
                                            />
                                        )}
                                        />
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