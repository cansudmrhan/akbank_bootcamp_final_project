import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
  position: fixed;
  top: 0em;
  left: 0;
  width: 100%;
  background-color: #00008b;
  padding: 1rem 0.5rem;
  display: flex;
  justify-content: space-between;
`;

export const StyledLink = styled(Link)`
  padding: 6px;
  color: #fff;
  border: 2px solid #00008b;
  width: 100px;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 20px;
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

export const Title = styled.p`
  font-size: 20px;
  color: #fff;
`;
