import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// component
import DocList from "../feature/document/DocList";
import DocViewer from "../feature/document/DocViewer";

// redux & api
import { __getDocs } from "../redux/modules/document";

const DocView = (props) => {
  const { roomId } = useParams();
  const dispatch = useDispatch();

  const docList = useSelector((state) => state.document.docList) || [];

  useEffect(() => {
    dispatch(__getDocs(roomId));
  }, [dispatch, roomId]);

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
