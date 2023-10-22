/*Views*/
import {homeHTML} from "./views/home.js";
import {signupHTML} from "./views/signup.js";
import {signinHTML} from "./views/login.js";

/*Utils*/
import {showNotification} from "./utils/utils.js"

/*API*/
import {getSessionToken, getMe} from "./api/api-supabase.js";

const routes = {
    "/": { title: "Home" },
    "/signin": { title: "Login" },
    "/signup": { title: "Registration" }
};

async function router() {

    //Check if the current URL has query parameters
    handleURLParametersIfExist();

    //Try to get a session token and check if it's valid
    let logged_user = getLoggedUser();

    //Handle routes
    let route = routes[location.pathname];
    if (route) {
        document.title = route.title;

        if (location.pathname == '/signin'){
            app.innerHTML = signinHTML();
            if (localStorage.getItem("is_signup") == "true"){
                localStorage.removeItem("is_signup");
                showNotification(`Check your inbox and click on the link we sent to ${localStorage.getItem("email")}. Don't forget to check your Spam folder.`);
            }
        }else if (location.pathname == '/signup'){
            app.innerHTML = signupHTML();
        }else {
            if (session_token == null || session_token == ''){
                app.innerHTML = signupHTML();
            }else{
                //If a user tries to open something except /signin and /signup and we cannot logged info about that user - we show /signin screen
                if (logged_user == null){
                    window.location.href = "/signin";
                    return;
                }
                app.innerHTML = homeHTML();
            }
        }

    } else {
        //If variable routes hasn't this route - open the home of the app
        history.replaceState("", "", "/");
        router();
    }
};

async function handleURLParametersIfExist(){
    let current_url = location.href;
    const paramArr = current_url.slice(current_url.indexOf('#') + 1).split('&');
    const params = {};
    paramArr.map(param => {
        const [key, val] = param.split('=');
        params[key] = decodeURIComponent(val);
    })

    //Check if this is a redirection with access_token and refresh_token. For example, after a user clicks on a confirmation link in the e-mail
    if (params["access_token"] != undefined && params["refresh_token"] != undefined){
        localStorage.setItem("access_token",params["access_token"]);
        localStorage.setItem("refresh_token",params["refresh_token"]);
        window.location.href = "/";
        return;
    }
}

async function getLoggedUser(){
    var logged_user = null;
    let session_token = await getSessionToken();

    if (session_token != null){
        logged_user = await getMe();
    }
    return logged_user;
}

// Update router
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);