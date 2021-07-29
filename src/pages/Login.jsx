import React from "react";
import Template from "../components/Template";
import * as Yup from "yup";
import { useFormik } from "formik";

// elem
import { Button, Input } from "../elem";

//redux
import { useDispatch } from "react-redux";
import { __logout, __login } from "../redux/modules/user";

const Login = ({ history }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "asdf@gmail.com",
      password: "12345aag",
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

    onSubmit: (values) => {
      // dispatch 예정
      dispatch(__login(values));
    },
  });

  return (
    <Template>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="email"
          type="text"
          _onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="이메일"
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
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
        <Button type="submit">로그인</Button>
      </form>
      <div
        onClick={() => {
          history.push("/register");
        }}
      >
        회원가입 하러가기
      </div>
      <Button
        _onClick={() => {
          dispatch(__logout());
        }}
      >
        로그아웃
      </Button>
    </Template>
  );
};

export default Login;
