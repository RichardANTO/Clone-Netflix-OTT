// client/src/components/featured/Featured.jsx
import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Featured({ type, setGenre }) {
    const [content, setContent] = useState({});

    useEffect(() => {
        const getRandomContent = async () => {
            try {
                // Ensure we safely get the token, handling the case where 'user' might be null
                const user = JSON.parse(localStorage.getItem("user"));
                const token = user?.accessToken;

                if (!token) {
                    console.error("Authentication token is missing. Cannot fetch featured content.");
                    return;
                }

                const res = await axios.get(`http://localhost:8800/api/movies/random?type=${type}`, {
                    headers: {
                        token: "Bearer " + token,
                    },
                });
                // The random route returns an array, so we take the first element
                setContent(res.data[0]);
            } catch (err) {
                console.log("Error fetching featured content:", err);
            }
        };
        getRandomContent();
    }, [type]);


    return (
        <div className="featured">
            {/* Genre Filter Dropdown (only shown on Home page, not Movies or Series pages) */}
            {type && (
                <div className="category">
                    <span>{type === "movie" ? "Movies" : "Series"}</span>
                    <select name="genre" id="genre" onChange={e => setGenre(e.target.value)}>
                        <option>Genre</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="historical">Historical</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="sci-fi">Sci-fi</option>
                        <option value="thriller">Thriller</option>
                        <option value="western">Western</option>
                        <option value="animation">Animation</option>
                        <option value="drama">Drama</option>
                        <option value="documentary">Documentary</option>
                    </select>
                </div>
            )}

            {/* CRITICAL FIX APPLIED HERE: Use Optional Chaining (?.) */}
            {/* The component will render safely even when content is an empty object {} */}
            <img
                src={content?.img}
                alt=""
            />

            <div className="info">
                <img
                    src={content?.imgTitle} // FIX APPLIED HERE
                    alt=""
                />
                <span className="desc">
                    {content?.desc} // FIX APPLIED HERE
                </span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow />
                        <span>Play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    );
}