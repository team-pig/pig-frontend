import React from "react";
import SEO from "../components/SEO";
import Template from "../components/Template";
import styled from "styled-components";
import flex from "../themes/flex";
import { body_4, head_3, head_5, sub_2 } from "../themes/textStyle";
import { Button, Text, Input } from "../elem";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { __resetPassword } from "../redux/modules/user";
import Alert from "../components/Alert";
import { pop } from "../redux/modules/alert";
import { useHistory } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { value, msg } = useSelector((state) => state.alert);

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("올바른 이메일 주소가 아닙니다.")
        .required("빠뜨린 부분이 있네요! 잊지 말고 이메일을 추가하세요."),
    }),

    onSubmit: (values, { resetForm }) => {
      dispatch(__resetPassword(values.email));
      resetForm();
    },
  });

  return (
    <>
      <SEO title="비밀번호 찾기" />
      <Alert dispatcher={pop} msg={msg} status={value} />
      <Template>
        <Container>
          <Title>비밀번호 찾기</Title>
          <SubTitle>가입하신 아이디(이메일) 입력해주세요 ✨</SubTitle>
          <FormContainer onSubmit={formik.handleSubmit}>
            <ValidIdInput>
              <Input
                isError={formik.touched.email && Boolean(formik.errors.email)}
                useHelper={formik}
                _onClick={() => {
                  formik.setFieldValue("email", "");
                }}
                _onChange={formik.handleChange}
                name="email"
                type="text"
                value={formik.values.email}
                placeholder="이메일"
              />
            </ValidIdInput>
            <Password>
              <div onClick={() => history.push("/login")}>이전으로</div>
            </Password>
            <SubmitButton>
              <Button type="submit">확인</Button>
            </SubmitButton>
          </FormContainer>
        </Container>
      </Template>
    </>
  );
};

const Password = styled.div`
  ${flex("end")}
  ${body_4}
  width: 100%;
  text-align: right;
  cursor: pointer;
  div {
    &:hover {
      color: var(--notice);
      text-decoration: underline;
    }
  }
`;

const Container = styled.section`
  width: 400px;
  margin: 0 auto;
  margin-top: 100px;
  ${({ theme }) => theme.device.mobile} {
    --minPadding: 18px;
    width: 100%;
    margin-top: 60px;
    padding: 0 var(--minPadding);
  }
`;

const FormContainer = styled.form`
  width: 100%;
  ${({ theme }) => theme.device.mobile} {
    width: 100%;
    max-width: 380px;
  }
`;

const Title = styled(Text)`
  ${head_3}
  margin-bottom: 10px;
  color: var(--main);
  text-align: center;
  ${({ theme }) => theme.device.mobile} {
    ${head_5};
  }
`;

const SubTitle = styled.div`
  ${sub_2}
  color: var(--notice);
  text-align: center;
  width: 100%;
  height: 46px;
  margin-bottom: 20px;
`;

const SubmitButton = styled.div``;

const ValidIdInput = styled.div`
  margin-bottom: 30px;
`;

export default React.memo(ResetPassword);
