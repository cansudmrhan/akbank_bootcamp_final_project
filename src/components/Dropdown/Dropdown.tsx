import React, { useEffect, useRef } from "react";

import { DropdownStyled } from "./Dropdown.styled";

function Dropdown(props: any) {
  const dropdownRef: any = useRef();

  const handleClick = (event: any) => {
    if (
      dropdownRef &&
      !dropdownRef.current?.contains(event.target) &&
      props.onClose
    )
      props.onClose();
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <DropdownStyled>
      <div
        ref={dropdownRef}
        className={`dropdown custom-scroll ${props.class ? props.class : ""}`}
      >
        {props.children}
      </div>
    </DropdownStyled>
  );
}

export default Dropdown;
