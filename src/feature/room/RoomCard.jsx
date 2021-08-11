import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

//components
import ModifyRoomModal from "./ModifyRoomModal";
import Icon from "../../components/Icon";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import Drop from "../../components/Drop";
//elements
import { Text } from "../../elem/index";
import { body_3 } from "../../themes/textStyle";
import MemberImg from "../../elem/MemberImg";
import BookMark from "./BookMark";
import RoomTags from "./RoomTags";

//redux
import { __deleteRoom, __exitRoom, __toggleBookmark, __getMarkedList, __getUnMarkedList, __getMergedList } from "../../redux/modules/room";

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
  history,
  index,
  isShow,
  isMarked,
  openDrop,
  closeDrop,

}) => {
  const dispatch = useDispatch();
  const [showModModal, setShowModModal] = useState(false);
  const [showAllMember, setShowAllMember] = useState(false);
  const [isDisplay, setIsDisplay] = useState(false);
  // const [isMarked, setIsMarked] = useState(false);

  useEffect(() => {
     memberCount();
    //  bookmarkMemberCheck();
  }, []);

  const memberCount = () => {
    if (members.length > 4) {
      setShowAllMember(false);
    } else {
      setShowAllMember(true);
    }
  }

  // const bookmarkMemberCheck = () => {
  //   if(bookmarkedMembers.includes(userId)){
  //     setIsMarked(true);
  //   } else{
  //     setIsMarked(false);
  //   }
  // }

  const clickBookmark = 
  async (e) => {
    e.stopPropagation();
    if(isMarked){
      e.stopPropagation();
      // setIsMarked(false);
      await dispatch(__toggleBookmark(roomId, isMarked));
      await dispatch(__getMarkedList());
      await dispatch(__getUnMarkedList());
      dispatch(__getMergedList());
      console.log("즐겨찾기 취소");
    }else if(!isMarked){
      e.stopPropagation();
      // setIsMarked(true);
      await dispatch(__toggleBookmark(roomId, isMarked));
      await dispatch(__getMarkedList());
      await dispatch(__getUnMarkedList());
      dispatch(__getMergedList());
      console.log("즐겨찾기 등록");

    }
    
  }

  const exitRoom = (e) => {
    e.stopPropagation();
    dispatch(__exitRoom(roomId));
  };

  const deleteRoom = (e) => {
    e.stopPropagation();
    dispatch(__deleteRoom(roomId));
  };

  const openModModal = (e) => {
    e.stopPropagation();
    setShowModModal(true);
  };

  const closeModModal = () => {
    setShowModModal(false);
  };

  const handleClick = (e) => {
    // e.preventDefault();
    e.stopPropagation();
    if (isDisplay === index) {
      setIsDisplay(false);
      closeDrop();
      console.log(isDisplay);
      console.log("닫다");
      console.log(isShow);
    } else {
      openDrop();
      setIsDisplay(index);
      console.log("열다");
      console.log(isDisplay);
      console.log(isShow);
    }
  };

  const closeDownDrop = () => {
    setIsDisplay(false);
    closeDrop();
    console.log("드롭닫기");
    console.log(isDisplay);
  };

  const handleOut = (e) => {
    setIsDisplay(false);
    closeDrop();
    console.log("handleOut");
  };

  const handleIn = (e) => {
    openDrop();
    setIsDisplay(index);
    console.log("handleIn");
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
        {/* {display===index && isShow ? ( */}
        <Drop.Container
          display={isDisplay === index ? "true" : undefined}
          onClick={closeDownDrop}
          onMouseOut={handleOut}
          onMouseOver={handleIn}
          width="76px"
          height="126px"
          shadow
        >
          <Drop.Item
            width="76px"
            height="42px"
            color="darkgrey"
            _onClick={openModModal}
          >
            수정하기
          </Drop.Item>
          <Drop.Item
            width="76px"
            height="42px"
            color="darkgrey"
            _onClick={exitRoom}
          >
            나가기
          </Drop.Item>
          <Drop.Item
            width="76px"
            height="42px"
            color="darkgrey"
            _onClick={deleteRoom}
          >
            삭제하기
          </Drop.Item>
        </Drop.Container>
        {/* ) : null} */}

        <StarIcon onClick={clickBookmark}>
          {/* <Star /> */}
          <BookMark isMarked={isMarked} />
        </StarIcon>
        <CardSection>
          <CardProfile>
            <RoundImg src={roomImage} />
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
            <MemberImg members={members} memberStatus={memberStatus}/>
            <div onClick={handleClick}>
              <Icon icon="more" size="24px" />
            </div>
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
`;

const CardSection = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  width: 302px;
  height: 202px;

  padding: 20px 20px 15px 20px;
`;

const StarIcon = styled.div`
  position: absolute;
  z-index: 28;
  top: 10px;
  right: 10px;
`;

const CardProfile = styled.div`
  position: relative;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const RoundImg = styled.img`
  width: 100px;
  height: 100px;

  margin-right: 15px;

  border-radius: 50%;
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
  overflow: hidden;

  width: 138px;
  max-height: 52px;

  line-height: normal;
`;
const TagBox = styled.div`
  overflow: hidden;

  width: 138px;
  max-height: 44px;
  margin-top: 3px;
  margin-bottom: 20px;

  color: var(--darkgrey);

  line-height: normal;
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
