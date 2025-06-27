import { createSlice } from "@reduxjs/toolkit";
import { productHomePageReviewsData ,productFilterApplyingPaginate, productFilterPaginate, productFilterApplying ,productFilterPageDefault, productReviewNext,productHomePageTopRatedNext, productHomePageTopRatedData, productHomePageNewArrivalsNext, productHomePageNewArrivalsData, productSpecificData  , productReviewRegister} from "./productActions";
import { backendURL } from "../../store/Constants";

const product_state = {
    home_topRated: [],
    home_newArrivals: [],
    home_reviews:[],
    home_page_data_loading: false,
    home_page_data_error: null,
    home_page_data_success: null,

    specific_product: null,
    specific_product_loading: false,
    specific_product_error: null,
    specific_product_success: null,

    review_register: null,
    review_register_loading: false,
    review_register_error: null,
    review_register_success: null,
    next_newest_loading : false , 
    next_top_loading : false , 

    next_review_loading : false,
    next_review_error : false,

    // filter_page
    filter_product : [],
    filter_data_loading: false,
    filter_data_error: null,
    filter_data_success: null,

    is_filtered : false,


}

const productSlice = createSlice({
    name: "product",
    initialState: product_state,
    reducers: {},
    extraReducers: (builder) => {
        builder

        .addCase(productHomePageReviewsData.pending, (state) => {
            state.home_page_data_loading = true;
            state.home_page_data_error = null;
        })
        
        .addCase(productHomePageReviewsData.fulfilled, (state , action) => {
            state.home_page_data_loading = false;
            state.home_page_data_error = null;
            state.home_reviews =action.payload
        })

        .addCase(productHomePageReviewsData.rejected, (state , action) => {
            state.home_page_data_loading = false;
            state.home_page_data_error = action.payload;
        })

// ============================================================
// ============================================================
// ============================================================
// ============================================================
// ============================================================
        //home page top rated  
        .addCase(productHomePageTopRatedData.pending, (state) => {
            state.home_page_data_loading = true;
            state.home_page_data_error = null;
        })
        
        .addCase(productHomePageTopRatedData.fulfilled, (state , action) => {
            state.home_page_data_loading = false;
            state.home_page_data_error = null;
            state.home_topRated =action.payload
        })
        
        .addCase(productHomePageTopRatedData.rejected, (state , action) => {
            state.home_page_data_loading = false;
            state.home_page_data_error = action.payload;
        })
        


// ============================================================
// ============================================================
// ============================================================
// ============================================================
// ============================================================
        //home page new arrivals     
        
        .addCase(productHomePageNewArrivalsData.pending, (state) => {
            state.home_page_data_loading = true;
            state.home_page_data_error = null;
        })
        
        .addCase(productHomePageNewArrivalsData.fulfilled, (state , action) => {
            state.home_page_data_loading = false;
            state.home_page_data_error = null;
            state.home_newArrivals =action.payload
        })

        .addCase(productHomePageNewArrivalsData.rejected, (state , action) => {
            state.home_page_data_loading = false;
            state.home_page_data_error = action.payload;
        })

// ============================================================
// ============================================================
// ============================================================
// ============================================================
// ============================================================

        // .addCase(productHomePageData.fulfilled, (state, action) => {
        //     state.home_page_data_loading = false;
        //     state.home_page_data_success = true;
        //     state.products = action.payload;
        //     state.products.newArrivals.results.map((product , index , array) => {
                
        //         const categories = {
        //         1: "Hoddie",
        //         2: "T-Shirts",
        //         3: "Shirts",
        //         4: "Shorts",
        //         5: "Jeans",
        //         };
        //         product.category = categories[product.category] || "Unknown specialty";
        //         product.available_discount = product.available_discount * 100


        //     })
        //     state.products.topRated.results.map((product , index , array) => {
                
        //         const categories = {
        //         1: "Hoddie",
        //         2: "T-Shirts",
        //         3: "Shirts",
        //         4: "Shorts",
        //         5: "Jeans",
        //         };
        //         product.category = categories[product.category] || "Unknown specialty";
        //         product.available_discount = product.available_discount * 100


        //     })

        // })


        
// =======================================================================
// =======================================================================
// =======================================================================
// =======================================================================
// =======================================================================
        .addCase(productHomePageNewArrivalsNext.pending, (state) => {
            state.next_newest_loading = true;
            state.home_page_data_error = null;
        })
        
        .addCase(productHomePageNewArrivalsNext.fulfilled, (state , action) => {
            state.next_newest_loading = false;
            state.home_page_data_error = null;
            console.log(action.payload)
            state.home_newArrivals.next =action.payload.next
            state.home_newArrivals.previous=action.payload.previous
            state.home_newArrivals.count =action.payload.count
            state.home_newArrivals.results.push(...action.payload.results)
        })
        
        .addCase(productHomePageNewArrivalsNext.rejected, (state , action) => {
            state.next_newest_loading = false;
            state.home_page_data_error = action.payload;
        })


// ======================
// ======================
// ======================


        .addCase(productHomePageTopRatedNext.pending, (state) => {
            state.next_top_loading = true;
            state.home_page_data_error = null;
        })
        
        .addCase(productHomePageTopRatedNext.fulfilled, (state , action) => {
            state.next_top_loading = false;
            state.home_page_data_error = null;
            console.log(action.payload)
            state.home_topRated.next =action.payload.next
            state.home_topRated.previous=action.payload.previous
            state.home_topRated.count =action.payload.count
            state.home_topRated.results.push(...action.payload.results)
        })

        .addCase(productHomePageTopRatedNext.rejected, (state , action) => {
            state.next_top_loading = false;
            state.home_page_data_error = action.payload;
        })

// =======================================================================
// =======================================================================
// =======================================================================
// =======================================================================
// =======================================================================

        .addCase(productSpecificData.pending, (state) => {
            state.specific_product_loading = true;
            state.specific_product_error = null;
        })

        .addCase(productSpecificData.fulfilled, (state, action) => {
            state.specific_product_loading = false;
            state.specific_product_success = true;
            state.specific_product = action.payload;
            // Loop through image1, image2, image3 and prepend backendURL if they exist
            for (let i = 1; i <= 3; i++) {
                const key = `image${i}`;
                if (state.specific_product.product_data[key]) {
                    state.specific_product.product_data[key] = `${backendURL}${state.specific_product.product_data[key]}`;
                }
            }
            const categories = {
                1: "Hoddie",
                2: "T-Shirts",
                3: "Shirts",
                4: "Shorts",
                5: "Jeans",
            };
            state.specific_product.product_data.category = categories[state.specific_product.product_data.category] || "Unknown specialty";
            state.specific_product.product_data.available_discount = state.specific_product.product_data.available_discount * 100

            state.specific_product.AlsoLikeProduct.map((product , index , array) => {
                product.available_discount = product.available_discount * 100
            })

        })


        .addCase(productSpecificData.rejected, (state, action) => {
            state.specific_product_loading = false;
            state.specific_product_error = action.payload;
        })
    
    
// =======================================================================
// =======================================================================
// =======================================================================
// =======================================================================
// =======================================================================
        .addCase(productReviewRegister.pending, (state) => {
            state.review_register_loading = true;
            state.review_register_error = null;
        })
        
        .addCase(productReviewRegister.fulfilled, (state , action) => {
            state.review_register_loading = false;
            state.review_register_error = null;
            state.review_register_success = true;

            state.review_register =action.payload
        })

        .addCase(productReviewRegister.rejected, (state , action) => {
            state.review_register_loading = false;
            state.review_register_error = action.payload;
        })
    
// =======================================================================
// =======================================================================
// =======================================================================
// =======================================================================
        
        .addCase(productReviewNext.pending, (state) => {
            state.next_review_loading = true;
            state.next_review_error = null;
        })
        
        .addCase(productReviewNext.fulfilled, (state , action) => {
            state.next_review_loading = false;
            state.next_review_error = null;

            state.specific_product.Reviews.count =action.payload.Reviews.count
            state.specific_product.Reviews.next =action.payload.Reviews.next
            state.specific_product.Reviews.previous =action.payload.Reviews.previous
            state.specific_product.Reviews.results.push(...action.payload.Reviews.results)
        })

        .addCase(productReviewNext.rejected, (state , action) => {
            state.next_review_loading = false;
            state.next_review_error = action.payload;
        })
    
// =======================================================================
// =======================================================================
// =======================================================================
// =======================================================================
        
        .addCase(productFilterPageDefault.pending, (state) => {
            state.filter_data_loading = true;
            state.filter_data_error = null;
        })
        
        .addCase(productFilterPageDefault.fulfilled, (state , action) => {
            state.filter_data_loading = false;
            state.filter_data_error = null;

            state.filter_product = action.payload
            state.is_filtered = false
            // state.specific_product.Reviews.count =action.payload.Reviews.count
            // state.specific_product.Reviews.next =action.payload.Reviews.next
            // state.specific_product.Reviews.previous =action.payload.Reviews.previous
            // state.specific_product.Reviews.results.push(...action.payload.Reviews.results)
        })

        .addCase(productFilterPageDefault.rejected, (state , action) => {
            state.filter_data_loading = false;
            state.filter_data_error = action.payload;
        })
    
// =======================================================================
// =======================================================================
// =======================================================================
// =======================================================================
        
        .addCase(productFilterApplying.pending, (state) => {
            state.filter_data_loading = true;
            state.filter_data_error = null;
        })
        
        .addCase(productFilterApplying.fulfilled, (state , action) => {
            state.filter_data_loading = false;
            state.filter_data_error = null;

            state.filter_product = action.payload
            state.is_filtered = true
            // state.specific_product.Reviews.count =action.payload.Reviews.count
            // state.specific_product.Reviews.next =action.payload.Reviews.next
            // state.specific_product.Reviews.previous =action.payload.Reviews.previous
            // state.specific_product.Reviews.results.push(...action.payload.Reviews.results)
        })
        
        .addCase(productFilterApplying.rejected, (state , action) => {
            state.filter_data_loading = false;
            state.filter_data_error = action.payload;
            state.is_filtered = false
        })



// =======================================================================
// =======================================================================
// =======================================================================
// =======================================================================
        
        .addCase(productFilterPaginate.pending, (state) => {
            state.filter_data_loading = true;
            state.filter_data_error = null;
        })
        
        .addCase(productFilterPaginate.fulfilled, (state , action) => {
            state.filter_data_loading = false;
            state.filter_data_error = null;

            state.filter_product = action.payload
            console.log(action.payload)

            // state.specific_product.Reviews.count =action.payload.Reviews.count
            // state.specific_product.Reviews.next =action.payload.Reviews.next
            // state.specific_product.Reviews.previous =action.payload.Reviews.previous
            // state.specific_product.Reviews.results.push(...action.payload.Reviews.results)
        })

        .addCase(productFilterPaginate.rejected, (state , action) => {
            state.filter_data_loading = false;
            state.filter_data_error = action.payload;
        })

// =======================================================================
// =======================================================================
// =======================================================================
// =======================================================================
        
        .addCase(productFilterApplyingPaginate.pending, (state) => {
            state.filter_data_loading = true;
            state.filter_data_error = null;
        })
        
        .addCase(productFilterApplyingPaginate.fulfilled, (state , action) => {
            state.filter_data_loading = false;
            state.filter_data_error = null;

            state.filter_product = action.payload
            state.is_filtered = true
            console.log(action.payload)

            // state.specific_product.Reviews.count =action.payload.Reviews.count
            // state.specific_product.Reviews.next =action.payload.Reviews.next
            // state.specific_product.Reviews.previous =action.payload.Reviews.previous
            // state.specific_product.Reviews.results.push(...action.payload.Reviews.results)
        })

        .addCase(productFilterApplyingPaginate.rejected, (state , action) => {
            state.filter_data_loading = false;
            state.filter_data_error = action.payload;
        })
    }
})

export default productSlice.reducer;