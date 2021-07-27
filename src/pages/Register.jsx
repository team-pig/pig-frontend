import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// elem
import { Button, Input } from "../elem";
import Template from "../components/Template";

// redux & api
import { useDispatch } from "react-redux";
import { __register } from "../redux/modules/user";

const Register = ({ history }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      nickname: "",
      password: "",
      checkPassword: "",
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
      checkPassword: Yup.string()
        .min(6, "비밀번호가 너무 짧네요! 6자 이상 입력하세요.")
        .matches(/[a-zA-Z]/, "더 강력한 비밀번호를 사용하세요.")
        .required("패스워드를 한번 더 입력해주세요.")
        .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않아요."),
    }),

    onSubmit: (values, { resetForm }) => {
      const { checkPassword, ...rest } = values;
      dispatch(__register(rest));
    },
  });

  return (
    <Template>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="email"
          type="text"
          _onChange={formik.handleChange}
          value={formik.values.userName}
          placeholder="이메일"
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <Input
          name="nickname"
          type="text"
          _onChange={formik.handleChange}
          value={formik.values.nickname}
          placeholder="닉네임"
        />
        {formik.touched.nickname && formik.errors.nickname ? (
          <div>{formik.errors.nickname}</div>
        ) : null}
        <Input
          name="password"
          type="password"
          _onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="비밀번호를 입력하세요"
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <Input
          name="checkPassword"
          type="password"
          _onChange={formik.handleChange}
          value={formik.values.checkPassword}
          placeholder="비밀번호를 한번 더 입력하세요"
        />
        {formik.touched.checkPassword && formik.errors.checkPassword ? (
          <div>{formik.errors.checkPassword}</div>
        ) : null}
        <Button type="submit">회원가입</Button>
      </form>
      <div
        onClick={() => {
          history.push("/login");
        }}
      >
        로그인 하기
      </div>
    </Template>
  );
};

// const Container = styled.section``;
export default Register;
