import Router from "./Router";
import Header from "../components/Header";
import GlobalStyles from "../shared/GlobalStyles";
import styled from "styled-components";
import Footer from "../components/Footer";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Router />
      <Footer />
    </>
  );
};

export default App;
