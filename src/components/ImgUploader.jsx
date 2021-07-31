import AWS from "aws-sdk";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

//element
import Input from "../elem/Input";

//redux
import { setPreview } from "../redux/modules/image";

const ImgUploader = ({ fileInput, name, isImage, setIsImage}) => {

  const dispatch = useDispatch();
 
  const preview = useSelector((state) => state.image.preview);

  const imagePreview = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(setPreview(reader.result));
    };
    setIsImage(true);
  };

  AWS.config.update({
    region: "ap-northeast-2",
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:a2a935f7-cd6a-47b9-8e6b-c02b7b2e0bb2", // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });

  return (
    <>
      <input
        type="file"
        id="upload"
        className="image-upload"
        onChange={imagePreview}
        ref={fileInput}
        accept="image/*"
        files
      />
      <label htmlFor="upload" className="image-upload-wrapper"></label>
      {isImage && <Image src={preview}/>}
      {!isImage && <Image src="http://via.placeholder.com/400x300" />}
      {/* <img src={preview ? preview : "http://via.placeholder.com/400x300"} /> */}
     
    </>
  );
};

const Image = styled.img`
width: 400px;
height: 300px;
`;
export default ImgUploader;
