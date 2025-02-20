

/** fetch data by category */
async function fetchDataByCat(productPerPage, pageNum, cat) {

    // internet consisitency...
    try {

        // calc skip
        const skip = (pageNum - 1) * productPerPage;

        console.log("productsperPage = ", productPerPage);  // debug
        console.log("skip = ", skip);                       // debug

        // get data
        const URL = `https://dummyjson.com/products/category/${cat}?limit=${productPerPage}&skip=${skip}`;
        const response = await fetch(URL);
        const { products } = await response.json();

        return products;
    } 

    catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}


export {fetchDataByCat}