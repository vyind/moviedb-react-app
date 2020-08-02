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
      maxHeight: 1000,
      marginTop: 50,
      marginLeft: 20,
      marginRight: 20,
    },
    details: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      minWidth: 250,
      maxWidth: 700,
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

interface ItemInfoProps {
  itemInfo: MovieDetails;
}

export default function ItemCard({ itemInfo }: ItemInfoProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={"https://image.tmdb.org/t/p/original" + itemInfo.poster_path}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {itemInfo.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {itemInfo.overview}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
