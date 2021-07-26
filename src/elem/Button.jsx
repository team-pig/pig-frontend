import React from 'react';
import styled from 'styled-components';

const Button = ({ children, _onClick }) => {
	return <Wrapper onClick={_onClick}>{children}</Wrapper>;
};

const Wrapper = styled.button``;
export default Button;
