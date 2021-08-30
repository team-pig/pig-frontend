import React, { useCallback } from "react";
import styled from "styled-components";

// redux
import { useDispatch, useSelector } from "react-redux";
import { __resetPassword } from "../redux/modules/user";

// elem & compo
import SEO from "../components/SEO";
import Template from "../components/Template";
import MyAvatar from "../elem/MyAvatar";
import flex from "../themes/flex";
import { body_3, head_3, head_5 } from "../themes/textStyle";
import { Button, Text } from "../elem";
import Alert from "../components/Alert";
import { pop } from "../redux/modules/alert";

const MyPage = () => {
  const dispatch = useDispatch();
  const {
    user: { email, nickname },
  } = useSelector((state) => state.user);
  const alertOption = useSelector((state) => state.alert);

  const changePasswordHandler = useCallback(
    (email) => {
      dispatch(__resetPassword(email));
    },
    [dispatch]
  );

  return (
    <>
      <SEO title="마이페이지" />
      <Alert dispatcher={pop} alertOption={alertOption} />
      <Template>
        <Container>
          <Title>내 정보</Title>
          <MyAvatar large />
          <MyInfoContainer>
            <UserInfo>{email}</UserInfo>
            <UserInfo>{nickname}</UserInfo>
            {email && (
              <NonVisibleWrapper>
                <Button
                  size="150"
                  _onClick={(e) => {
                    e.preventDefault();
                    changePasswordHandler(email);
                  }}
                >
                  비밀번호 변경
                </Button>
              </NonVisibleWrapper>
            )}
          </MyInfoContainer>
        </Container>
      </Template>
    </>
  );
};

const Container = styled.section`
  width: 400px;
  margin: 0 auto;
  ${flex("start", "center", false)};
  margin-top: 100px;

  ${({ theme }) => theme.device.mobile} {
    --minPadding: 18px;
    width: 100%;
    margin-top: 60px;
    padding: 0 var(--minPadding);
  }
`;

const MyInfoContainer = styled.div`
  ${flex("center", "center", false)}
  gap: 10px;
  width: 100%;
  margin-top: 30px;
  ${({ theme }) => theme.device.mobile} {
    width: 100%;
    max-width: 380px;
  }
`;

const Title = styled(Text)`
  ${head_3}
  margin-bottom: 40px;
  color: var(--main);
  text-align: center;

  ${({ theme }) => theme.device.mobile} {
    ${head_5};
  }
`;

const UserInfo = styled.div`
  ${flex("start", "center")}
  ${body_3};
  padding-left: 16px;
  width: 100%;
  height: 46px;
  border: 1px solid var(--line);
`;

const NonVisibleWrapper = styled.div`
  text-align: right;
  width: 100%;
  height: 46px;
`;

export default React.memo(MyPage);
