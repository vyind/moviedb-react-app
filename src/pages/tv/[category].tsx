import { MovieList, Result } from "../../../api/movieList";
import ItemList from "../../components/itemList";
import { useState, useEffect } from "react";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import settings from "../../settings";

interface PopularListProps {
  tvPopular?: Result[];
  useHorizontal: boolean;
  categoryName: string;
}

interface CustomNextPageContext extends NextPageContext {
  query: {
    category: string;
  };
}

const fetchUrls = {
  trending: `https://api.themoviedb.org/3/trending/tv/week?api_key=${settings.api_key}`,
  popular: `https://api.themoviedb.org/3/tv/popular?api_key=${settings.api_key}`,
  top_rated: `https://api.themoviedb.org/3/tv/top_rated?api_key=${settings.api_key}`,
  on_the_air: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${settings.api_key}`,
  airing_today: `https://api.themoviedb.org/3/tv/airing_today?api_key=${settings.api_key}`,
};

const categoryHeaders = {
  trending: "Trending Shows",
  popular: "Popular Shows",
  top_rated: "Top-Rated Shows",
  airing_today: "Shows Airing Today",
  on_the_air: "Shows on the Air",
};

function Category({
  tvPopular,
  useHorizontal,
  categoryName,
}: PopularListProps) {
  const [tv, setTv] = useState(tvPopular);
  const router = useRouter();
  if (!categoryName) categoryName = router.query["category"].toString();
  useEffect(() => {
    async function loadData() {
      const response = await fetch(fetchUrls[categoryName]);
      const apiData = await response.json();
      setTv(apiData.results);
    }
    if (!tvPopular || Object.keys(tvPopular).length === 0) loadData();
  }, []);
  if (!tv || Object.keys(tv).length === 0)
    return (
      <div>
        <h4>Loading</h4>
      </div>
    );
  return (
    <div>
      <div>
        <Typography variant="h4" component="h6">
          <Link as={`/tv/${categoryName}`} href={"/tv/[category]"}>
            <Button color="inherit">{categoryHeaders[categoryName]}</Button>
          </Link>
        </Typography>
      </div>
      <div>
        <ItemList itemList={tv} useHorizontal={useHorizontal} type="tv" />
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
