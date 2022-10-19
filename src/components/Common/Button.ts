import styled from "styled-components";

export const UnstyledButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

export const HoverButton = styled(UnstyledButton)`
  padding: 1rem 0.5rem;
  :hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;
