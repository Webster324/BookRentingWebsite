function getBooks(category){
    $.ajax({
        url: `https://hieng-50dc5-default-rtdb.asia-southeast1.firebasedatabase.app/${category}.json?print=pretty`
    }).then(function(json) {
        for(var i = 0; i < json.length;i++){
            generateBookElement(json[i], category)
        }
    });
}

// Get the book details
function getBook(category, title, callbackMethod){
    $.ajax({
        url: `https://hieng-50dc5-default-rtdb.asia-southeast1.firebasedatabase.app/${category}.json?print=pretty`
    }).then(function(json) {
        for(var i = 0; i < json.length;i++){
            if(json[i].title == title)
                callbackMethod(json[i], category)
        }
    });
}


//Generate  Book Element
function generateBookElement(bookDetails, category){
    var bookListContainer = document.getElementById("book-list");

    var col = document.createElement("div");
    col.classList.add("col");
    bookListContainer.appendChild(col);

    //Create a div containing book details
    var bookCard = document.createElement("div");
    bookCard.classList.add("card","shadow-sm");
    bookCard.style.overflow = "hidden";
    col.appendChild(bookCard);

    //Create Book Cover Image Element
    var img = document.createElement("img");
    img.src = "./image/" + category + "/" + bookDetails.img;
    img.alt = bookDetails.title;
    img.style.height = "300px";
    img.style.width = "auto !important";
    img.style.margin = "auto";
    img.style.cursor = "pointer";
    img.onclick = function(){window.location.href = `bookDesc.html?title=${bookDetails.title}&cat=${category}`};
    bookCard.appendChild(img);

    //Create Card Body
    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    bookCard.appendChild(cardBody);

    //Create Book Title Element
    var bookTitle = document.createElement("h5");
    bookTitle.innerHTML = bookDetails.title;
    bookTitle.style.height = "100px";
    bookTitle.style.overflow = "hidden";
    bookTitle.style.whiteSpace = "wrap"
    bookTitle.style.textOverflow = "ellipsis";
    bookTitle.style.cursor = "pointer";
    bookTitle.onclick = function(){window.location.href = `bookDesc.html?title=${bookDetails.title}&cat=${category}`};
    cardBody.appendChild(bookTitle);

    //Create Book Author Element
    var author = document.createElement("p");
    author.innerHTML = bookDetails.author;
    author.style.textOverflow = "ellipsis";
    author.style.whiteSpace = "nowrap";
    cardBody.appendChild(author);

    //Create Price Element
    var price = document.createElement("p");
    price.innerHTML = "RM" + bookDetails.price + "/month";
    cardBody.appendChild(price);

    var buttonContainer = document.createElement("div");
    buttonContainer.classList.add("d-flex","justify-content-center","align-items-center");
    cardBody.appendChild(buttonContainer);

    var buttonGroup = document.createElement("div");
    buttonGroup.classList.add("btn-group");
    buttonContainer.appendChild(buttonGroup);

    //Add To Cart Button
    var button = document.createElement("button");
    button.classList.add("rent-button", "btn", "btn-primary", "rounded-pill", "px-3", "mx-3");
    button.onclick = function(){addToCart(bookDetails.title, category)};
    button.innerHTML = "Add To Cart";
    buttonContainer.appendChild(button);
    
    //Rent Button
    var button = document.createElement("button");
    button.classList.add("rent-button", "btn", "btn-success", "rounded-pill", "px-3");
    button.innerHTML = "Rent Now";
    button.onclick = function(){
        //Add to cart and head to checkout page
        rentNow(bookDetails.title, category);
        window.location.href = `checkOut.html?rentnow=true`;
    };
    buttonContainer.appendChild(button);
}

// Get Top 10 Hottest Book
function getTop10(){
    $.ajax({
        url: `https://hieng-50dc5-default-rtdb.asia-southeast1.firebasedatabase.app/bestselling.json?print=pretty`
    }).then(function(json) {
        for(var i = 0; i < json.length;i++){
            getBook(
                json[i].category,
                json[i].title,
                generateBookElement
            );
        }
    });
}