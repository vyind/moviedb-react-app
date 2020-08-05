import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { MovieDetails } from "../../api/movieDetails";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      //   maxHeight: 1200,
      marginTop: 50,
      marginLeft: 20,
      marginRight: 20,
    },
    details: {
      display: "inline-block",
      //   flexWrap: "wrap",
      //   flexDirection: "column",
      minWidth: 250,
      maxWidth: 1000,
    },
    bottomDetails: {
      display: "inline-block",
      //   flexDirection: "column",
      //   justifyContent: "flex-end",
    },
    rating: {
      display: "inline-block",
      //   flexWrap: "wrap",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      maxWidth: 500,
      minWidth: 360,
      minHeight: 400,
    },
  })
);

const ratingColor = (rating) => {
  if (rating >= 8.0) return "#d4af37";
  else if (rating >= 7.0) return "#c0c0c0";
  else if (rating >= 5.0) return "#ed7014";
  else return "#be0000";
};

interface ItemInfoProps {
  itemInfo: MovieDetails;
}

export default function ItemCard({ itemInfo }: ItemInfoProps) {
  const color = ratingColor(itemInfo.vote_average);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={"https://image.tmdb.org/t/p/original" + itemInfo.poster_path}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h4" variant="h5">
            {itemInfo.title} ({itemInfo.release_date.split("-")[0]})
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            <em>{itemInfo.tagline}</em>
          </Typography>
        </CardContent>
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
          </div>
        </CardContent>
      </div>
      <div className={classes.details}>
        <Card className={classes.rating} style={{ background: color }}>
          <CardContent className={classes.content}>
            <Typography display="inline" variant="h5">
              {itemInfo.vote_average}
              <Typography
                display="inline"
                variant="body2"
                color="textSecondary"
              >
                <em> ({itemInfo.vote_count})</em>
              </Typography>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Card>
  );
}
