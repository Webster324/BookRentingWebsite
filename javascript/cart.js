//Add to cart
function addToCart(title,category){
    // return false if user does not login
    if (!isLogin()) return false;
    var username = sessionStorage.getItem("username");

    //Get account list from local storage
    var account = JSON.parse(localStorage.getItem("account"));

    // Failed to login as there's no account exist
    if (account == null) return false;

    //Get no of accounts
    var no = account.username.length;
    
    //find account and item into cart
    for (var i = 0; i < no; i++){
        if(account.username[i] == username){
            //Get no of item in cart
            var noCart = account.cart[i].title.length;
            for(var j = 0; j < noCart; j++){
                if(account.cart[i].title[j] == title) return false;
            }

            account.cart[i].title.push(title);
            account.cart[i].category.push(category);

            //Save account's information
            localStorage.setItem("account", JSON.stringify(account));
            return true;
        }
    }
}

//Remove from cart
function removeFromCart(title){
    // return false if user does not login
    if (!isLogin()) return false;
    var username = sessionStorage.getItem("username");

    //Get account list from local storage
    var account = JSON.parse(localStorage.getItem("account"));

    // Failed to login as there's no account exist
    if (account == null) return false;

    //Get no of accounts
    var no = account.username.length;

    //find account and item into cart
    for (var i = 0; i < no; i++){
        if(account.username[i] == username){
            //Get no of item in cart
            var noCart = account.cart[i].title.length;
            

            for(var j = 0; j < noCart; j++){
                if(account.cart[i].title[j] == title) {
                    account.cart[i].title.splice(j, 1);
                    account.cart[i].category.splice(j, 1);

                    //Save account's information
                    localStorage.setItem("account", JSON.stringify(account));
                    return true;
                }
            }
        }
    }
}

//Clear cart
function clearCart(){
    // return false if user does not login
    if (!isLogin()) return false;
    var username = sessionStorage.getItem("username");

    //Get account list from local storage
    var account = JSON.parse(localStorage.getItem("account"));

    // Failed to login as there's no account exist
    if (account == null) return false;

    //Get no of accounts
    var no = account.username.length;

    //find account and item into cart
    for (var i = 0; i < no; i++){
        if(account.username[i] == username){
            account.cart[i] = {
                title:[],
                category:[]
            };

            //Save account's information
            localStorage.setItem("account", JSON.stringify(account));
            return true;
        }
    }
}

//Get Cart List
function getCartList(){
    // return false if user does not login
    if (!isLogin()) return false;
    var username = sessionStorage.getItem("username");

    //Get account list from local storage
    var account = JSON.parse(localStorage.getItem("account"));

    // Failed to login as there's no account exist
    if (account == null) return false;

    //Get no of accounts
    var no = account.username.length;

    //find account and item into cart
    for (var i = 0; i < no; i++){
        if(account.username[i] == username){
            return account.cart[i];
        }
    }
}

function checkOut(data, clearcart){
    // Clear Cart if check out from cart
    // Save cart item before clear
    if (clearcart){
        data.cart = getCartList();
        clearCart();
    }else{
        data.cart = getRentNow();
    }
    
    // Store Checkout information in session storage
    sessionStorage.setItem("checkout", JSON.stringify(data));

    // Save address if user save this address for next time
    if (data.saveAddress == "on"){
        var username = sessionStorage.getItem("username");
        if (username == null) return false;

        //Fetch account's list
        var account = JSON.parse(localStorage.getItem("account"));

        //Get no of accounts
        var no = account.username.length;

        //find account and change password
        for (var i = 0; i < no; i++){
            if(account.username[i] == username){
                account.address[i].address = data.address;
                account.address[i].state = data.state;
                account.address[i].postcode = data.postcode;
                //Save account's information
                localStorage.setItem("account", JSON.stringify(account));
            }
        }
    }
    window.location.href = "success.html";
}


/* rent now function
*  The book will stored into cart if user clicked the rent button
*  The checkout page will only show the selected book, without showing book in the cart
*/
function rentNow(title,category){
    // return false if user does not login
    if (!isLogin()) return false;

    // add book into session storage
    var book = {
        title: title,
        category: category
    }
    // Store into session storage
    sessionStorage.setItem("rentingBook", JSON.stringify(book));
    return true;
}

// Get book renting now
function getRentNow(){
    return JSON.parse(sessionStorage.getItem("rentingBook"));
}