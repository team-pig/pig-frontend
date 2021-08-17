import { useEffect } from "react";
import Router from "./Router";
import { ThemeProvider } from "styled-components";

import { useSelector, useDispatch } from "react-redux";

import Header from "../components/Header";
import Footer from "../components/Footer";
import GlobalStyles from "../shared/GlobalStyles";
import theme from "../themes/theme";

import {
  initiateSocket,
  disconnectSocket,
  subscribeToChat,
} from "../shared/useSocket";
import { addMessage } from "../redux/modules/chat";

const App = () => {
  const dispatch = useDispatch();

  const {
    location: { pathname },
  } = useSelector((state) => state.router);

  const result = pathname.includes("workspace");

  useEffect(() => {
    initiateSocket();

    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    subscribeToChat((err, data) => {
      if (err) console.log(err);
      dispatch(addMessage(data));
    });
  }, [dispatch]);

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
