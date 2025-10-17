// client/src/pages/watch/Watch.jsx
import { ArrowBackOutlined } from "@material-ui/icons";
import "./watch.scss";
import { useLocation, useNavigate } from "react-router-dom";

export default function Watch() {
    const navigate = useNavigate();
    const location = useLocation();
    // We assume the movie object (containing the video link) is passed via state
    const movie = location.state.movie;

    return (
        <div className="watch">
            <div className="back" onClick={() => navigate(-1)}>
                <ArrowBackOutlined />
                Home
            </div>
            {/* The video source is taken from the state passed via the Link */}
            <video
                className="video"
                autoPlay
                progress
                controls
                src={movie.video}
            />
        </div>
    );
}