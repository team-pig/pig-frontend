import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

// redux
import { __getDocs } from "../redux/modules/document";

// component
import DocList from "../components/DocList";
import DocViewer from "../components/DocViewer";

const DocView = (props) => {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  useEffect(() => {
    dispatch(__getDocs(roomId));
  }, []);

  return (
    <Container>
      <DocList />
      <DocViewer />
    </Container>
  );
};

const Container = styled.section`
  // 임시 스타일
  position: relative;
  z-index: 99;
`;

export default DocView;
