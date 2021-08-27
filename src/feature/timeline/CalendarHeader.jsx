import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// redux
import { setCurrent } from "../../redux/modules/date";

// elem
import { IconBtn, Text } from "../../elem";
import flex from "../../themes/flex";
import Icon from "../../components/Icon";

const CalendarHeader = () => {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.date.current);

  const showLastMonth = () => {
    dispatch(setCurrent(current.clone().subtract(1, "month")));
  };

  const showNextMonth = () => {
    dispatch(setCurrent(current.clone().add(1, "month")));
  };

  return (
    <>
      <Header>
        <Nav>
          <CurrentMonth>
            <Text type="sub_1">{current.format("YYYY년 MM월")}</Text>
          </CurrentMonth>
          <NavIcons>
            <IconBtn _onClick={showLastMonth} padding="5px">
              <Icon icon="arrow-left" size="14px" color="var(--darkgrey)" />
            </IconBtn>
            <IconBtn _onClick={showNextMonth} padding="5px">
              <Icon icon="arrow-right" size="14px" color="var(--darkgrey)" />
            </IconBtn>
          </NavIcons>
        </Nav>
        <BtnBox>
          {/* <IconBtn _onClick={() => {}} padding="5px">
            <Icon icon="search" size="24px" color="var(--darkgrey)" />
          </IconBtn> */}
        </BtnBox>
      </Header>
    </>
  );
};

const Header = styled.div`
  ${flex("between")};
  width: 100%;
  height: 60px;
  padding: 0 20px;
`;

const CurrentMonth = styled.h2`
  margin-right: 12px;
`;

const Nav = styled.nav`
  ${flex()};
`;

const NavIcons = styled.div`
  ${flex()};
  gap: 8px;
`;

const BtnBox = styled.div`
  ${flex()};
  gap: 5px;
  margin-right: -10px;
`;

export default CalendarHeader;
