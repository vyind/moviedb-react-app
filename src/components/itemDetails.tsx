import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core";
import { MovieDetails } from "../../api/movieDetails";
import DetailCard from "./detailCard";

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
        let numStringArr: String[];
        if (key === "runtime") displayValue = itemInfo[key] + " minutes";
        else if (key === "budget" || key === "revenue") {
          numStringArr = itemInfo[key].toString().split("").reverse();
          numStringArr = numStringArr.map((num, index) => {
            if (index % 3 === 0 && index > 0) return num + ",";
            return num;
          });
          if (itemInfo[key] === 0) displayValue = "NA";
          else displayValue = "$ " + numStringArr.reverse().join("");
        } else displayValue = itemInfo[key];
        return (
          <DetailCard
            key={key}
            name={displayItems[key]}
            detailInfo={displayValue}
          />
        );
      })}
    </div>
  );
}
