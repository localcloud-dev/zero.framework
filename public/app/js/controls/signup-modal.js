import {signup} from "../api/api-supabase.js";

class SignUpModal extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = /*html*/`
        <div class="signup_modal_content">
            <div class="signup_modal_title">Create Account</div>
            <input class="signup_modal_input" type="email" id="sigup_email">
            <input class="signup_modal_input" type="password" id="signup_password">
            <div class="signup_modal_terms_hint">By clicking “Create account”, you agree to the <a href="#"> TOS</a> and <a  href="#">Privacy Policy</a></div>
            <div class="signup_modal_black_btn" id="create_account_btn">Create account</div>
            <div class="signup_modal_error" id="signup_modal_error"></div>
            <div class="signup_modal_already_have_account">Already have an account? <a href="/signin">Log in</a></div>
        </div>
        `;

        let create_account_btn = this.querySelector("#create_account_btn");
        create_account_btn.onclick = () => {
            signup(this.querySelector("#sigup_email").value, this.querySelector("#signup_password").value, this.querySelector("#signup_modal_error"));
        };

    }
}

customElements.define("signup-modal", SignUpModal);