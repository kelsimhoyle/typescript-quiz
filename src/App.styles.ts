import styled, { createGlobalStyle } from "styled-components";
import BgImage from "./images/background.jpg";

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
    }

    body {
        background-image: url(${BgImage});
        background-size: cover;
        margin: 0;
        padding 0 20px;
        display: flex;
        justify-content: center;
    }

    * {
        box-size: border-box;
        font-family: 'Roboto', sans-serif;'
        }
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    > p {
        color: #f5f5f5;
    }

    h2,
    label,
    .score {
        color: #f5f5f5;
        margin: 0;
        filter: drop-shadow(2px 2px #0085a3);
    }

    h2, 
    .score {
        font-size: 2rem;
    }

    label {
        font-size: 1.5rem;
        margin: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    h1 {
        font-family: 'Noto Sans TC', sans-serif;
        background-image: linear-gradient(180deg, #fff, #87f1ff);
        font-weight: 400;
        background-size: 100%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;
        filter: drop-shadow(2px 2px #0085a3);
        font-size: 70px;
        text-align: center;
        margin: 20px;
    }

    select {
        cursor: pointer;
        font-size: 1rem;
        height: 40px;
        margin: 5px 0;
        padding: 5px;
    }

    .start, .next {
        cursor: pointer;
        background: linear-gradient(180deg, #ffffff, #ffcc91);
        border: 2px solid #d38558;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        height: 40px;
        margin: 20px 0;
        padding: 0 40px;
      }
      .start {
        max-width: 200px;
      }
`