import React from "react";
import {
  Theme,
  createStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { MovieDetails } from "../../api/movieDetails";
import Credits from "./credits";
import { TvDetails } from "../../api/tvDetails";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexGrow: 1,
      flexWrap: "wrap",
      marginTop: 50,
      marginLeft: 20,
      marginRight: 20,
      justifyContent: "center",
      [theme.breakpoints.up("md")]: {
        flexWrap: "nowrap",
      },
    },
    details: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
    },
    bottomDetails: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
    },
    topDetails: {
      display: "flex",
      flexGrow: 1,
      justifyContent: "space-between",
    },
    separator: {
      display: "flex",
      flexGrow: 1,
    },
    cover: {
      maxWidth: 500,
      minWidth: 280,
      minHeight: 400,
    },
  })
);

const ratingColor = (rating) => {
  if (rating >= 8.0) return "#d4af37";
  else if (rating >= 7.0) return "#aaa9ad";
  else if (rating >= 5.0) return "#ed7014";
  else return "#be0000";
};

interface ItemInfoProps {
  itemInfo: MovieDetails | TvDetails;
  type: string;
}

export default function ItemCard({ itemInfo, type }: ItemInfoProps) {
  const color = ratingColor(itemInfo.vote_average);
  const classes = useStyles();
  const imagePath =
    itemInfo.poster_path != null
      ? "https://image.tmdb.org/t/p/w342" + itemInfo.poster_path
      : "/no_image.jpg";

  const creditType = () => {
    if (type === "tv")
      return (
        <Credits
          typeId={itemInfo.id}
          type={type}
          creator={itemInfo["created_by"]}
        />
      );
    return <Credits typeId={itemInfo.id} type={type} />;
  };

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} image={imagePath} />

      <div className={classes.details}>
        <div className={classes.topDetails}>
          <CardContent>
            <Typography component="h4" variant="h5">
              {itemInfo["title"] ? itemInfo["title"] : itemInfo["name"]} (
              {itemInfo["release_date"]
                ? itemInfo["release_date"].split("-")[0]
                : itemInfo["first_air_date"].split("-")[0]}
              )
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              <em>{itemInfo["tagline"] ? itemInfo["tagline"] : null}</em>
            </Typography>
          </CardContent>
          <div>
            <Card style={{ background: color }}>
              <CardContent>
                <Typography display="inline" variant="h5">
                  {itemInfo.vote_average}
                  <Typography
                    display="inline"
                    variant="body2"
                    color="textSecondary"
                  >
                    <span> ({itemInfo.vote_count})</span>
                  </Typography>
                </Typography>
              </CardContent>
            </Card>
            <div className={classes.separator}></div>
          </div>
        </div>
        <CardContent className={classes.bottomDetails}>
          <div>
            <Typography display="inline" variant="body2" color="textPrimary">
              <b>Synopsis:&nbsp;</b>
            </Typography>
            <Typography display="inline" variant="body2" color="textSecondary">
              {itemInfo.overview}
            </Typography>
          </div>
          <div>
            <Typography display="inline" variant="body2" color="textPrimary">
              <b>Genre:&nbsp;</b>
            </Typography>
            <Typography display="inline" variant="body2" color="textSecondary">
              {itemInfo.genres.map((genre, index) => {
                if (index === 0) return <span key={index}>{genre.name}</span>;
                return <span key={index}> • {genre.name}</span>;
              })}
            </Typography>
            {creditType()}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
