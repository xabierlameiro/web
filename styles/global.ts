import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *{
    margin: 0;
    padding:0;
    box-sizing:border-box
  }
  html {
    height: 100%;
  }
  body {
    color: ${(props) => props.theme.colors.text};
    background: ${(props) => props.theme.colors.background};
    font: 400 16px Josefin Sans, sans-serif;
    height: 100%;
  }
  h1 {
    font: 100 64px Josefin Sans, sans-serif;
  }
  #__next {
  height: 100%;
  }
`
