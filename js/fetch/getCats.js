
/** Get all categories as keys and their repeat count */
//---------------------------------------------------------

async function getCatCounter() {

    let counter={};
    const response = await fetch(`https://dummyjson.com/products?limit=1000`);
    const { products } = await response.json();
    products.forEach(p => { counter[p.category] = (counter[p.category] || 0) + 1;});
    return counter;
}


/** Get the top `t` most repeated categories */
//---------------------------------------------------------

async function getCats() {
    // get + sort
    const counter = await getCatCounter(); 

    var sortedCats = Object.entries(counter).sort((a, b) => b[1] - a[1]);

    sortedCats = sortedCats.map(([cat, _]) => cat);

    // Add "All"
    sortedCats.unshift("All");

    return sortedCats;
}



//------------action------------
getCats().then((sCat) => {
    console.log("sCat = ", sCat);
})


export{getCats}