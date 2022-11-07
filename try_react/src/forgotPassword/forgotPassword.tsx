import React, { useState } from 'react';
import './forgotPassword.css'

const emailPattern = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

const validateEmail = (email: string): string => {
    if (email.trim() === "") {
        return "This is a mandatory field and must be entered to continue.";
    }
    if (email.trim().search(emailPattern) === -1) {
        return "Invalid email.";
    }
    return ""
}

interface IForgotPasswordProps {
    onForgotPassword: () => void
}

export function ForgotRassword (props: IForgotPasswordProps) {
    let [email, setEmail] = useState("")
    let [emailError, setemailError] = useState("")
    let submit = async () => {
        let emailErrorValidate = validateEmail(email);
        setemailError(emailErrorValidate);
        if (emailError === "") {
            await fetch(
                "/forgotpassword", {
                    method: "POST",
                    body: JSON.stringify({email: email}),
                    headers: {
                        Accept: "json",
                        "Accept-language": "en-CA,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,en-GB;q=0.6,en-US;q=0.5"
                    }
                }
            )
        }
    }
    
    return <dialog open className='forgot-form'>
        <div>
            <div className='d-flex justify-content-end'>
            <button className='btn-close' onClick={props.onForgotPassword}></button>
            </div>
            <h2>Forgot Password</h2>
            <div>Enter your account email.</div>
            <div>Password change instructions will be sent to this email.</div>
            <fieldset className='mt-2'>

                <label className='mb-3 row'>Email
                    <input className='form-control input-custom' value={email} onInput = {(e) => {
                        setEmail(e.currentTarget.value);
                        setemailError("");
                    }} placeholder='example@email.com'></input>
                    {emailError === "" ? undefined : <span>{emailError}</span>}
                </label>

            </fieldset>
            <div>
                <button className='btn btn-outline-success' onClick={submit}>Submit</button>
            </div>
        </div>
    </dialog>
}