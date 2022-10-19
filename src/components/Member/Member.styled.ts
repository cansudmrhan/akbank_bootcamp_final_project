import styled from "styled-components";
export const InvisibleInput = styled.input`
  display: none;
`;

export const MemberList = styled.table`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  min-width: 550px;
  width: fix-content;
  max-width: 650px;
  height: fit-content;
`;
export const MemberBox = styled.table`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #000;
  font-weight: bold;
  text-align: center;
`;

export const Memberul = styled.tbody`
  display: flex;
  gap: 15px;
  margin-left: 20px;
  color: #000;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;
export const Memberli = styled.tr`
  list-style: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  color: #000;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

export const MemberTd = styled.td`
  display: flex;
  gap: 15px;
  margin-left: 80px;
  margin-right: 100px;
  margin-bottom: 15px;
  color: #000;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;
