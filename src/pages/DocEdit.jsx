import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Prompt, useParams } from "react-router-dom";
import { useBeforeunload } from "react-beforeunload";

// component
import Writer from "../feature/document/Writer";

// redux & api
import { resetDoc, __getDoc } from "../redux/modules/document";
import { docApi } from "../api/docApi";

const DocEdit = () => {
  const dispatch = useDispatch();

  const { docId, roomId } = useParams();

  // 기존 수정 document 정보가 남아있는 경우를 대비하여 docId 비교
  const targetDoc = useSelector((state) => {
    const current = state.document.currentDoc;
    if (docId && current && current.docId === docId) return current;
    else return null;
  });

  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    dispatch(__getDoc(roomId, docId));
    return async () => {
      dispatch(resetDoc());
      setShowPrompt(false);
      await docApi.exitEditPage(roomId, docId);
    };
  }, []);

  // 새로고침하거나 창을 종료할 때 안내 메시지
  useBeforeunload((e) => {
    e.preventDefault();
    docApi.exitEditPage(roomId, docId);
  });

  return (
    <>
      <Prompt
        when={showPrompt}
        message="문서가 저장되지 않았습니다. 정말로 떠나시겠습니까?"
      />
      <Container>
        {targetDoc && (
          <Writer targetDoc={targetDoc} setShowPrompt={setShowPrompt} />
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  flex-grow: 1;
  padding: var(--smMargin);
`;

export default DocEdit;
