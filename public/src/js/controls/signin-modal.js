import {signin} from "../api/api-supabase.js";

class SigninModal extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = /*html*/`
        <div class="signup_modal_content">
            <div class="signup_modal_title">Log In</div>
            <div class="signup_modal_or">or</div>
            <input class="signup_modal_input" type="email" id="login_email">
            <input class="signup_modal_input" type="password" id="login_password">
            <div class="signup_modal_black_btn" id="login_btn">Log In</div>
            <div class="signup_modal_error" id="login_modal_error"></div>
            <div class="signup_modal_already_have_account"><a href="/reset_passwd">Reset password</a></div>
            <div class="signup_modal_already_have_account">No account? <a href="/signup">Create one</a></div>
        </div>
        `;

        let create_account_btn = this.querySelector("#login_btn");
        create_account_btn.onclick = () => {
            signin(this.querySelector("#login_email").value, this.querySelector("#login_password").value, this.querySelector("#login_modal_error"));
        };

    }
}

customElements.define("signin-modal", SigninModal);