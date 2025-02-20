/**create + add class name */
function create(elemName, className) {
    let element = document.createElement(elemName);
    if (className) element.classList.add(...className.split(" "));
    return element;
}



/** get element by id */
function get(specifier, by){
    switch(by){
        case "tag": return document.getElementsByTagName(specifier);
        case "id" : return document.getElementById(specifier);
    }
}

export{create, get}