import React, {useState} from "react";
import styled from "styled-components";
import { Text } from "../elem/index";

const Item = ({ children, _onClick, direction, history }) => {
  return (
    <Link>
      <Text>{children}</Text>
    </Link>
  );
};

const Container = ({children, size, direction, type, shadow}) => {
  const [isMenuVisible, setIsMenuVisible] = useState("");
  return(
    
  )
}

const Link = styled.div``;
