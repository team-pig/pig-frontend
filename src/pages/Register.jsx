import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";

import SEO from "../components/SEO";
import Template from "../components/Template";
import AccountInfo from "../components/AccountInfo";
import { head_5 } from "../themes/textStyle";

// elem
import { Button, Input, Text } from "../elem";

// redux & api
import { useDispatch, useSelector } from "react-redux";
import { __register } from "../redux/modules/user";
import flex from "../themes/flex";
import ImageModule from "../components/ImageModule";
import Alert from "../components/Alert";
import { pop } from "../redux/modules/alert";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState("");
  const { value, msg } = useSelector((state) => state.alert);

  /**
   *
   * 함수명은 반드시 getImgUrlFromS3 로 만들어주시고,
   * 첫번째 파라미터에  callback,  두번째 파라미터에 file 선언해서
   * const result = await callback(file); 이렇게 선언해줘야 합니다.
   *
   * 이후 result를 이용하여 원하는 작업을 하면 됩니다.
   * result는 이미지 url를 반환합니다.
   */

  const getImgUrlFromS3 = async (callback, file) => {
    const result = await callback(file);
    // console.log(result); // 디버깅 할 때 사용하세요.
    setAvatar(result);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
      color: "blue",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("올바른 이메일 주소가 아닙니다.")
        .required("빠뜨린 부분이 있네요! 잊지 말고 이메일을 추가하세요."),
      nickname: Yup.string()
        .min(3, "닉네임은 3글자 이상 입력해주세요.")
        .required("닉네임을 입력해주세요!"),
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
      dispatch(__register({ ...values, avatar }));
      resetForm();
    },
  });

  return (
    <>
      <SEO title="회원가입" />
      <Alert dispatcher={pop} msg={msg} status={value} />
      <Template>
        <Container>
          <Title type="head_3">반가워요!</Title>
          <Avatar>
            {/* 
              props 소개

              getImgUrlFromS3={getImgUrlFromS3} : [필수] 위에서 선언해준 함수를 반드시 props로 넣어주세요.
              useInitPreview={true} : [선택] 이미지 초기화 기능 사용여부 입니다. 이것을 사용하면 이미지를 올렸을 때 
              제거 버튼이 활성화되고, preview, file object 를 초기화합니다. (dafualt는 ture 입니다.)

              useSaveAvartar={false} : [선택] 저장 버튼 사용 여부 입니다. 저장 버튼을 사용하면, 이미지를 선택할 때는 base64로 
              프리뷰를 제공하고, 저장 버튼을 눌렀을 때 S3로 전송하여 url를 반환합니다. (default는 false 입니다.)
            
            */}
            <ImageModule
              getImgUrlFromS3={getImgUrlFromS3}
              // useInitPreview={true}
              // useSaveAvartar={false}
            />
          </Avatar>
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

const RegisterBtn = styled(Button)`
  margin-top: 60px;
`;

const Avatar = styled.div`
  ${flex()}
  margin-bottom : 20px;
`;

export default Register;
