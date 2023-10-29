import {signup} from "../api/api-supabase.js";

class SignUpModal extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = /*html*/`
        <section>
            <form>
                <header><h2>Create Account</h2></header>
                <input type="email" id="sigup_email">
                <input type="password" id="signup_password">
                <p>By clicking “Create account”,
                <br>you agree to the <a href="#"> TOS</a> and <a  href="#">Privacy Policy</a></p>
                <button id="create_account_btn">Create account</button>
                <div id="signup_modal_error"></div>
                <div>Already have an account? <a href="/signin">Log in</a></div>
            </form>
        </section>
        `;

        let create_account_btn = this.querySelector("#create_account_btn");
        create_account_btn.onclick = () => {
            signup(this.querySelector("#sigup_email").value, this.querySelector("#signup_password").value, this.querySelector("#signup_modal_error"));
        };

    }
}

customElements.define("signup-modal", SignUpModal);