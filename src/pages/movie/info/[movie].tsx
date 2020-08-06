import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MovieDetails } from "../../../../api/movieDetails";
import { NextPageContext } from "next";
import ItemCard from "../../../components/itemCard";
import ItemDetails from "../../../components/itemDetails";
import settings from "../../../settings";
import SimilarItems from "../../../components/similarItems";

interface MovieDetailsProps {
  movieDetails?: MovieDetails;
}

interface CustomNextPageContext extends NextPageContext {
  query: {
    movie: string;
  };
}

function Movie({ movieDetails }: MovieDetailsProps) {
  const router = useRouter();

  const [movie, setMovie] = useState(movieDetails);
  useEffect(() => {
    async function loadData() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${router.query.movie}?api_key=${settings.api_key}`
      );
      const apiData = await response.json();
      setMovie(apiData);
    }
    if (Object.keys(movieDetails).length === 0) loadData();
  }, [movieDetails]);
  if (Object.keys(movie).length === 0)
    return (
      <div>
        <h4>Loading</h4>
      </div>
    );
  return (
    <div>
      <ItemCard itemInfo={movie} />
      <ItemDetails itemInfo={movie} />
      <SimilarItems itemId={movie.id} type="movie" />
    </div>
  );
}

Movie.getInitialProps = async ({ query, req }: CustomNextPageContext) => {
  if (!req) return { movieDetails: {} };
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${query.movie}?api_key=${settings.api_key}`
  );
  const apiData: MovieDetails | undefined = await response.json();
  return { movieDetails: apiData };
};

export default Movie;
