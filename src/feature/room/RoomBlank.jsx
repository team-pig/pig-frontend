import React from "react";
import styled from "styled-components";

//component
import RoomBlankImg from "../../assets/img/room-blank-img.jpg";

const RoomBlank = ({ display }) => {
  return (
    <>
      <ImgBox>
        <BlankImg src={RoomBlankImg} />
      </ImgBox>
    </>
  );
};

const ImgBox = styled.div`
  display: flex;
  max-width: 684px;
  min-width: 350px;
  margin: 0 auto;
`;

const BlankImg = styled.div`
  display: ${(props) => props.display};
  width: 100%;
  height: 0;
  padding-top: calc(100% * (514 / 684));
  background-image: ${(props) => `url(${props.src})`};
  background-size: cover;
`;

export default RoomBlank;
