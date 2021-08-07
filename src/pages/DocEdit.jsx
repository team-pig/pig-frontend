import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// component
import Writer from "../feature/document/Writer";

// redux
import { resetDoc, __getDoc } from "../redux/modules/document";

const DocEdit = () => {
  const dispatch = useDispatch();

  const { docId, roomId } = useParams();

  // 기존 수정 document 정보가 남아있는 경우를 대비하여 docId 비교
  const targetDoc = useSelector((state) => {
    const current = state.document.currentDoc;
    if (docId && current && current.docId === docId) return current;
    else return null;
  });

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
