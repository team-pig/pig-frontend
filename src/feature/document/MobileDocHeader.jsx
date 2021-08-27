import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Icon from "../../components/Icon";
import { IconBtn, Text } from "../../elem";

const MobileDocHeader = ({ clickShowList }) => {
  const { docId } = useParams();

  const currentDoc = useSelector((state) => state.document.currentDoc);

  return (
    <>
      <IconBtn padding="10px 20px" _onClick={clickShowList}>
        <Icon icon="hamburger" color="var(--darkgrey)" size="24px" />
      </IconBtn>
      <Text type="body_3" color="main">
        {currentDoc && currentDoc.title}
        {!docId && "저장된 문서가 없습니다."}
      </Text>
    </>
  );
};

export default MobileDocHeader;
