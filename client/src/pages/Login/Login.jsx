// client/src/pages/login/Login.jsx
import { useState } from "react";
import "./login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        // PREVENTS the default browser action (page reload)
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8800/api/auth/login", {
                email,
                password,
            });

            // If the backend returns a token, login was successful
            if (res.data.accessToken) {
                // Store the full user object (including token)
                localStorage.setItem("user", JSON.stringify(res.data));

                // Redirect to the home page ("/")
                alert("Login successful! Redirecting to homepage.");
                navigate("/");

                // Force reload so App.js checks localStorage and renders Home
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
            alert("Login failed! Wrong credentials or server error.");
        }
    };

    return (
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <img
                        className="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt=""
                    />
                </div>
            </div>
            <div className="container">
                {/* FIX APPLIED: Attach the handler to the FORM's onSubmit event */}
                <form onSubmit={handleLogin}>
                    <h1>Login In</h1>
                    <input
                        type="email"
                        placeholder="Email or phone number"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* The button is now a simple submit button (no custom onClick needed) */}
                    <button className="loginButton" type="submit">
                        Login In
                    </button>
                    <span>
                        New to Netflix?{" "}
                        <b onClick={() => navigate("/register")}>Sign up now.</b>
                    </span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure you're not a
                        bot. <b>Learn more</b>.
                    </small>
                </form>
            </div>
        </div>
    );
}