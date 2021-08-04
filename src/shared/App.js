import Router from "./Router";
import { ThemeProvider } from "styled-components";

import Header from "../components/Header";
import Footer from "../components/Footer";
import GlobalStyles from "../shared/GlobalStyles";
import theme from "../themes/theme";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
        <Router />
        {/* <Footer /> */}
      </ThemeProvider>
    </>
  );
};

export default App;
