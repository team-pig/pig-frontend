import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// component
import Writer from "../feature/document/Writer";
import Template from "../components/Template";

const DocEdit = () => {
  const { docId } = useParams();

  const targetDoc = useSelector((state) => {
    const idx = state.document.docList.findIndex((doc) => doc.docId === docId);
    return state.document.docList[idx];
  });

  return (
    <Template>
      <Writer targetDoc={targetDoc} />
    </Template>
  );
};

export default DocEdit;
