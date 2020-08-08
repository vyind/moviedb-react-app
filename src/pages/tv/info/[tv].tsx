import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TvDetails } from "../../../../api/tvDetails";
import { NextPageContext } from "next";
import ItemCard from "../../../components/itemCard";
import ItemDetails from "../../../components/itemDetails";
import SimilarItems from "../../../components/similarItems";

interface TvDetailsProps {
  tvDetails?: TvDetails;
}

interface CustomNextPageContext extends NextPageContext {
  query: {
    tv: string;
  };
}

function Tv({ tvDetails }: TvDetailsProps) {
  const router = useRouter();

  const [tv, setTv] = useState(tvDetails);
  useEffect(() => {
    async function loadData() {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${router.query.movie}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const apiData = await response.json();
      setTv(apiData);
    }
    if (Object.keys(tvDetails).length === 0) loadData();
  }, [tvDetails]);
  if (Object.keys(tv).length === 0)
    return (
      <div>
        <h4>Loading</h4>
      </div>
    );
  return (
    <div>
      <ItemCard itemInfo={tv} type="tv" />
      <ItemDetails itemInfo={tv} type="tv" />
      <SimilarItems itemId={tv.id} type="tv" />
    </div>
  );
}

Tv.getInitialProps = async ({ query, req }: CustomNextPageContext) => {
  if (!req) return { tvDetails: {} };
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${query.tv}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const apiData: TvDetails | undefined = await response.json();
  return { tvDetails: apiData };
};

export default Tv;
