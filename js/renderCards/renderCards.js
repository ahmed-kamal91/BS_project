import { create, get } from "./H_renderCards.js";
import { fetchDataByCat } from "../fetch/fetchDataByCat.js";
import { renderPageBtns } from "../renderPageBtns/renderPageBtns.js";
import { fetchDataByAll } from "../fetch/fetchDataByAll.js";


function addcurrentPage(){

    let currentPage = 1;
    let url = new URL(window.location.href);
    url.searchParams.set("currentPage", currentPage);
    window.history.replaceState({}, "", url);
}



// add variable in url
addcurrentPage();

/**
 * 
 * pageNum : page number
 * catName : category name
 * origin : function fired from category
 * begin : for working when home page begin
 */

async function renderCards(pageNum,catName, origin) {

    if(origin){
        // initialize currentPage in url
        addcurrentPage();
    }


    // add categoryName to URL
    let url = new URL(window.location.href);
    url.searchParams.set("catName", catName);
    window.history.replaceState({}, "", url); 

    if(catName != "All"){
        var data = await fetchDataByCat(12, pageNum, catName); // fixed 12 products per page
    }
    else{
        var data = await fetchDataByAll(12,pageNum); // it is ALLL , so there is no category
    }

    const main = get("main", "tag")[0];
    main.innerHTML = "";

    let dataContainer = create("div", "container");
    let row = create("div", "row g-3");  

    dataContainer.appendChild(row);
    main.appendChild(dataContainer);

    data.forEach((product) => {

        // create [col, card]
        let col = create("div", "col-12 col-sm-6 col-md-4 col-lg-3");
        let card = create("div", "card p-2 border-0 shadow-sm"); // Light shadow for card

        // Image container (Relative for positioning)
        let cImgContainer = create("div", "position-relative bg-white rounded-3 shadow-sm");  
        
        let cImg = create("img", "card-img-top w-100");
        cImg.style.backgroundColor = "#f8f8f9";
        cImg.style.borderRadius = "10px"; 
        cImg.src = product.thumbnail; 

        // Wishlist Button (Heart Icon) - Top Right
        let wishlistBtn = create("button", "btn position-absolute top-0 end-0 m-2 shadow-sm d-flex justify-content-center align-items-center");
        wishlistBtn.style.backgroundColor = "white";
        wishlistBtn.style.width = "50px";
        wishlistBtn.style.height = "50px";
        wishlistBtn.innerHTML = `<i class="bi bi-heart fs-2" style="color: rgb(140, 140, 140);"></i>`;  

        // Cart Button (Cart Icon) - Bottom Right
        let cartBtn = create("button", "btn position-absolute bottom-0 end-0 m-2 shadow-sm d-flex justify-content-center align-items-center");
        cartBtn.style.backgroundColor = "white";
        cartBtn.style.width = "50px";
        cartBtn.style.height = "50px";
        cartBtn.innerHTML = `<i class="bi bi-cart-plus fs-2" style="color:rgb(140, 140, 140);"></i>`; 
        
        // Rating and Stock Badge - Bottom Left
        let badge = create("span", "position-absolute bottom-0 start-0 m-2 p-2 shadow-sm rounded-pill bg-white");
        badge.innerHTML = `<b>${product.rating}</b> <i class="bi bi-star-fill" style="color: green;"></i> (${product.stock})`;
        
        
        // Append buttons inside image container
        cImgContainer.append(cImg, wishlistBtn, cartBtn, badge);
        
        let cBody = create("div", "card-body");

        // create + addData
        let cTitle = create("h5", "card-title fw-bold");
        cTitle.innerText = product.title;

        // calculate the price before discount
        let priceBefore = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);

        // Create pricing info element
        let pricingInfo = create("div", "card-text");
        pricingInfo.innerHTML = `
            <span style="font-size: 0.9rem;">EGP</span> 
            <span style="font-size: 1.5rem; font-weight: bold;">${product.price}</span> 
            <s style="font-size: 0.9rem; color: gray;">${priceBefore}</s> 
            <span style="font-size: 0.9rem; color: green;">${product.discountPercentage}% OFF</span>
        `;
        
        //creat experss Image + shipping info
        let expressImg = create("img","");
        expressImg.src = "https://f.nooncdn.com/s/app/com/noon/images/fulfilment_express_v3-en.svg";

        let shipping = create("div", "card-text");
        shipping.innerHTML = `<img src="https://f.nooncdn.com/s/app/com/noon/images/fulfilment_express_v3-en.svg"> <span style="font-size: 0.8rem;">${product.shippingInformation}</span>`
        

        


        cBody.append(cTitle, pricingInfo, shipping);
        card.append(cImgContainer, cBody);
        
        col.appendChild(card);  
        row.appendChild(col);  
    });


    // Get current page from URL
    let params = new URLSearchParams(window.location.search);
    let currentPage = parseInt(params.get("currentPage"));

    // render pagination
    await renderPageBtns(currentPage);

}

export { renderCards };