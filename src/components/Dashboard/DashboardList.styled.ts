import styled from "styled-components";

export const DashboardStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 50px;
  font-weight: bold;
  color: #515151;
  margin: 80px 200px;
  text-align: center;
`;

export const Card = styled.div`
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
  cursor: pointer;
`;

export const UnstyledButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;
