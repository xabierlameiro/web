import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding:0;
    box-sizing:border-box
  }

  html {
    height: 100%;
  }

  body {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  body > div {
    min-height: inherit;
    display: grid;
    grid-template-rows: auto 1fr auto;
  }

  body ul {
    display: flex;
    list-style: none;
  }

  body ul li {
    display: block;
    padding: 0 10px;
  }

  .main {
    height: inherit;
  }


  .avatar:hover {
    z-index: 2;
  }

  .avatar img {
    border-radius: 100px;
}

`
