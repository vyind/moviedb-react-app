import React, { useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import {
  ThemeProvider,
  createMuiTheme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import AppNavBar from "../components/appNavBar";
import Footer from "../components/footer";
import settings from "../settings";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles((theme) =>
  createStyles({
    bottomPadding: {
      paddingBottom: 50,
    },
  })
);
export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [useDarktheme, setDarkTheme] = useState(false);
  const classes = useStyles();
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  function onToggle() {
    setDarkTheme(!useDarktheme);
  }

  return (
    <React.Fragment>
      <Head>
        <title>{settings.app_title}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={useDarktheme ? theme : darkTheme}>
        {" "}
        <AppNavBar toggleTheme={onToggle} />
      </ThemeProvider>

      <ThemeProvider theme={useDarktheme ? darkTheme : theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
        <Footer />
        <div className={classes.bottomPadding} />
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
