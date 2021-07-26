import React from 'react';
import styled from 'styled-components';

const Input = ({ value, name, _onChange, placeholder }) => {
	return (
		<Wrapper
			value={value}
			name={name}
			onChange={_onChange}
			placeholder={placeholder}
		/>
	);
};

const Wrapper = styled.input``;
export default Input;
