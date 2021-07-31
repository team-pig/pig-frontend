import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// redux
import { __getDocs } from "../redux/modules/document";

// component
import DocList from "../components/DocList";
import DocViewer from "../components/DocViewer";
import Template from "../components/Template";

const DocView = (props) => {
  const dispatch = useDispatch();
  const { roomId } = useParams();

  const docList = useSelector((state) => state.document.docList) || [];

  useEffect(() => {
    dispatch(__getDocs(roomId));
  }, []);

  return (
    <Template>
      <Container>
        <DocList docList={docList} />
        <DocViewer />
      </Container>
    </Template>
  );
};

// 임시 스타일
const Container = styled.section`
  position: relative;
  z-index: 99;
`;

export default DocView;
