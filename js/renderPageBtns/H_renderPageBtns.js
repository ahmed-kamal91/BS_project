function fetchTotalNumByCat(catName) {

    return fetch(`https://dummyjson.com/products/category/${catName}?select=id`)
        .then(response => response.json())
        .then(data => {
            console.log("Total products:", data.total);
            return data.total; 
        })
        .catch(error => {
            console.error("Error:", error);
            return 0;
        });
}

function fetchTotalNumAll(){

    return fetch(`https://dummyjson.com/products?limit=1`)
    .then(response => response.json())
    .then(data => {
        console.log("Total products:", data.total);
        return data.total; 
    })
    .catch(error => {
        console.error("Error:", error);
        return 0;
    });

}



async function getPageArray(currentPage) {

    // URL: get catName
    let params = new URLSearchParams(window.location.search);
    let catName = params.get("catName"); 

    var totalProducts;

    //-----DEBUG----
    console.log("-------------------------catName = ", catName);
    //--------------

    // CHECK CATEGORY
    if(catName == "All")
        { totalProducts = await fetchTotalNumAll();}
    else 
        {totalProducts = await fetchTotalNumByCat(catName); }
    

    let totalPages = Math.ceil(totalProducts / 12);

    // Handle case where there is only one page
    if (totalPages === 1) {
        return ["«", 1, "»"]; 
    }

    let pages = [];
    const leftArrow = "«";
    const rightArrow = "»";

    pages.push(1); // Always show first page

    if (currentPage > 3) {
        pages.push("...");
    }

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (currentPage < totalPages - 2) {
        pages.push("...");
    }

    pages.push(totalPages); // Always show last page

    return [leftArrow, ...pages, rightArrow];
}

export { getPageArray };
