function login(username, password){
    //Get account list from local storage
    var account = JSON.parse(localStorage.getItem("account"));
    
    // Failed to login as there's no account exist
    if (account == null) return false;
    
    //Get no of accounts
    var no = account.username.length;
    
    //find and match account
    for (var i = 0; i < no; i++){
        if(account.username[i] == username && account.password[i] == password){
            sessionStorage.setItem("username",username);
            return true;
        }
    }
    return false;
}

function logout(){
    sessionStorage.removeItem("username");
}

function signup(username, password, email, firstname, lastname, phoneNo){
    if(localStorage.getItem("account") == null){
        var account = {
            username: [username],
            firstname: [firstname],
            lastname: [lastname],
            phoneNo: [phoneNo],
            password: [password],
            email: [email],
            cart: [{
                title:[],
                category:[]
            }],
            address:[{
                address: null,
                state: null,
                postcode: null
            }]
        }
        //Save account's information into localStorage
        localStorage.setItem("account", JSON.stringify(account));
    }else{
        //Fetch account's list
        var account = JSON.parse(localStorage.getItem("account"));

        //Added new user information into list
        account.username.push(username);
        account.password.push(password);
        account.firstname.push(firstname);
        account.lastname.push(lastname);
        account.phoneNo.push(phoneNo);
        account.email.push(email);
        account.cart.push({
            title:[],
            category:[]
        });
        account.address.push({
            address: null,
            state: null,
            postcode: null
        });

        //Save account's information
        localStorage.setItem("account", JSON.stringify(account));
    }
}

function changePassword(newPassword){
    var username = sessionStorage.getItem("username");
    if (username == null) return false;

    //Fetch account's list
    var account = JSON.parse(localStorage.getItem("account"));

    //Get no of accounts
    var no = account.username.length;

    //find account and change password
    for (var i = 0; i < no; i++){
        if(account.username[i] == username){
            account.password[i] = newPassword;
            //Save account's information
            localStorage.setItem("account", JSON.stringify(account));
            return true;
        }
    }
    return false;
}

function isLogin(){
    var username = sessionStorage.getItem("username");
    if (username == null) return false;
    return true;
}

function checkLogin(){
    if(!isLogin()) window.location.href = "login.html";
}

function getAccountInformation(){
    var username = sessionStorage.getItem("username");
    if (username == null) return false;

    //Fetch account's list
    var account = JSON.parse(localStorage.getItem("account"));

    //Get no of accounts
    var no = account.username.length;

    //find account and change password
    for (var i = 0; i < no; i++){
        if(account.username[i] == username){
            return {
                username: account.username[i],
                firstname: account.firstname[i],
                lastname: account.lastname[i],
                phoneNo: account.phoneNo[i],
                password: account.password[i],
                email: account.email[i],
                cart: account.cart[i],
                address:account.address[i]
            }
        }
    }
    return null;
}