import AWS from "aws-sdk";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

//components
import Icon from "./Icon";

//element
import Input from "../elem/Input";

//redux
import { setPreview } from "../redux/modules/image";

const ImgUploader = ({ fileInput, name, isImage, setIsImage }) => {
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
      <FileInput
        type="file"
        id="upload"
        className="image-upload"
        onChange={imagePreview}
        ref={fileInput}
        accept="image/*"
        files
      />
      <FileLabel htmlFor="upload" className="image-upload-wrapper">
        {isImage && <Image url={preview} />}
        {!isImage && (
          <DefaultImage>
            <IconBox>
              <Icon icon="image" size="28px" />
            </IconBox>
          </DefaultImage>
        )}
      </FileLabel>
    </>
  );
};

const FileInput = styled.input`
  position: absolute;
  z-index: -1;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const FileLabel = styled.label`
  position: inherit;
  width: 100px;
  height: 100px;
`;

const DefaultImage = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--line);
  color: var(--darkgrey);
`;

const Image = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url("${(props) => props.url}");
  background-size: cover;
`;

const IconBox = styled.div`
  margin: 0 auto;
`;
export default ImgUploader;
