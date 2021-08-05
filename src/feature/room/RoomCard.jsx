import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

//components
import ModifyRoomModal from "./ModifyRoomModal";
import Icon from "../../components/Icon";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
//elements
import { Button, Text } from "../../elem/index";
import { body_3 } from "../../themes/textStyle";
import MemberImg from "../../elem/MemberImg";

//redux
import { __deleteRoom, __exitRoom } from "../../redux/modules/room";

//roomList map의 list에서 받아오는 값
const RoomCard = ({
  roomId,
  roomImage,
  roomName,
  subtitle,
  members,
  createdAt,
  tag,
  history,
}) => {
  const dispatch = useDispatch();
  const [showModModal, setShowModModal] = useState(false);
  const [showAllMember, setShowAllMember] = useState(false);

  useEffect(() => {
    if (members.length > 4) {
      setShowAllMember(false);
    } else {
      setShowAllMember(true);
    }
  });

  const openModModal = () => {
    setShowModModal(true);
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
        <StarIcon>
          <Star />
        </StarIcon>
        <CardSection>
          <CardProfile>
            <RoundImg src={roomImage} />
            <TextBox>
              <RoomNameBox>
                <Text type="sub_1">{roomName}</Text>
              </RoomNameBox>
              <TagBox>
                <Text type="body_2">{tag}</Text>
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
            <MemberImg members={members} />

            <Icon icon="more" size="24px" />
          </FooterItem>
        </CardFooter>
      </Container>
      <div>
        <Button _onClick={openModModal}>수정하기</Button>
        <Button
          _onClick={(e) => {
            console.log(roomId);
            dispatch(__deleteRoom(roomId));
          }}
        >
          삭제하기
        </Button>
        <Button
          _onClick={(e) => {
            dispatch(__exitRoom(roomId));
          }}
        >
          나가기
        </Button>
      </div>
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
