import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    display: "inline-block",
    verticalAlign: "text-top",
    // minWidth: 200,
    marginRight: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const formattedDetail = (detail) => {
  if (typeof detail === typeof []) {
    return (
      <Typography variant="body1">
        {detail.map((value, index) => {
          if (index === 0)
            return typeof value === typeof {} ? value.name : value;
          return (
            <span key={index}>
              {" "}
              • {typeof value === typeof {} ? value.name : value}
            </span>
          );
        })}
      </Typography>
    );
  }
  return <Typography variant="body1">{detail}</Typography>;
};

export default function DetailCard({ detailInfo, name }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {name}
        </Typography>
        {formattedDetail(detailInfo)}
      </CardContent>
    </Card>
  );
}
