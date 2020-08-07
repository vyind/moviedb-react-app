import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core";
import { MovieDetails } from "../../api/movieDetails";
import DetailCard from "./detailCard";
import { TvDetails } from "../../api/tvDetails";

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
  movie: {
    original_title: "Original Title",
    release_date: "Release Date",
    budget: "Budget",
    revenue: "Box Office",
    original_language: "Original Language",
    runtime: "Runtime",
    production_countries: "Production Countries",
    spoken_languages: "Spoken Languages",
    production_companies: "Production Companies",
  },
  tv: {
    original_name: "Original Name",
    status: "Status",
    first_air_date: "First Air Date",
    episode_run_time: "Episode Runtime",
    languages: "Languages",
    last_air_date: "Last Air Date",
    number_of_episodes: "No: of Episodes",
    number_of_seasons: "No: of Seasons",
    origin_country: "Origin Country",
    original_language: "Original Language",
  },
};

interface ItemInfoProps {
  itemInfo: MovieDetails | TvDetails;
  type: string;
}

export default function ItemDetails({ itemInfo, type }: ItemInfoProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.details}>
        <Typography variant="h5">Other Details:</Typography>
      </div>
      {Object.keys(displayItems[type]).map((key) => {
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
            name={displayItems[type][key]}
            detailInfo={displayValue}
          />
        );
      })}
    </div>
  );
}
