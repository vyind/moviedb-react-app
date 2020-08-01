import { useState, useEffect } from "react";
import { useRouter } from "next/router";
function Movie({ movieDetails }) {
    const router = useRouter();
    console.log(router.query);
    const [movie, setMovie] = useState(movieDetails);
    useEffect(() => {
        async function loadData() {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${router.query.movie}?api_key=4b3d06492e3ec908d60ebda3525a807f`
            );
            const apiData = await response.json();
            setMovie(apiData);
        }
        if (Object.keys(movieDetails).length === 0) loadData();
    }, []);
    if (Object.keys(movie).length === 0)
        return (
            <div>
                <h4>Loading</h4>
            </div>
        );
    return <div>{JSON.stringify(movie)}</div>;
}

Movie.getInitialProps = async context => {
    if (!context.req) return { movieDetails: {} };
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${context.query.movie}?api_key=4b3d06492e3ec908d60ebda3525a807f`
    );
    const apiData = await response.json();
    return { movieDetails: apiData };
};

export default Movie;
