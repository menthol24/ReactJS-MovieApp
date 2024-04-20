import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function Detail() {
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);

    const {id} = useParams();
    const getMovie = async () => {
        const json = await (
            await fetch (`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        console.log(json.data.movie);
        setMovie(json.data.movie);
        setLoading(false);
    }

    useEffect(() => {
        getMovie();
    }, []);

    return (
        <div>
            {loading? <h2 className="loading">Loading...</h2> :
                <div>
                    <img src={movie.large_cover_image}/>
                    <h2>{movie.title_long}</h2>
                    <ul>
                        {movie.genres && movie.genres.map(g => <li key={g}>{g}</li>)}
                    </ul>
                    <p>{`Rating: ${movie.rating}`}</p>
                    <p>{movie.description_full}</p>
                </div>
            }
        </div>
    );
}
export default Detail;