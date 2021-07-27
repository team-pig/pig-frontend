import AWS from "aws-sdk";
import React from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";

//element
import Input from "../elem/Input";

//redux
import image from "../redux/modules/image";

const ImgUploader = (props) => {

  AWS.config.update({
    region: "ap-northeast-2",
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:a2a935f7-cd6a-47b9-8e6b-c02b7b2e0bb2", // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });
  
  const dispatch = useDispatch();
  const fileInput = React.useRef();

  const selectFile = (e) => {

    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(image.setPreview(reader.result));
    }
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0];

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "teampigbucket",
        Key: file.name,
        Body: file,
      },
    });

    const promise = upload.promise();

    promise.then(
      function (data) {
        alert("이미지 업로드에 성공했습니다.");
      },
      function (err) {
        return alert("오류가 발생했습니다:", err.message);
      }
    );
  };

  return (
    <>
      <input
        type="file"
        id="upload"
        className="image-upload"
        onChange={handleFileInput}
        ref={fileInput}
      />
      <label htmlFor="upload" className="image-upload-wrapper"></label>
    </>
  );
};

export default ImgUploader;
