import { MovieList, Result } from "../../../api/movieList";
import ItemList from "../../components/itemList";
import { useState, useEffect } from "react";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

interface PopularListProps {
  moviesPopular?: Result[];
  useHorizontal: boolean;
  categoryName: string;
}

interface CustomNextPageContext extends NextPageContext {
  query: {
    category: string;
  };
}

const fetchUrls = {
  trending: `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  popular: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  top_rated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  latest: `https://api.themoviedb.org/3/movie/latest?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
  upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
};

const categoryHeaders = {
  trending: "Trending Movies",
  popular: "Popular Movies",
  top_rated: "Top-Rated Movies",
  upcoming: "Upcoming Movies",
};

function Category({
  moviesPopular,
  useHorizontal,
  categoryName,
}: PopularListProps) {
  const [movies, setMovie] = useState(moviesPopular);
  const router = useRouter();
  if (!categoryName) categoryName = router.query["category"].toString();
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
      <div>
        <Typography variant="h4" component="h6">
          <Link as={`/movie/${categoryName}`} href={"/movie/[category]"}>
            <Button color="inherit">{categoryHeaders[categoryName]}</Button>
          </Link>
        </Typography>
      </div>
      <div>
        <ItemList
          itemList={movies}
          useHorizontal={useHorizontal}
          type="movie"
        />
      </div>
    </div>
  );
}

Category.getInitialProps = async ({ query, req }: CustomNextPageContext) => {
  if (!req || !query) return { moviesPopular: {} };
  const response = await fetch(fetchUrls[query.category]);
  const apiData: MovieList | undefined = await response.json();
  const moviesPopular: Result[] | undefined = apiData.results;
  return { moviesPopular: moviesPopular, categoryName: query.category };
};

export default Category;
