import { useState, useEffect } from "react";
import ItemList from "./itemList";
import { makeStyles, createStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "inline-block",
      flexDirection: "column",
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
      paddingLeft: 10,
    },
    details: {
      display: "flex",
      flexWrap: "wrap",
      minWidth: 250,
      paddingBottom: 10,
    },
  })
);

export default function SimilarItems({ itemId, type }) {
  const classes = useStyles();
  const [similarItems, setSimilarItems] = useState(null);
  useEffect(() => {
    async function loadData() {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${itemId}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const apiData = await response.json();
      setSimilarItems(apiData.results);
    }
    loadData();
  }, [itemId]);
  if (!similarItems) return null;
  return (
    <div className={classes.root}>
      <div className={classes.details}>
        <Typography variant="h5">
          Similar {type === "movie" ? "Movies:" : "Shows:"}
        </Typography>
      </div>
      <ItemList itemList={similarItems} type={type} useHorizontal={true} />
    </div>
  );
}
