import React, {useState} from 'react';
import styled from 'styled-components';
import AWS from 'aws-sdk';

//components
import ImgUploader from '../components/ImgUploader';

// elements
import Input from '../elem/Input';

const AddRoomModal = ({showModal, closeModal}) => {



  return (
    <>
        {showModal ? (<ModalContainer>
          <ModalOverlay onClick={closeModal}></ModalOverlay>
          <ModalContent>
           <ImgUploader />
          </ModalContent>
        </ModalContainer>) : null}
     
    </>
  );
};
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const ModalOverlay = styled.div`
  position: absolute;
  display: initial;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalContent = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  padding-top: 5px;
  background-color: white;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  
  }
`;



export default AddRoomModal;