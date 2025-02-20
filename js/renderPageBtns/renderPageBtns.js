import { renderCards } from "../renderCards/renderCards.js";
import { getPageArray } from "./H_renderPageBtns.js";

// we can get category from url
// we can get current page from url


//Change current page in URL
function updateCurrentPageInURL(newPage) {
    let url = new URL(window.location.href);
    url.searchParams.set("currentPage", newPage);
    window.history.replaceState({}, "", url);
}


async function renderPageBtns(currentPage) {
    
    // Get page numbers array
    let pageArrays = await getPageArray(currentPage);

    // Access main
    let main = document.getElementsByTagName("main")[0];

    // Remove old pagination
    let oldPagination = document.getElementById("pagination-container");
    if (oldPagination) {
        oldPagination.remove();
    }

    // Create parent div for pagination
    let paginDiv = document.createElement("div");
    paginDiv.id = "pagination-container";
    paginDiv.classList.add("d-flex", "justify-content-center", "mt-5"); // Centered and add margin-top
    paginDiv.setAttribute("aria-label", "Page navigation");

    // Create unordered list
    let ul = document.createElement("ul");
    ul.classList.add("pagination");

    pageArrays.pop(); // Remove last element
    pageArrays.shift(); // Remove first element

    console.log("elements pagination = ", pageArrays);

    // Create page number buttons
    pageArrays.forEach((element) => {
        let li = document.createElement("li");
        li.classList.add("page-item");

        let a = document.createElement("a");
        a.classList.add("page-link", "p-4");

        if (element === "...") {
            // Disable ellipsis
            li.classList.add("disabled");
            a.innerText = "...";
            a.href = "#";
        } else {
            a.innerText = element;
            if (element == currentPage) {
                li.classList.add("active");
            }
            a.onclick = () => {
                let params = new URLSearchParams(window.location.search);
                let catName = params.get("catName");

                updateCurrentPageInURL(element);

                renderCards(element, catName, 0);
            };
        }

        li.appendChild(a);
        ul.appendChild(li);
    });

    // Append pagination to main
    paginDiv.appendChild(ul);
    main.appendChild(paginDiv);
}



export {renderPageBtns}

