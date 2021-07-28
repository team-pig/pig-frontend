import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Writer from "../components/Writer";

const DocEdit = () => {
  const { docId } = useParams();

  const targetDoc = useSelector((state) => {
    const idx = state.document.docList.findIndex(
      (doc) => doc.docId === Number(docId)
    );
    return state.document.docList[idx];
  });

  return (
    <>
      <Writer targetDoc={targetDoc} />
    </>
  );
};

export default DocEdit;
