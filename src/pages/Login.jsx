import React from "react";
import Template from "../components/Template";
import * as Yup from "yup";
import { useFormik } from "formik";

// elem
import { Button, Input } from "../elem";

//redux
import { useDispatch } from "react-redux";
import { __login } from "../redux/modules/user";

const Login = ({ history }) => {
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
      <form onSubmit={formik.handleSubmit}>
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
          placeholder="비밀번호를 입력하세요"
        />
        <Button shape="green-fill" type="submit">
          로그인
        </Button>
      </form>
      <div
        onClick={() => {
          history.push("/register");
        }}
      >
        회원가입 하러가기
      </div>
    </Template>
  );
};

export default Login;
