import React, { useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import TopAppBar from "../components/topAppBar";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*": {
          "scrollbar-width": "none",
        },
        "*::-webkit-scrollbar": {
          width: "0px",
          height: "0px",
        },
      },
    },
  },
});

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [useDarktheme, setDarkTheme] = useState(true);
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
        <title>Flicker</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={useDarktheme ? darkTheme : theme}>
        <TopAppBar darkIcon={useDarktheme} toggleTheme={onToggle} />
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
