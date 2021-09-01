import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useParams, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import InfoTitle from "./InfoTitle";
import InfoTags from "./InfoTags";
import InfoSubTitle from "./InfoSubTitle";
import InfoDesc from "./InfoDesc";
import { hiddenScroll } from "../../themes/hiddenScroll";
import { desktopOnly, mobileOnly } from "../../themes/responsive";

// redux & api
import { __editRoomDetail } from "../../redux/modules/room";
import InfoHeader from "./InfoHeader";

const Information = ({ detailpage }) => {
  const { roomId } = useParams();
  const { url } = useRouteMatch();

  const dispatch = useDispatch();

  const isMobile = useSelector((state) => state.resize.isMobile);
  const room = useSelector((state) => state.room.roomInfos);

  const { roomName, desc, tag, subtitle, roomImage } = room;

  const editorRef = useRef();

  const [editMode, setEditMode] = useState(false);
  const [editedInfo, setEditedInfo] = useState({});

  useEffect(() => {
    setEditedInfo({ roomName, desc, tag, subtitle }); // onChange input value
  }, [roomName, desc, tag, subtitle]);

  const getContent = () => {
    const instance = editorRef.current.getInstance();
    const content_md = instance.getMarkdown();
    return content_md;
  };

  const clickSave = () => {
    if (!roomName.trim()) {
      alert("제목을 한 글자 이상 작성해주세요.");
      return;
    }

    let newInfo;
    if (isMobile) {
      newInfo = {
        ...editedInfo,
      };
    } else {
      const currentContent = getContent();

      newInfo = {
        ...editedInfo,
        desc: currentContent,
      };
    }

    dispatch(__editRoomDetail(roomId, newInfo));
    setEditMode((pre) => !pre);
  };

  const handleChange = useCallback((key, value) => {
    setEditedInfo((pre) => ({ ...pre, [key]: value }));
  }, []);

  const infos = {
    editMode,
    setEditMode,
    editedInfo,
    handleChange,
    detailpage,
  };

  return (
    <>
      {detailpage && <InfoHeader clickSave={clickSave} url={url} {...infos} />}
      <Container detailpage={detailpage} className="information">
        <RoomImg src={roomImage} />
        <InfoTitle clickSave={clickSave} {...infos} />
        <InfoTags {...infos} />
        <InfoSubTitle {...infos} />
        {!editMode && <Line />}
        <InfoDesc ref={editorRef} {...infos} />
      </Container>
    </>
  );
};

const Container = styled.section`
  ${hiddenScroll};
  width: 100%;
  min-height: 250px;
  padding: 20px;
  border-bottom: 1px solid var(--line);
  overflow-y: auto;
  grid-area: Information;
  background-color: var(--white);

  ${({ theme }) => theme.device.mobile} {
    min-height: initial;
    max-height: 50vh;
    ${(props) => {
      if (props.detailpage) {
        return css`
          padding: 0 20px;
          border-bottom: 0;
          max-height: initial;
        `;
      }
    }}
  }
`;

const RoomImg = styled.div`
  ${mobileOnly};
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 50%;
  background-image: ${(props) => `url(${props.src});`};
  background-size: cover;
  background-position: center center;
`;

const Line = styled.div`
  ${desktopOnly}
  height: 1px;
  width: 100%;
  margin: 18px 0;
  padding: 0 12px;
  background-color: var(--line);
`;
export default React.memo(Information);
