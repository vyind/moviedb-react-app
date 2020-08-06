import React, { useEffect, useState, useRef } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Link from "next/link";
import InfoIcon from "@material-ui/icons/Info";
import { GridListTileBar, IconButton } from "@material-ui/core";
import { Result } from "../../api/movieList";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";

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
      scrollBehavior: "smooth",
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
    scrollDiv: {
      display: "flex",
      justifyContent: "space-between",
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
  const router = useRouter();
  const useClassGridList = useHorizontal
    ? classes.gridListHorizontal
    : classes.gridList;
  const size: number[] = useWindowSize();
  const colNo: number = Math.floor(size[0] / 200);
  const [scrollState, setScrollState] = useState(0);
  const scrollRef = useRef(null);
  function scrollContentLeft() {
    scrollRef.current.scrollLeft = scrollState - 250;
    setScrollState(scrollRef.current.scrollLeft);
  }
  function scrollContentRight() {
    scrollRef.current.scrollLeft = scrollState + 250;
    setScrollState(scrollRef.current.scrollLeft);
  }

  function scrollContent() {
    setScrollState(scrollRef.current.scrollLeft);
  }

  const scrollButtons = () => {
    if (useHorizontal)
      return (
        <div className={classes.scrollDiv}>
          <Button
            onClick={scrollContentLeft}
            disabled={scrollState === 0 ? true : false}
          >
            <NavigateBeforeIcon fontSize="large" />
          </Button>
          <Button
            onClick={scrollContentRight}
            disabled={
              scrollState === 0
                ? false
                : scrollState < scrollRef.current.scrollLeftMax
                ? false
                : true
            }
          >
            <NavigateNextIcon fontSize="large" />
          </Button>
        </div>
      );
    return null;
  };

  const navigateToPage = (item) => {
    router.push(
      `/${type === "search" ? item.media_type : type}/info/${item.id}`
    );
  };

  return (
    <div>
      <div className={classes.root}>
        <GridList
          className={useClassGridList}
          cols={colNo}
          cellHeight={300}
          ref={scrollRef}
          onScroll={scrollContent}
        >
          {itemList.map((item, index) => (
            <GridListTile key={index} onClick={() => navigateToPage(item)}>
              <img
                src={"https://image.tmdb.org/t/p/original" + item.poster_path}
                alt={item.title}
              />
              <GridListTileBar
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                // actionIcon={
                //   <Link
                //     as={`/${type === "search" ? item.media_type : type}/info/${
                //       item.id
                //     }`}
                //     href={`/${
                //       type === "search" ? item.media_type : type
                //     }/info/[movie]`}
                //   >
                //     <IconButton
                //       aria-label={`info about ${item.title}`}
                //       className={classes.title}
                //     >
                //       <InfoIcon />
                //     </IconButton>
                //   </Link>
                // }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
      {scrollButtons()}
    </div>
  );
}
