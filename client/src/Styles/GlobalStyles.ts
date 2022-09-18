import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export default createGlobalStyle`
    ${reset}
    *, *::before, *::after{
        box-sizing: border-box;
    }
    html{
        font-size: 1vw;
        background-color: RGB(23,23,23);
    }
    a{
        color: inherit;
        text-decoration: none;
    }
    ul{
        list-style: none;
    }
`;