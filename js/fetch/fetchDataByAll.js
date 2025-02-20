import { renderPageBtns } from "../renderPageBtns/renderPageBtns.js";

//---------------------------------------------
/** return all products data after fetching  */
/** get data based on general category (all category) */
//---------------------------------------------


// pageNum : number of the page (from paginatation list at bottom)

async function fetchDataByAll(productPerPage, pageNum) {

    // internet consisitency...
    try {

        // calc skip
        let skip = ( pageNum -1 ) * productPerPage;

        // get data
        const response = await fetch(`https://dummyjson.com/products?limit=${productPerPage}&skip=${skip}`);
        const { products } = await response.json();
        return products;
    } 
    // problem....
    catch (error) {
        console.error("Error fetching products:", error);
    }

    // render pagination
    renderPageBtns();
}


export {fetchDataByAll}

//-----------------------------important-------------------------------
// num of pages : will be taken from the getCategories  all repeatence 
// [this for range of pages in the pagination list at the bottom]
//---------------------------------------------------------------------
