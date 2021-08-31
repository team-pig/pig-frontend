import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// component & elem
import Icon from "../../components/Icon";
import { button } from "../../themes/textStyle";
import flex from "../../themes/flex";
import { Text } from "../../elem";

// redux & api
import { __editScheduleBucket } from "../../redux/modules/calendar";

const BucketSelect = ({ bucketId, cardId, ...rest }) => {
  const { roomId } = useParams();
  const dispatch = useDispatch();

  const buckets = useSelector((state) => state.board.columns);
  const bucketValues = Object.values(buckets);

  const [currentId, setCurrentId] = useState(bucketId);
  const [isShow, setIsShow] = useState(false);
  const [target, setTarget] = useState(
    bucketValues.filter((bucket) => bucket.bucketId === currentId)[0] ||
      bucketValues[0]
  );

  useEffect(() => {
    setTarget(
      bucketValues.filter((bucket) => bucket.bucketId === currentId)[0] ||
        bucketValues[0]
    );
  }, [currentId, bucketValues]);

  const clickOption = (id) => {
    const sourceBucketId = currentId;
    const destinationBucketId = id;
    setCurrentId(id);
    if (sourceBucketId === destinationBucketId) return;
    dispatch(
      __editScheduleBucket(roomId, cardId, sourceBucketId, destinationBucketId)
    );
  };
  return (
    <>
      {bucketValues.length !== 0 && target && (
        <Select onClick={() => setIsShow((pre) => !pre)} {...rest}>
          <Text type="button" color="main">
            {target.bucketName ? target.bucketName : "제목 없음"}
          </Text>
          <Icon icon="arrow-down" size="20px" />
          {isShow && (
            <Options>
              {bucketValues.length !== 0 &&
                bucketValues.map((bucket) => (
                  <Option
                    key={bucket.bucketId}
                    onClick={() => clickOption(bucket.bucketId)}
                  >
                    {bucket.bucketName ? bucket.bucketName : "제목 없음"}
                  </Option>
                ))}
            </Options>
          )}
        </Select>
      )}
    </>
  );
};

const Select = styled.div`
  ${flex("between")};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  padding: 0 40px;
  border: none;
  border-bottom: 1px solid var(--line);
  outline: none;
  cursor: pointer;
  z-index: var(--indexDrop);
  box-sizing: border-box;

  ${({ theme }) => theme.device.mobile} {
    height: 40px;
  }
`;

const Options = styled.ul`
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  transform: translateY(100%);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const Option = styled.li`
  ${flex("start", "center")};
  ${button};
  height: 48px;
  margin: 0;
  padding: 0 40px;
  border-bottom: 1px solid var(--line);
  background-color: var(--white);
  z-index: 100;

  &:hover {
    color: var(--white);
    background-color: var(--main);
  }
`;

export default BucketSelect;
