import Link from "next/link";
import { MovieList, Result } from "../../api/movieList";

export interface MovieListProps {
    moviesList?: Result[];
}

function Index({ moviesList }: MovieListProps) {
    return (
        <div>
            {moviesList.map((movie: Result, index: number) => {
                return (
                    <div key={index}>
                        <Link as={`/${movie.id}`} href="/[movie]">
                            <a>{movie.original_title}</a>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

Index.getInitialProps = async () => {
    const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4b3d06492e3ec908d60ebda3525a807f"
    );
    const apiData: MovieList | undefined = await response.json();
    const moviesList: Result[] | undefined = apiData.results;
    return { moviesList: moviesList };
};

export default Index;
