const SUPABASE_BASE_API_URL = '';
const SUPABASE_API_KEY = '';

export async function getSessionToken() {
    if (localStorage.getItem("access_token") == null || localStorage.getItem("access_token") == undefined) {
        return null;
    }
    const token = parseJWT(localStorage.getItem("access_token"));
    if (token == null) {
        return null;
    }
    console.log(token);
    var seconds = new Date().getTime() / 1000;
    if (token.exp - seconds < 30) {
        //It's time to refresh a token
        await refreshToken();
    }
    return localStorage.getItem("access_token");
}

export async function refreshToken() {
    const refreshToken = getRefreshToken();
    if (refreshToken == null || refreshToken == undefined) {
        return null;
    }

    try {
        const response = await fetch(`${SUPABASE_BASE_API_URL}auth/v1/token?grant_type=refresh_token`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'apikey': SUPABASE_API_KEY
            },
            body: JSON.stringify({ 'refresh_token': `${getRefreshToken()}` })
        })
        const data = await response.json();
        if (!response.ok) {
            console.log('Cannot refresh token: ', JSON.stringify(data));
            return null;
        } else {
            console.log('New token: ', JSON.stringify(data));
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            return data;
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

export function getRefreshToken() {
    return localStorage.getItem("refresh_token");
}

export function signup(email, password, err_element) {

    fetch(`${SUPABASE_BASE_API_URL}auth/v1/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'apikey': SUPABASE_API_KEY
        },
        body: JSON.stringify({ email: email, password: password })
    }).then(async response => {
        const data = await response.json();
        if (!response.ok) {
            console.log('Cannot create a new user: ', JSON.stringify(data));
            err_element.innerHTML = `Cannot create a new user. Please, check that you haven't created an account on this email before. If no - contact us.`;
        } else {
            console.log('User has been created: ', JSON.stringify(data));
            localStorage.setItem("is_signup", "true");
            localStorage.setItem("email", email);
            window.location.href = "/signin";
        }
    })
        .catch(error => {
            alert('There was an error!' + error);
        });
}

export function signin(email, password, err_element) {

    fetch(`${SUPABASE_BASE_API_URL}auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'apikey': SUPABASE_API_KEY
        },
        body: JSON.stringify({ "email": email, "password": password })
    }).then(async response => {
        const data = await response.json();
        if (!response.ok) {
            err_element.innerHTML = `Cannot login with ${email}. Check that the password is correct, you registered an account and confirmed this email address by clicking on a confirmation link in the email we sent to you. Still cannot login - feel free to contact us.`;
            console.log('Cannot login: ', JSON.stringify(data));
        } else {
            console.log('User has been logged: ', JSON.stringify(data));
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            localStorage.setItem("email", email);
            window.location.href = "/";
        }
    })
        .catch(error => {
            alert('There was an error!' + error);
        });
}

export async function getMe() {
    try {
        const response = await fetch(`${SUPABASE_BASE_API_URL}auth/v1/user`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'apikey': SUPABASE_API_KEY,
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        const data = await response.json();
        if (!response.ok) {
            console.log('Cannot load the current logged user: ', JSON.stringify(data));
            return null;
        } else {
            console.log('Logged user: ', JSON.stringify(data));
            localStorage.setItem("email", data.email);
            return data;
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

/*Fetch with timeout*/
async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 10000 } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(resource, {
        ...options,
        signal: controller.signal
    });
    clearTimeout(id);

    return response;
}

/*JWT*/
function parseJWT(token) {
    let base64Url = token.split('.')[1];
    if (base64Url == null) {
        return null;
    }
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}
