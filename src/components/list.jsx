import Link from "next/link";
// import { useState, useEffect } from 'react';

function List({moviesList}) {
    // const [movies, setMovies] = useState([]);
    // useEffect(() => {
    //     async function loadData() {
    //         const response = await fetch(
    //             "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4b3d06492e3ec908d60ebda3525a807f"
    //         );
    //         const movieList = await response.json();
    //         setMovies(movieList.results);
    //     }
    //     loadData();
    // }, []);
    return (
        <div>
            {moviesList.map((movie, index) => {
                return (
                    <div key={index}>
                        <Link as={`/${movie.original_title}?id=${movie.id}`} href="/[movie]">
                            <a>{movie.original_title}</a>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

List.getInitialProps = async (context) => {
    const query = context.query;
    console.log(query);
    const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4b3d06492e3ec908d60ebda3525a807f"
    );
    const apiData = await response.json();
    return { moviesList : apiData.results };
}

export default List;
