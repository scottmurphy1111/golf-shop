import styled from 'styled-components'

export const AppHeader = styled.section`
  display: flex;
  flex-wrap: nowrap;
  /* height: 80px; */
  background: #fff;
  /* position: fixed; */
  padding: 2.4rem 0;
  box-sizing: border-box;
  box-shadow: 0 2px 10px rgba(50, 50, 50, 0.25);
  width: 100%;

  /* top: 0; */
  z-index: 3;
  /* left: 0; */
  /* justify-content: center; */
  align-items: center;

  /*  header {
      width: 100%;
      height: 80px;
      display: flex;
      color: $gs_black;
      align-items: center;

      .cart-item {
        margin-bottom: 0;
      }
    }

    .logo {
      width: 240px;
      height: 40px;
      flex: 1 1 240px;
      display: inline-block;
      background: url('../../assets/golf-shop-logo.svg') no-repeat;
      background-size: contain;
      cursor: pointer;

      a {
        display: block;
        height: 100%;
      }
    }

    .cart-container {
      display: flex;
      flex: 1 1 calc(100% - 240px);
      justify-content: flex-end;
      align-items: center;

      form {
        margin-right: 16px;
      }

      .cart-item {
        width: 44px;
        height: 40px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        &.has-items {
          background: $gs_blue;
          border-radius: 2px;
          padding: 4px;
          box-sizing: border-box;
          width: 100px;
          height: 40px;

          .cart-icon {
            background: url(../../assets/cart-white.svg) no-repeat;
            width: 36px;
            height: 32px;
          }

          .cart-count {
            font-size: 20px;
            color: #fff;
          }
        }

        .cart-icon {
          background: url(../../assets/cart-black.svg) no-repeat;
          width: 44px;
          height: 40px;
        }
      }
    }

    nav {
      flex: 1 1 1000px;
    }
    ul {
      display: flex;
      margin: 0;
      padding: 0;
      list-style: none;
      justify-content: space-between;
      align-items: center;

      li {
        cursor: pointer;
        font-size: 2rem;

        &:hover {
          // todo fix margin, not on last li
          border-bottom: 4px solid $gs_gold;
        }
      }
    }
  } */
`
