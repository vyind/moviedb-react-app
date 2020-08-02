import { MovieList, Result } from "../../../api/movieList";
import ItemList from "../../components/itemList";
import { useState, useEffect } from "react";

interface PopularListProps {
  moviesPopular?: Result[];
  useHorizontal: boolean;
  categoryName: string;
}

const fetchUrls = {
  popular:
    "https://api.themoviedb.org/3/movie/popular?api_key=4b3d06492e3ec908d60ebda3525a807f",
  top_rated:
    "https://api.themoviedb.org/3/movie/top_rated?api_key=4b3d06492e3ec908d60ebda3525a807f",
};

export default function Category({
  moviesPopular,
  useHorizontal,
  categoryName,
}: PopularListProps) {
  const [movies, setMovie] = useState(moviesPopular);
  useEffect(() => {
    async function loadData() {
      const response = await fetch(fetchUrls[categoryName]);
      const apiData = await response.json();
      setMovie(apiData.results);
    }
    if (!moviesPopular || Object.keys(moviesPopular).length === 0) loadData();
  }, []);
  if (!movies || Object.keys(movies).length === 0)
    return (
      <div>
        <h4>Loading</h4>
      </div>
    );
  return (
    <div>
      <ItemList itemList={movies} useHorizontal={useHorizontal} type="movies" />
    </div>
  );
}

Category.getInitialProps = async ({ req, query }) => {
  if (!req) return { moviesPopular: {} };
  const response = await fetch(fetchUrls[query.category]);
  const apiData: MovieList | undefined = await response.json();
  const moviesPopular: Result[] | undefined = apiData.results;
  return { moviesPopular: moviesPopular, categoryName: query.category };
};
