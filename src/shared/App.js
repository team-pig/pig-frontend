import Router from "./Router";
import { ThemeProvider } from "styled-components";

import { useSelector } from "react-redux";

import Header from "../components/Header";
import Footer from "../components/Footer";
import GlobalStyles from "../shared/GlobalStyles";
import theme from "../themes/theme";

const App = () => {
  const {
    location: { pathname },
  } = useSelector((state) => state.router);

  const result = pathname.includes("workspace");

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {!result ? <Header /> : null}
        <Router />
        {/* <Footer /> */}
      </ThemeProvider>
    </>
  );
};

export default App;
