// client/src/App.js

import Home from "./pages/Home/Home.jsx";
import Watch from "./pages/Watch/Watch.jsx";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";

import "./app.scss";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

const App = () => {
    // FIX: Get user status from localStorage (where the token is stored on login)
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <Router>
            <Routes>
                {/* The main route (Home)
                    If a user is logged in, show Home, otherwise force them to Register.
                */}
                <Route
                    path="/"
                    element={user ? <Home /> : <Navigate to="/register" />}
                />

                {/* Register route
                    If a user is logged in, force them to Home, otherwise show Register.
                */}
                <Route
                    path="/register"
                    element={!user ? <Register /> : <Navigate to="/" />}
                />

                {/* Login route
                    If a user is logged in, force them to Home, otherwise show Login.
                */}
                <Route
                    path="/login"
                    element={!user ? <Login /> : <Navigate to="/" />}
                />

                {/* Protected Routes - Only accessible if user is logged in */}
                {user && (
                    <>
                        {/* The Home page will accept 'type' to show movies or series */}
                        <Route path="/series" element={<Home type="series" />} />
                        <Route path="/movies" element={<Home type="movie" />} />
                        <Route path="/watch" element={<Watch />} />
                    </>
                )}
            </Routes>
        </Router>
    );
};

export default App;