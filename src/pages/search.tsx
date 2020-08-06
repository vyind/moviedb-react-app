import settings from "../settings";
import ItemList from "../components/itemList";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Search({ searchResult }) {
  const router = useRouter();
  const [result, setResult] = useState(searchResult);
  console.log(router);
  useEffect(() => {
    async function loadData() {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${router.query.q}&api_key=${settings.api_key}`
      );
      const apiData = await response.json();
      setResult(apiData.results);
    }
    // if (Object.keys(result).length === 0)
    loadData();
  }, [searchResult]);
  if (!result || Object.keys(result).length === 0) return null;
  return <ItemList itemList={result} useHorizontal={false} type="search" />;
}

Search.getInitialProps = async ({ req, query }) => {
  if (!req) return { searchResult: {} };
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${query.q}&api_key=${settings.api_key}`
  );
  const apiData = await response.json();
  return { searchResult: apiData.results };
};
