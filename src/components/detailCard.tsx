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
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
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
      <Typography variant="subtitle2">
        {detail.map((value, index) => {
          if (index === 0) return value.name;
          return <span key={index}> • {value.name}</span>;
        })}
      </Typography>
    );
  }
  if (typeof detail === typeof {}) {
    console.log(detail);
    return (
      <Typography variant="subtitle2">
        {Object.values(detail).map((value, index) => {
          if (index === 0) return value;
          return <span key={index}> • {value}</span>;
        })}
      </Typography>
    );
  }
  return <Typography variant="h5">{detail}</Typography>;
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
