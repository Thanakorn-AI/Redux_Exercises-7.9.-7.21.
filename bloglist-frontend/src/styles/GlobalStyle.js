// Redux_Exercises-7.9.-7.21./bloglist-frontend/src/styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${(props) => props.theme.fonts.main};
    color: ${(props) => props.theme.colors.black};
    background-color: ${(props) => props.theme.colors.white};
    line-height: 1.5;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary};
    transition: color ${(props) => props.theme.transitions.default};
    
    &:hover {
      color: ${(props) => props.theme.colors.secondary};
    }
  }

  button {
    cursor: pointer;
    font-family: ${(props) => props.theme.fonts.main};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    margin-bottom: ${(props) => props.theme.spacing.md};
  }
`;

export default GlobalStyle;
