import {signin} from "../api/api-supabase.js";

class SigninModal extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = /*html*/`
        <section>
            <form>
                <header><h2>Log In</h2></header>
                <input type="email" id="login_email">
                <input type="password" id="login_password">
                <button id="login_btn">Log In</button>
                <div class="signup_error" id="login_modal_error"></div>
                <div><a href="/reset_passwd">Reset password</a></div>
                <div>No account? <a href="/signup">Create one</a></div>
            </form>
        <section>
        `;

        let create_account_btn = this.querySelector("#login_btn");
        create_account_btn.onclick = () => {
            signin(this.querySelector("#login_email").value, this.querySelector("#login_password").value, this.querySelector("#login_modal_error"));
        };

    }
}

customElements.define("signin-modal", SigninModal);