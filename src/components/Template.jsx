import React from "react";
import styled from "styled-components";
// import EventBtn from "./EventBtn";

const Template = ({ children }) => {
  // const { roomId } = useParams;
  return (
    <Main>
      {children}
      {/* {!roomId && <EventBtn fixed="fixed" />} */}
    </Main>
  );
};

const Main = styled.main`
  position: relative;
  width: 100%;
  padding: 72px 0 0 0;
  min-height: calc(100vh - 100px);
`;

export default Template;
