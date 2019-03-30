import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  header {
    height: 60px;
    background: coral;
    color: white;
    font-size: 35px;
    font-weight: 600;
    text-align: center;
    box-shadow: 0px 3px 5px #dcdcdc;
  }

  .content {
    margin: 0px 15px;
  }

  footer {
    background: #fff;
    color: #625471;
    border-top: 1px solid #e2dee6;
    text-align: center;
    padding: 15px 0;
  }

  .topBtn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: coral;
    padding: 10px;
    border-radius: 100px;
    color: #fff;
    display: -webkit-box;
    cursor: pointer;
  }
`;
