import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Prompt } from "react-router-dom";
import { useBeforeunload } from "react-beforeunload";

// component
import Writer from "../feature/document/Writer";
import { docApi } from "../api/docApi";

const DocAdd = () => {
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    return () => {
      setShowPrompt(false);
    };
  }, []);

  return (
    <>
      <Prompt
        when={showPrompt}
        message="문서가 저장되지 않았습니다. 정말로 떠나시겠습니까?"
      />
      <Container>
        <Writer setShowPrompt={setShowPrompt} />
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  flex-grow: 1;
  padding: var(--smMargin);
`;

export default DocAdd;
