import { getCats } from "./fetch/getCats.js";
import { renderCards } from "./renderCards/renderCards.js";




/** dynamically create arrow left|right */
function createArrow(direct, scrollContainer) {

    let arrow = document.createElement("button");
    let arrowTxt = (direct === 'left') ? "<" : ">";
    let move = (direct === 'left') ? -200 : 200;

    arrow.innerHTML = arrowTxt;
    arrow.classList.add("arrow-btn", `${direct}-arrow`, "d-none"); 

    // event listner on the button
    arrow.addEventListener("click", () => {
        scrollContainer.scrollBy({ left: move, behavior: "smooth" });
    });

    return arrow;
}










/** create catContainer and and add data */

function createCatContainer(cats, header){

  // Create main container for categories
  let catContainer = document.createElement("div");
  catContainer.classList.add("container", "position-relative", "py-2", "d-flex", "align-items-center");

  // Scrollable Container for Categories
  let scrollContainer = document.createElement("div");
  scrollContainer.classList.add("scroll-container");

  // Left  Right arrows
  let leftArrow = createArrow("left", scrollContainer);
  let rightArrow = createArrow("right", scrollContainer);

  // Create row for categories
  let row = document.createElement("div");
  row.classList.add("d-flex");

  cats.forEach((c, index) => {

    console.log(`Rendering Category ${index + 1}:`, c); // debug

    let col = document.createElement("div");
    col.classList.add("px-3");

    let a = document.createElement("button");
    a.classList.add("category-text", "btn");
    a.textContent = c;

    // <------maintainance
    a.onclick = () => renderCards(1,a.textContent,1); // always pageNum =1 when clicking category
  


    col.appendChild(a);
    row.appendChild(col);
  });

  console.log("row =", row); //debug

  scrollContainer.appendChild(row);
  catContainer.append(leftArrow, scrollContainer, rightArrow);
  header.appendChild(catContainer);


  return { catContainer, scrollContainer, leftArrow, rightArrow };
  
}










async function insertCats() {

    const cats = await getCats();
    
    const header = document.querySelector("header");
    const { scrollContainer: scContainer, leftArrow, rightArrow } = createCatContainer(cats, header);

    // Hide scrollbar 
    scContainer.style.overflowX = "auto";
    scContainer.style.scrollBehavior = "smooth";
    scContainer.style.whiteSpace = "nowrap";
    scContainer.style.flexWrap = "nowrap";
    scContainer.style.width = "100%";

    // Hide scrollbar (cross-browser support)
    scContainer.style.scrollbarWidth = "none"; // for firefox
    scContainer.classList.add("hide-scrollbar");

    // Update arrows visibility
    function updateArrows() {
        leftArrow.classList.toggle("d-none", scContainer.scrollLeft <= 0);
        rightArrow.classList.toggle("d-none", scContainer.scrollLeft + scContainer.clientWidth >= scContainer.scrollWidth);
    }

    // Listen for scrolling
    scContainer.addEventListener("scroll", updateArrows);

    // Ensure arrows are updated after a small delay
    setTimeout(updateArrows, 500);
}

export { insertCats };
