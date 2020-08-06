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
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import BrightnessLowIcon from "@material-ui/icons/Brightness4";
import Link from "next/link";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      // position: "absolute",
      pointerEvents: "all",
      display: "inline-block",
      alignItems: "center",
      // justifyContent: "center",
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

export default function TopAppBar({ darkIcon, toggleTheme }) {
  const classes = useStyles();
  const router = useRouter();
  const [input, setInput] = useState("");

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
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography className={classes.title} variant="h4" noWrap>
            <Link as="/" href="/">
              <span>FLX</span>
            </Link>
          </Typography>
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
            {darkIcon ? <BrightnessHighIcon /> : <BrightnessLowIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
