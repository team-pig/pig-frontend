import React from "react";
import { useSelector } from "react-redux";
import Writer from "../components/Writer";

const DocEdit = () => {
  // url parameter에서 docId를 받아와서 value에 뿌려주기(리스트에서 찾기)

  // 더미데이터
  let docId;
  const targetDoc = { title: "haha", content: "# ㅎㅎㅎ!" };

  // 진짜 데이터(서버 연결 후 가져올 것)
  // const targetDoc = useSelector((state) => {
  //   const idx = state.document.docs.findIndex((doc) => doc.docId === docId);
  //   return state.document.docs[idx];
  // });

  return (
    <>
      <Writer targetDoc={targetDoc} />
    </>
  );
};

export default DocEdit;
