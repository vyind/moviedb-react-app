import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
  })
);

export default function Footer() {
  const classes = useStyles();

  const getYear = () => {
    const date = new Date();
    return date.getFullYear();
  };

  return (
    <div className={classes.root}>
      <Chip
        avatar={<Avatar alt="vysk" src="/logo.png" />}
        label="Created by: vysk"
      />
      <Chip label={getYear()} />
      <Chip
        avatar={<Avatar alt="tmdb" src="/tmdb.jpg" />}
        label="Data source: TMDB"
      />
    </div>
  );
}
