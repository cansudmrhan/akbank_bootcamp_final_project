import styled from "styled-components";

export const Styled = styled.li`
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  h1 {
    font-size: 50px;
    font-weight: bold;
    color: #515151;
    margin: 80px 200px;
    text-align: center;
  }
  .card {
    background-color: #e7e8de;
    border-radius: 20px;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.4);
    padding: 100px 30px;
    box-sizing: border-box;
    margin-left: 20px;
    margin-right: 20px;
    width: 200px;
    height: 300px;
    text-align: center;
    font-size: 20px;
    justify-content: center;
  }
  .icon {
    .material-icons.md-18 {
      font-size: 18px;
    } //bu oluyo mu dene
  }
`;
