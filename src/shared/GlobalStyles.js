import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
	${reset};

    :root {
			/* color */
    --main: #4D6C56;
    --black: #151515;
    --darkgrey: #757575;
    --grey: #b7b7b7;
    --line: #eaeaea;
		--white : #ffffff;
		--point : #ffcccc;
		--notice : #ff7776;

		/* z-index */
		--indexHeader : 30;
		--indexDrop : 30;

		/* margin */
		--xsMargin: 10px;
		--smMargin: 20px;
		--mdMargin: 40px;
  };

  * {
		box-sizing : border-box;
	}

	html {
		margin : 0;
		padding: 0;
		font-size:62.5%;
		box-sizing: border-box;
	}

	body{
		position: relative;
		margin: 0;
		padding: 0;
		font-family: 'NanumSquareRound',sans-serif;
		/* font-family:--apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;  */
	}

	a {
		color: var(--black);
		text-decoration:none;
	}

	input,
	textarea,
	button {
    font-family: 'NanumSquareRound',sans-serif;
		color: var(--black);
		border: none;
		outline: none;
	}

	button {
		padding: 0;
		background-color: transparent;
		cursor: pointer;
	}

`;

export default GlobalStyles;
