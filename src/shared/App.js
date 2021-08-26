import { useEffect } from "react";
import Router from "./Router";
import { ThemeProvider } from "styled-components";

import { useSelector, useDispatch } from "react-redux";

import Header from "../components/Header";
import GlobalStyles from "../shared/GlobalStyles";
import theme from "../themes/theme";

import {
  initiateSocket,
  disconnectSocket,
  subscribeToChat,
  subscribeInfoText,
  subscribeWarning,
} from "../shared/useSocket";
import { addMessage, setSocket } from "../redux/modules/chat";

const App = () => {
  const dispatch = useDispatch();

  const socket = useSelector((state) => state.chat.socket);

  const {
    location: { pathname },
  } = useSelector((state) => state.router);

  const result =
    pathname.includes("workspace") || pathname.includes("password");

  useEffect(() => {
    if (!socket) {
      const setNewSocket = (socket) => dispatch(setSocket(socket));
      initiateSocket(setNewSocket);

      subscribeToChat((err, data) => {
        if (err) console.log(err);
        dispatch(addMessage(data));
      });

      subscribeInfoText((err, data) => {
        if (err) {
          console.log(err);
          return;
        }
      });

      subscribeWarning((err, data) => {
        if (err) console.log(err);
      });
    }
  }, [dispatch, socket]);

  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {!result ? <Header /> : null}
        <Router />
      </ThemeProvider>
    </>
  );
};

export default App;
