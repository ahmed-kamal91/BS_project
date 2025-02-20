import { insertCats } from "./insertCats.js"; 
import { fetchDataByAll } from "./fetch/fetchDataByAll.js";
import { renderCards } from "./renderCards/renderCards.js";



let currentPage = 1;
let url = new URL(window.location.href);
url.searchParams.set("currentPage", currentPage);
window.history.replaceState({}, "", url);



renderCards(currentPage,"All",0);



// insert categories
await insertCats();







