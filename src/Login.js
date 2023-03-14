import React, { useState } from 'react';
import { auth, provider, firebaseApp } from './firebase';
import { toastInfo } from './shared/toastInfo';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import GoogleLogo from './images/Google G Logo.png';
import './Login.css';
import firebase from 'firebase';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
function Login() {
    const [mynumber, setnumber] = useState("");
    const [otp, setotp] = useState('');
    const [show, setshow] = useState(false);
    const [final, setfinal] = useState('');

    const signInGoogle = () => {
        const google = "google";
        auth.signInWithPopup(provider)
            .catch((error) => toastInfo(`${error}`, google, "top-center"));
    };

    const loginAnonymously = () => {
        const anonymous = "anonymous";
        auth.signInAnonymously()
            .catch((error) => toastInfo(`${error}`, anonymous, "top-center"));
    };

    // Sent OTP

    const signin = () => {

        if (mynumber === "" || mynumber.length < 10) return;
        var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

        auth.signInWithPhoneNumber(mynumber, appVerifier).then((result) => {
            setfinal(result);
            console.log("===========", result);
            alert("code sent")
            setshow(true);
        })
            .catch((err) => {
                console.log("===========", err);
                // alert(err);
                // window.location.reload()
            });
    }

    // Validate OTP
    const ValidateOtp = () => {
        if (otp === null || final === null)
            return;
        final.confirm(otp).then((result) => {
        }).catch((err) => {
            alert("Wrong code");
        })
    }


    const changesNumber = (e) => {
        if (e) {
            setnumber(e)
        }
    }

    return (
        <div className="login">

            <div className="login__container">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/150px-WhatsApp.svg.png"
                    alt="WhatsApp Logo"
                />
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <div className="login__withGoogle" onClick={signInGoogle}>
                    <img
                        src={GoogleLogo}
                        alt="Google Logo"
                    />
                    <span>Sign in with Google</span>
                </div>

                <div className="login__withGoogle login__Anonymously" onClick={loginAnonymously}>
                    <PermIdentityIcon />
                    <span>Login Anonymously</span>
                </div>

                <div style={{ "marginTop": "1px" }}>
                    <center>
                        <div style={{ display: !show ? "block" : "none" }}>
                            <PhoneInput
                                placeholder="Enter phone number"
                                value={mynumber}
                                flags={flags}
                                country="IN"
                                defaultCountry="IN"
                                onChange={(e) => {
                                    changesNumber(e);
                                }} />

                            <br /><br />
                            <div id="recaptcha-container"></div>
                            <button onClick={signin}>Send OTP</button>
                        </div>
                        <div style={{ display: show ? "block" : "none" }}>
                            <input type="text" placeholder={"Enter your OTP"}
                                onChange={(e) => { setotp(e.target.value) }}></input>
                            <br /><br />
                            <button onClick={ValidateOtp}>Verify</button>
                        </div>
                    </center>
                </div>
            </div>
        </div>
    )
}

export default Login