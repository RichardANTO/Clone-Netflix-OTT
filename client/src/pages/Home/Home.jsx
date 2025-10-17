// client/src/pages/home/Home.jsx

// FIX: Paths changed from "../components/..." to "../../components/..."
import Navbar from "../../components/navbar/Navbar.jsx";
import Featured from "../../components/featured/Featured.jsx";
import List from "../../components/list/List.jsx";

import "./home.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const getRandomLists = async () => {
            try {
                // Get the accessToken from the user object in localStorage
                const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

                if (!token) {
                    console.warn("User token not found in localStorage.");
                    return;
                }

                const res = await axios.get(
                    `http://localhost:8800/api/lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""
                    }`,
                    {
                        headers: {
                            // Send the token to the backend
                            token: "Bearer " + token,
                        },
                    }
                );
                setLists(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        // Only fetch if a user object exists
        localStorage.getItem("user") && getRandomLists();
    }, [type, genre]);

    return (
        <div className="home">
            <Navbar />
            <Featured type={type} setGenre={setGenre} />

            {/* Map through the lists fetched from the backend */}
            {lists.map((list) => (
                <List key={list._id} list={list} />
            ))}
        </div>
    );
};

export default Home;