import React from "react";
import styled from "styled-components";
import { Button } from "../elem";
import { useDispatch } from "react-redux";
import flex from "../themes/flex";
import { body_3 } from "../themes/textStyle";

const Alert = ({ dispatcher, alertOption }) => {
  const { value, msg, option } = alertOption;

  const dispatch = useDispatch();
  return (
    <>
      {value && (
        <ModalContainer>
          <ModalOverlay>
            <ModalContent>
              <Desc>{msg}</Desc>
              <BtnSet>
                {option && (
                  <Button
                    size="150"
                    _onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        dispatcher({ value: null, msg: null, option: null })
                      );
                    }}
                  >
                    확인
                  </Button>
                )}
              </BtnSet>
            </ModalContent>
          </ModalOverlay>
        </ModalContainer>
      )}
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
  z-index: var(--indexModal);
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);  
`;

const Desc = styled.div`
  ${body_3}
`;

const ModalContent = styled.div`
  ${flex("end", "center", false)}
  position: absolute;
  padding: 14px;
  left: 50%;
  top: 100px;
  transform: translate(-50%, 0);
  gap: 10px;
  z-index: var(--indexModal);
  width: 404px;
  height: 200px;
  background-color: var(--white);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.09), 0 6px 6px rgba(0, 0, 0, 0.08);
`;

const BtnSet = styled.div`
  ${flex()}
  margin: 24px 0 40px 0;
`;

export default Alert;
