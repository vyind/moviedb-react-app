import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core";
import { MovieDetails } from "../../api/movieDetails";
import DetailsCard from "./detailCard";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "inline-block",
      //   flexWrap: "wrap",
      //   maxHeight: 1200,
      flexDirection: "column",
      marginTop: 50,
      marginLeft: 20,
      marginRight: 20,
      paddingLeft: 10,
    },
    details: {
      display: "flex",
      flexWrap: "wrap",
      //   flexDirection: "column",
      minWidth: 250,
      paddingTop: 10,
      //   maxWidth: 1000,
    },
  })
);

const displayItems = {
  original_title: "Original Title",
  release_date: "Release Date",
  budget: "Budget",
  revenue: "Box Office",
  original_language: "Original Language",
  runtime: "Runtime",
  production_countries: "Production Countries",
  spoken_languages: "Spoken Languages",
  production_companies: "Production Companies",
};

interface ItemInfoProps {
  itemInfo: MovieDetails;
}

export default function ItemDetails({ itemInfo }: ItemInfoProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.details}>
        <Typography variant="h5">Other Details:</Typography>
      </div>
      {Object.keys(displayItems).map((key) => {
        let displayValue: any;
        if (key === "runtime") displayValue = itemInfo[key] + " minutes";
        else if (key === "budget" || key === "revenue")
          displayValue = "$ " + itemInfo[key];
        else displayValue = itemInfo[key];
        return (
          <DetailsCard
            key={key}
            name={displayItems[key]}
            detailInfo={displayValue}
          />
        );
      })}
    </div>
  );
}
