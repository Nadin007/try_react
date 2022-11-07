import React, { useState } from 'react';
import "./loginForm.css";
import iconClose from 'bootstrap-icons/icons/x-lg.svg';

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

    return <>
    <dialog open className='login-form'>
        <div className='d-flex justify-content-end'>
            <button className='btn-close' onClick={props.onLoginClose}></button>
        </div>
        <h3>Sign in with your Account</h3>
        <fieldset>
            <label className='mb-3 row'>
                Email
                <input className='form-control input-custom' value={email} onInput={(e) => {
                    setEmail(e.currentTarget.value);
                    setEmailError("");
                    }} placeholder='example@email.com'></input>
                {emailError === "" ? undefined : <span>{emailError}</span>}
            </label>
            <label className='mb-3 row'>
                Password
                <input className='form-control input-custom' value={password} onInput={(e) => {
                    setPassword(e.currentTarget.value);
                    setPasswordError("");
                    }} type="password"></input>
                {passwordError === "" ? undefined : <span>{passwordError}</span>}
            </label>
        </fieldset>
        <div className='row d-grid gap-2 mx-auto'>

            <button className='btn btn-outline-success' onClick={submit}>
                Sign In
            </button>
            <button className='btn btn-link' onClick={props.onForgotPassword}>
                Forgot you password?
            </button>

        </div>
    </dialog>
    </>
}