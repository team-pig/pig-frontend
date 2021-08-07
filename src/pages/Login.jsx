import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

import Template from "../components/Template";
import AccountInfo from "../components/AccountInfo";
import HelpBtns from "../components/HelpBtns";

// elem
import { Button, Input, Text } from "../elem";

//redux
import { useDispatch } from "react-redux";
import { __login } from "../redux/modules/user";
import { head_5 } from "../themes/textStyle";
import flex from "../themes/flex";

const Login = (props) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("올바른 이메일 주소가 아닙니다.")
        .required("빠뜨린 부분이 있네요! 잊지 말고 이메일을 추가하세요."),
      password: Yup.string()
        .min(6, "비밀번호가 너무 짧네요! 6자 이상 입력하세요.")
        .matches(/[a-zA-Z]/, "더 강력한 비밀번호를 사용하세요.")
        .required("패스워드를 입력해주세요."),
    }),

    onSubmit: (values, { resetForm }) => {
      dispatch(__login(values));
      resetForm();
    },
  });

  return (
    <Template>
      <Container>
        <Title type="head_3">좋은 하루 되세요!</Title>
        <FormContainer onSubmit={formik.handleSubmit}>
          <Input
            isError={formik.touched.email && Boolean(formik.errors.email)} // formik에서 validation error가 있는 경우 Input 으로 error 결과를 boolean으로 보냄
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
          <Input
            isError={formik.touched.password && Boolean(formik.errors.password)}
            useHelper={formik}
            _onClick={() => {
              formik.setFieldValue("password", "");
            }}
            _onChange={formik.handleChange}
            name="password"
            type="password"
            value={formik.values.password}
            placeholder="비밀번호"
          />
          {/* <HelpBtns /> */}
          <LoginBtn shape="green-fill" type="submit">
            로그인
          </LoginBtn>
        </FormContainer>
        <AccountInfo
          text="계정이 없으신가요?"
          btnText="회원가입"
          _onClick={() => history.push("/register")}
        />
      </Container>
    </Template>
  );
};

const Container = styled.section`
  ${flex("start", "center", false)}
  width: 100%;
  margin-top: 100px;

  ${({ theme }) => theme.device.mobile} {
    --minPadding: 18px;
    width: 100%;
    margin-top: 60px;
    padding: 0 var(--minPadding);
  }
`;

const FormContainer = styled.form`
  width: 380px;

  ${({ theme }) => theme.device.mobile} {
    width: 100%;
    max-width: 380px;
  }
`;

const Title = styled(Text)`
  margin-bottom: 40px;
  color: var(--main);
  text-align: center;

  ${({ theme }) => theme.device.mobile} {
    ${head_5};
  }
`;

const LoginBtn = styled(Button)`
  margin-top: 60px;
`;

export default Login;
