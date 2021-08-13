import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Icon from "../../components/Icon";
import { Text } from "../../elem";
import { __updateCardLocateOtherBucket } from "../../redux/modules/board";
import flex from "../../themes/flex";
import { button } from "../../themes/textStyle";

const BucketSelect = ({ bucketId, cardId }) => {
  const { roomId } = useParams();

  const dispatch = useDispatch();

  const { buckets, bucketOrders } = useSelector((state) => state.calendar);

  const [currentId, setCurrentId] = useState(bucketId);
  const [isShow, setIsShow] = useState(false);

  const target =
    buckets.filter((bucket) => bucket.bucketId === currentId)[0] || buckets[0];
  const [targetName, setTargetName] = useState(target.bucketName);

  useEffect(() => {
    setTargetName(
      buckets.filter((bucket) => bucket.bucketId === currentId)[0].bucketName ||
        buckets[0].bucketName
    );
  }, [currentId, buckets]);

  const clickOption = (id, value) => {
    const beforeValues = Object.values(buckets);
    const sourceBucketOrder = beforeValues.splice(
      beforeValues.findIndex((bucket) => bucket.bucketId === currentId),
      1
    );
    const sourceInfo = {
      sourceBucketId: currentId,
      sourceBucketOrder,
    };
    setCurrentId(bucketId);

    const afterValues = Object.values(buckets);
    const destinationBucketOrder = afterValues.splice(
      afterValues.findIndex((bucket) => bucket.bucketId === currentId),
      1
    );
    const destinationInfo = {
      destinationId: currentId,
      destinationBucketOrder,
    };

    dispatch(
      __updateCardLocateOtherBucket(roomId, cardId, {
        ...sourceInfo,
        ...destinationInfo,
      })
    );
  };

  return (
    <Select onClick={() => setIsShow((pre) => !pre)}>
      <Text type="button" color="black">
        {targetName}
      </Text>
      <Icon icon="arrow-down" size="20px" />
      {isShow && (
        <Options>
          {buckets.length !== 0 &&
            buckets.map((bucket, idx) => (
              <Option
                key={bucket.bucketId}
                onClick={() => clickOption(bucket.bucketId, currentId)}
                target={bucket.bucketId === currentId ? "true" : "false"}
              >
                {bucket.bucketName}
              </Option>
            ))}
        </Options>
      )}
    </Select>
  );
};

const Select = styled.div`
  ${flex("between")};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 58px;
  padding: 0 40px;
  border: none;
  border-bottom: 1px solid var(--line);
  outline: none;
  cursor: pointer;
`;

const Options = styled.ul`
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  transform: translateY(100%);
`;

const Option = styled.li`
  ${flex("start", "center")};
  ${button};
  /* position: absolute; */
  width: 100%;
  top: 0;
  height: 36px;
  margin: 0;
  padding: 0 40px;
  border-bottom: 1px solid var(--line);
  background-color: ${(props) =>
    props.target === "true" ? `var(--main);` : `var(--white);`};
  color: ${(props) =>
    props.target === "true" ? `var(--white);` : `var(--black);`};
  z-index: 100;
`;

export default BucketSelect;
