import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import MovieIcon from "@material-ui/icons/Theaters";
import TvIcon from "@material-ui/icons/Tv";
import ThemeIcon from "@material-ui/icons/BrightnessMedium";
import Link from "next/link";
import { useRouter } from "next/router";
import { Tab, Tabs } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    bottomAppBar: {
      top: "auto",
      bottom: 0,
      display: "flex",
      // backgroundColor: theme.palette.background.default,
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },

    topTabBar: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
        flexGrow: 0.3,
        justifyContent: "space-between",
      },
    },
    separator: {
      display: "flex",
      flexGrow: 1,
    },
    bottomTabBar: {
      display: "flex",
      flexGrow: 1,
      justifyContent: "space-between",
    },
    title: {
      flexGrow: 0.3,
    },
    titleText: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "inline-block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.background.paper, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.background.paper, 0.25),
      },
      marginLeft: 0,
      display: "flex",
      width: "auto",
      [theme.breakpoints.up("sm")]: {
        display: "block",
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    logoIcon: {
      height: 50,
      paddingTop: 5,
      paddingRight: 5,
    },
    searchIcon: {
      // padding: theme.spacing(0, 2),
      height: "100%",
      // position: "absolute",
      pointerEvents: "all",
      display: "inline-block",
      alignItems: "center",
      verticalAlign: "bottom",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);

export default function AppNavBar({ toggleTheme }) {
  const classes = useStyles();
  const router = useRouter();
  const [input, setInput] = useState("");
  const [tab, setTab] = useState(-1);

  if (tab === -1) {
    if (router.pathname === "/") setTab(0);
    else if (
      router.pathname === "/movies" ||
      router.pathname.includes("/movie/")
    )
      setTab(1);
    else if (router.pathname === "/tvshows" || router.pathname.includes("/tv/"))
      setTab(2);
  }
  const onTabClick = (event, newValue) => {
    setTab(newValue);
    if (newValue === 1) router.push("/movies");
    else if (newValue === 2) router.push("/tvshows");
    else router.push("/");
  };
  const onTyping = (event) => {
    setInput(event.target.value);
  };

  const onEnterKey = (event) => {
    if (event.charCode === 13) router.push(`/search?q=${input}`);
  };

  const onButtonClick = () => {
    router.push(`/search?q=${input}`);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography className={classes.title} variant="h4" noWrap>
            <Link as="/" href="/">
              <div>
                {" "}
                <img
                  className={classes.logoIcon}
                  src="/flixbase.png"
                  alt="flixbase-icon"
                />
                <span className={classes.titleText}>Flixbase</span>
              </div>
            </Link>
          </Typography>
          <Tabs
            value={tab}
            onChange={onTabClick}
            className={classes.topTabBar}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Home" value={0} />
            <Tab label="Movies" value={1} />
            <Tab label="TV Shows" value={2} />
          </Tabs>

          <div className={classes.separator} />
          <div className={classes.search}>
            <div className={classes.searchIcon} onClick={onButtonClick}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={onTyping}
              onKeyPress={onEnterKey}
            />
          </div>

          <IconButton aria-label="brightness" onClick={toggleTheme}>
            <ThemeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <AppBar position="fixed" color="default" className={classes.bottomAppBar}>
        <Tabs
          className={classes.bottomTabBar}
          value={tab}
          onChange={onTabClick}
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
        >
          <Tab icon={<HomeIcon fontSize="small" />} aria-label="home" />
          <Tab icon={<MovieIcon fontSize="small" />} aria-label="movies" />
          <Tab icon={<TvIcon fontSize="small" />} aria-label="tvshows" />
        </Tabs>
      </AppBar>
    </div>
  );
}
