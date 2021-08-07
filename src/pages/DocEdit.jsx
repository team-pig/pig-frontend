import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// component
import Writer from "../feature/document/Writer";
import { resetDoc, __getDoc } from "../redux/modules/document";

const DocEdit = () => {
  const dispatch = useDispatch();

  const { docId, roomId } = useParams();

  const targetDoc = useSelector((state) => state.document.currentDoc);

  useEffect(() => {
    dispatch(__getDoc(roomId, docId));
    return () => dispatch(resetDoc());
  }, []);

  return <Container>{targetDoc && <Writer targetDoc={targetDoc} />}</Container>;
};

const Container = styled.div`
  padding: var(--smMargin);
`;

export default DocEdit;
