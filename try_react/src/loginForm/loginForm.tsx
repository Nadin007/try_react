import React, { useState } from 'react';

const emailPattern = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

const validateEmail = (email: string): string => {
    if (email.trim() === "") {
        return "This is a mandatory field and must be entered to continue.";
    }
    if (email.trim().search(emailPattern) === -1) {
        return "Invalid email.";
    }
    return "";
};

const validatePassword = (password: string): string => {
    if (password === "") {
        return "This is a mandatory field and must be entered to continue.";
    }
    if (password.length < 6) {
        return "Password must be at least 6 characters long.";
    }
    return ""
}

interface ILoginFormProps {
    onLoginClose: () => void;
    onForgotPassword: () => void;
}

export function Login (props: ILoginFormProps) {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [emailError, setEmailError] = useState("");
    let [passwordError, setPasswordError] = useState("");
    let submit = async () => {
        let emailErrorValidate = validateEmail(email);
        setEmailError(emailErrorValidate);
        let passwordErrorValidate = validatePassword(password);
        setPasswordError(passwordErrorValidate);
        if (emailErrorValidate === "" && passwordErrorValidate === "") {
            await fetch("/authenticate", {
                method: "POST",
                body: JSON.stringify({email: email, password})
            })
        }
    };

    return <dialog open>
        <div>
            <button onClick={props.onLoginClose}>Close</button>
        </div>
        <h3>Sign in with your Account</h3>
        <fieldset>
            <label>
                Email
                <input value={email} onInput={(e) => {setEmail(e.currentTarget.value)}} placeholder='example@email.com'></input>
                {emailError === "" ? undefined : <span>{emailError}</span>}
            </label>
            <label>
                Password
                <input value={password} onInput={(e) => {setPassword(e.currentTarget.value)}} type="password"></input>
                {passwordError === "" ? undefined : <span>{passwordError}</span>}
            </label>
        </fieldset>
        <div>
            <button onClick={props.onForgotPassword}>
                Forgot you password?
            </button>
        </div>
        <div>
            <button onClick={submit}>
                Sign In
            </button>
        </div>
    </dialog>
}