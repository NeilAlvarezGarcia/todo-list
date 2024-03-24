import { createGlobalStyle } from 'styled-components';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700'],
});

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        ${roboto.style}
    }
    
    body, html {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }

    button {
       border: none;
       outline: none;
       cursor: pointer;
    }
`;
