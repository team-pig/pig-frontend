import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// redux
import { __getDocs } from "../redux/modules/document";

// component
import DocList from "../feature/document/DocList";
import DocViewer from "../feature/document/DocViewer";

const DocView = (props) => {
  const dispatch = useDispatch();
  const { roomId } = useParams();

  const docList = useSelector((state) => state.document.docList) || [];

  useEffect(() => {
    dispatch(__getDocs(roomId));
  }, []);

  return (
    <Container>
      <DocList docList={docList} />
      <DocViewer />
    </Container>
  );
};

// 임시 스타일
const Container = styled.section`
  display: flex;
`;

export default DocView;
