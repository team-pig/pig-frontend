import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

//components
import ModifyRoomModal from "./ModifyRoomModal";
import Icon from "../../components/Icon";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import Drop from "../../components/Drop";
import DropDown from "./DropDown";
//elements
import { Text, IconBtn } from "../../elem/index";
import { body_3 } from "../../themes/textStyle";
import MemberImg from "../../elem/MemberImg";
import BookMark from "./BookMark";
import RoomTags from "./RoomTags";
import LinkIcon from "./LinkIcon";

//redux
import {
  __deleteRoom,
  __exitRoom,
  __toggleBookmark,
  __getMarkedList,
  __getUnMarkedList,
  __getMergedList,
} from "../../redux/modules/room";

//roomList map의 list에서 받아오는 값
const RoomCard = ({
  roomId,
  roomImage,
  roomName,
  subtitle,
  members,
  memberStatus,
  createdAt,
  tag,
  bookmarkedMembers,
  userId,
  inviteCode,
  history,
  index,

  isMarked,
  openDrop,
  closeDrop,
}) => {
  const dispatch = useDispatch();
  const [showModModal, setShowModModal] = useState(false);
  const [showAllMember, setShowAllMember] = useState(false);
  const [isDisplayDrop, setIsDisplayDrop] = useState(false);

  useEffect(() => {
    memberCount();

  }, []);

  const memberCount = () => {
    if (members.length > 4) {
      setShowAllMember(false);
    } else {
      setShowAllMember(true);
    }
  };




  const clickBookmark = async (e) => {
    e.stopPropagation();
    e.preventDefault();
   
     await dispatch(__toggleBookmark(roomId, isMarked));
     await dispatch(__getMarkedList());
     await dispatch(__getUnMarkedList());
     dispatch(__getMergedList());
    console.log(isMarked);
    console.log("즐겨찾기 취소");
  
  };


  
  const exitRoom = (e) => {
    e.stopPropagation();
    dispatch(__exitRoom(roomId));
    setIsDisplayDrop(false);
  };

  const deleteRoom = (e) => {
    e.stopPropagation();
    dispatch(__deleteRoom(roomId));
    setIsDisplayDrop(false);

    // closeDrop();
  };

  const openModModal = (e) => {
    e.stopPropagation();
    setShowModModal(true);
    roomId = { roomId };
    setIsDisplayDrop(false);
    // closeDrop();
  };

  const closeModModal = () => {
    setShowModModal(false);
  };

  
  const createDate = createdAt.slice(0, 10).split("-");

  return (
    <>
      <ModifyRoomModal
        roomId={roomId}
        showModModal={showModModal}
        closeModModal={closeModModal}
      />

      <Container
        onClick={() => {
          history.push(`/workspace/${roomId}`);
        }}
      >
       
        <IconBox>
          {/* <Star /> */}
          <LinkIcon inviteCode={inviteCode} />
          <BookMark isMarked={isMarked} clickBookmark={clickBookmark} />
        </IconBox>
        <CardSection>
          <CardProfile>
            <RoundImg url={roomImage} />
            <TextBox>
              <RoomNameBox>
                <Text type="sub_1">{roomName}</Text>
              </RoomNameBox>
              <TagBox>
                <RoomTags tag={tag} />
              </TagBox>
            </TextBox>
          </CardProfile>
          <SubTitleBox>{subtitle}</SubTitleBox>
        </CardSection>
        <CardFooter>
          <FooterItem>
            <Text type="body_4">
              {createDate[0] + ". " + createDate[1] + ". " + createDate[2]}
            </Text>
          </FooterItem>
          <FooterItem>
            {/* members를 memberImg 배열로 바꾸기 */}
            <MemberImg members={members} memberStatus={memberStatus} />
            {/* <IconBtn padding="0" _onClick={handleClick} >
              <Icon icon="more" size="24px" />
            </IconBtn> */}
            {/* <Drop.Container
             
              width="84px"
              height="126px"
              shadow
            >
              <Drop.Item height="42px" color="darkgrey" _onClick={openModModal}>
                수정
              </Drop.Item>
              <Drop.Item height="42px" color="darkgrey" _onClick={exitRoom}>
                나가기
              </Drop.Item>
              <Drop.Item height="42px" color="darkgrey" _onClick={deleteRoom}>
                삭제
              </Drop.Item>
            </Drop.Container> */}
            <DropDown isDisplayDrop={isDisplayDrop} setIsDisplayDrop={setIsDisplayDrop} exitRoom={exitRoom} deleteRoom={deleteRoom} openModModal={openModModal}></DropDown>
          </FooterItem>
        </CardFooter>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 302px;
  height: 274px;
  border: 1.2px solid var(--grey);
  border-radius: 5px;
  cursor: pointer;
`;

const CardSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 302px;
  height: 202px;
  padding: 20px 20px 15px 20px;
`;

const IconBox = styled.div`
  position: absolute;

  top: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60px;
`;

const CardProfile = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const RoundImg = styled.div`
  width: 100px;
  height: 100px;
  margin-right: 15px;
  border-radius: 50%;
  background-image: url("${(props) => props.url}");
  background-size: cover;
`;

const TextBox = styled.div`
  position: absolute;
  top: 40px;
  left: 110px;
  overflow: hidden;
  width: 138px;
  height: 100px;
`;
const RoomNameBox = styled.div`
  display: -webkit-box;
  overflow: hidden;
  width: 138px;
  max-height: 52px;
  line-height: normal;

  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;
const TagBox = styled.div`
  display: -webkit-box;
  overflow: hidden;
  width: 138px;
  max-height: 44px;
  margin-top: 3px;
  margin-bottom: 20px;
  color: var(--darkgrey);
  line-height: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const SubTitleBox = styled.div`
  overflow: hidden;
  width: 262px;
  max-height: 44px;
  margin-top: auto;
  color: var(--darkgrey);

  ${body_3};
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: normal;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding: 20px;
  color: var(--grey);
  border-top: 1px solid var(--line);
`;

const FooterItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
`;

export default RoomCard;
