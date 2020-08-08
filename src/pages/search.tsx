import ItemList from "../components/itemList";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";

export default function Search({ searchResult }) {
  const router = useRouter();
  const [result, setResult] = useState(searchResult);
  useEffect(() => {
    async function loadData() {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${router.query.q}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const apiData = await response.json();
      setResult(apiData.results);
    }
    // if (Object.keys(result).length === 0)
    loadData();
  }, [searchResult]);
  if (!result || Object.keys(result).length === 0) return null;
  return (
    <div>
      <Typography variant="h6">
        Search results for "{router.query.q}"
      </Typography>
      <ItemList itemList={result} useHorizontal={false} type="search" />
    </div>
  );
}

Search.getInitialProps = async ({ req, query }) => {
  if (!req) return { searchResult: {} };
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${query.q}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const apiData = await response.json();
  return { searchResult: apiData.results };
};
