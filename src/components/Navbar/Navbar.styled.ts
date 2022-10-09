import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
  position: absolute;
  top: 0em;
  left: 0;
  width: 100%;
  background-color: #00008b;
  padding: 1rem 0.5rem;
  display: flex;
  justify-content: space-between;
`;

export const StyledLink = styled(Link)`
  background-color: #78d8e9;
  padding: 6px;
  color: #00008b;
  border: 2px solid #00008b;
  width: 100px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;

export const NavInput = styled.input`
  padding: 14px 32px 14px 15px;
  border-radius: 40px;
  border: 2px solid #5d0cff;
  outline: none;
  background: #fff;
  color: #161a2b;
`;

export const Icon = styled.div`
  padding: 10px;
  display: grid;
  place-items: center;
  color: white;
`;