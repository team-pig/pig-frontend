import React from "react";
import SEO from "../components/SEO";
import Template from "../components/Template";
import styled from "styled-components";
import flex from "../themes/flex";
import { head_3, head_5, sub_2 } from "../themes/textStyle";
import { Button, Text, Input } from "../elem";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { __submitNewPassword } from "../redux/modules/user";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
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
      dispatch(__submitNewPassword(id, values));
      resetForm();
    },
  });

  return (
    <>
      <SEO title="비밀번호 초기화" />
      <Template>
        <Container>
          <Title>비밀번호 초기화</Title>
          <SubTitle>새롭게 사용하실 비밀번호를 입력해주세요 ✨</SubTitle>
          <FormContainer onSubmit={formik.handleSubmit}>
            <NonVisibleWrapper>
              <Input
                isError={
                  formik.touched.password && Boolean(formik.errors.password)
                }
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
            </NonVisibleWrapper>
            <NonVisibleWrapper>
              <Input
                isError={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
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
            </NonVisibleWrapper>
            <NonVisibleWrapper>
              <Button type="submit">확인</Button>
            </NonVisibleWrapper>
          </FormContainer>
        </Container>
      </Template>
    </>
  );
};

const Container = styled.section`
  width: 400px;
  margin: 0 auto;
  ${flex("start", "center", false)}
  margin-top: 100px;
  ${({ theme }) => theme.device.mobile} {
    --minPadding: 18px;
    width: 100%;
    margin-top: 60px;
    padding: 0 var(--minPadding);
  }
`;

const FormContainer = styled.form`
  ${flex("center", "center", false)}
  gap: 30px;
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

const NonVisibleWrapper = styled.div`
  text-align: right;
  width: 100%;
  height: 46px;
`;

export default ResetPassword;
