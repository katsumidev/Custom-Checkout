import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Quicksand', sans-serif;
        line-height: normal !important;

        p {
            margin-bottom: 0px !important;
        }
    }
    body {
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        color: var(--main-text);
        overflow-x: hidden;
    }
    svg {
        flex-shrink: 0;
    }
    :root {
        --main-background: #fff;
        --main-text: #252525;
        --secundary-text: #838385;
        --secundary-background: #F7F6F9;
        --tertiary-background: #F1F0F5;
        --accent-color:  #ED0B6E;
        --accent-color-hover:  #353535;
        --border-radius: 0.6rem;
    }

    .bootstrap-style {

    }
`;