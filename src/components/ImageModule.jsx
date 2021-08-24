import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";

// elem  & etc
import { uploadFile } from "../shared/uploadFile";
import flex from "../themes/flex";
import Icon from "./Icon";

const ImageModule = ({
  children,
  getImgUrlFromS3,
  useInitPreview = true,
  useSaveAvartar = false,
  ...rest
}) => {
  const fileInput = useRef();
  const [preview, setPreview] = useState("");
  const [imgObject, setImgObject] = useState(null);

  useEffect(() => {
    if (rest.roomPreview) {
      setPreview(rest.roomPreview);
    }
  }, [rest.roomPreview]);

  // useSaveAvartar === false 일때 (이미지를 업로드함과 동시에 S3에 저장)
  const imagePreview = async (e) => {
    const file = fileInput.current.files[0];
    if (!file) return; // 파일선택 후 '취소' 했을 때 발생하는 오류 처리

    setImgObject(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };

    if (!useSaveAvartar) getImgUrlFromS3(uploadFile, file);
  };

  // useSaveAvartar === true 일 때, (저장 버튼을 눌러야 S3에 저장)
  const clickSaveAvatar = () => {
    if (imgObject !== null) getImgUrlFromS3(uploadFile, imgObject);
  };

  return (
    <Container>
      <ImageInput>
        <input
          ref={fileInput}
          type="file"
          id="fileUpload"
          style={{ display: "none" }}
          onChange={imagePreview}
        />
        <Label htmlFor="fileUpload" preview={preview}>
          {preview === "" && <Icon icon="image" size="24px" color="darkgrey" />}
        </Label>
      </ImageInput>
      {useInitPreview && imgObject && (
        <InitAvatarBtn
          onClick={(e) => {
            e.stopPropagation();
            setPreview("");
            setImgObject(null);
          }}
        >
          <Icon icon="delete" size="20px" color="darkgrey" />
        </InitAvatarBtn>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  ${flex("center", "end")}
  width: 100%;
`;

const ImageInput = styled.fieldset`
  ${flex()}
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const Label = styled.label`
  cursor: pointer;
  ${flex()}
  width: 100%;
  height: 100%;
  border-radius: 50%;
  ${(props) =>
    props.preview === "" &&
    css`
      background-color: var(--line);
    `}
  background-image: ${(props) => `url(${props.preview})`};
  background-size: cover;
  background-position: center center;
`;

const InitAvatarBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
`;
const SaveAvatarBtn = styled.button`
  margin-left: 20px;
  border: 1px solid var(--line);
  padding: 11px;
  &:hover {
    border: 1px solid var(--main);
    background-color: var(--main);
    color: var(--white);
  }
`;

export default ImageModule;
