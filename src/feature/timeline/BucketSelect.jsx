import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Icon from "../../components/Icon";
import { Text } from "../../elem";
import { __updateCardLocateOtherBucket } from "../../redux/modules/board";
import flex from "../../themes/flex";
import { button } from "../../themes/textStyle";
import { __loadBucket } from "../../redux/modules/board";
import { __editScheduleBucket } from "../../redux/modules/calendar";

const BucketSelect = ({ bucketId, cardId }) => {
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
    dispatch(__loadBucket(roomId));
  }, [dispatch, roomId]);

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
    dispatch(
      __editScheduleBucket(roomId, cardId, sourceBucketId, destinationBucketId)
    );
  };
  return (
    <>
      {bucketValues.length !== 0 && target && (
        <Select onClick={() => setIsShow((pre) => !pre)}>
          <Text type="button" color="main">
            {target.bucketName}
          </Text>
          <Icon icon="arrow-down" size="20px" />
          {isShow && (
            <Options>
              {bucketValues.length !== 0 &&
                bucketValues.map((bucket, idx) => (
                  <Option
                    key={bucket.bucketId}
                    onClick={() => clickOption(bucket.bucketId)}
                  >
                    {bucket.bucketName}
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
  position: relative;
  top: -20px;
  left: 0;
  width: 100%;
  height: 58px;
  padding: 0 40px;
  border: none;
  border-bottom: 1px solid var(--line);
  outline: none;
  cursor: pointer;
  z-index: var(--indexDrop);
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
