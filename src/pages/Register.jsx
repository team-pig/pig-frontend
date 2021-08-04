import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";

import Template from "../components/Template";
import AccountInfo from "../components/AccountInfo";

// elem
import { Button, Input, Text } from "../elem";

// redux & api
import { useDispatch } from "react-redux";
import { __register } from "../redux/modules/user";

const Register = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("올바른 이메일 주소가 아닙니다.")
        .required("빠뜨린 부분이 있네요! 잊지 말고 이메일을 추가하세요."),
      nickname: Yup.string().required("닉네임을 입력해주세요!"),
      password: Yup.string()
        .min(6, "비밀번호가 너무 짧네요! 6자 이상 입력하세요.")
        .matches(/[a-zA-Z]/, "더 강력한 비밀번호를 사용하세요.")
        .required("패스워드를 입력해주세요."),
      confirmPassword: Yup.string()
        .min(6, "비밀번호가 너무 짧네요! 6자 이상 입력하세요.")
        .matches(/[a-zA-Z]/, "더 강력한 비밀번호를 사용하세요.")
        .required("패스워드를 한번 더 입력해주세요.")
        .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않아요."),
    }),

    onSubmit: (values, { resetForm }) => {
      dispatch(__register(values));
      resetForm();
    },
  });

  return (
    <Template>
      <Container>
        <Title type="head_3">반가워요!</Title>
        <FormContainer onSubmit={formik.handleSubmit}>
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
          <Input
            isError={formik.touched.nickname && formik.errors.nickname}
            useHelper={formik}
            _onClick={() => {
              formik.setFieldValue("nickname", "");
            }}
            _onChange={formik.handleChange}
            name="nickname"
            type="text"
            value={formik.values.nickname}
            placeholder="닉네임"
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
            placeholder="비밀번호 (영문+숫자 조합 최소 6글자 이상)"
          />
          <Input
            isError={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            useHelper={formik}
            _onClick={() => {
              formik.setFieldValue("confirmPassword", "");
            }}
            _onChange={formik.handleChange}
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            placeholder="비밀번호 확인"
          />
          <RegisterBtn type="submit">회원가입</RegisterBtn>
        </FormContainer>
        <AccountInfo
          text="이미 계정이 있으신가요?"
          btnText="로그인"
          _onClick={() => history.push("/login")}
        />
      </Container>
    </Template>
  );
};

const Container = styled.section`
  width: 380px;
  margin: 7vh auto 0 auto;
`;

const FormContainer = styled.form`
  width: 100%;
`;

const Title = styled(Text)`
  margin-bottom: 40px;
  color: var(--main);
  text-align: center;
`;

const RegisterBtn = styled(Button)`
  margin-top: 60px;
`;

export default Register;
