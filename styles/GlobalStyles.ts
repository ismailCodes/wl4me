import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }

    html {
        height: 100%;
    }

    html, body {
        background-color: ${({ theme }) => theme.colors.backgroundMain};
    }

    body {
        display: flex;
        height: 100%;
    }

    #__next {
        display: flex;
        flex-grow: 1;
        height: 100%;
    }
`;

export default GlobalStyles;
