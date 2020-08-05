import React, { useEffect, useState, useRef } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Link from "next/link";
import InfoIcon from "@material-ui/icons/Info";
import { GridListTileBar, IconButton } from "@material-ui/core";
import { Result } from "../../api/movieList";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: "wrap",
      transform: "translateZ(0)",
    },
    gridListHorizontal: {
      flexWrap: "nowrap",
      transform: "translateZ(0)",
    },
    title: {
      color: "#ffffff",
    },
    titleBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
  })
);

interface ItemListProps {
  itemList: Result[];
  useHorizontal: boolean;
  type: string;
}

export default function ItemList({
  itemList,
  useHorizontal = false,
  type,
}: ItemListProps) {
  const classes = useStyles();
  const useClassGridList = useHorizontal
    ? classes.gridListHorizontal
    : classes.gridList;
  const size: number[] = useWindowSize();
  const colNo: number = Math.floor(size[0] / 200);

  return (
    <div className={classes.root}>
      <GridList className={useClassGridList} cols={colNo} cellHeight={300}>
        {itemList.map((item) => (
          <GridListTile
            key={"https://image.tmdb.org/t/p/original" + item.poster_path}
          >
            <img
              src={"https://image.tmdb.org/t/p/original" + item.poster_path}
              alt={item.title}
            />
            <GridListTileBar
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <Link
                  as={`/${type}/info/${item.id}`}
                  href={`/${type}/info/[movie]`}
                >
                  <IconButton
                    aria-label={`info about ${item.title}`}
                    className={classes.title}
                  >
                    <InfoIcon />
                  </IconButton>
                </Link>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
