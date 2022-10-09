import React from "react";

import { Styled } from "./Modal.styled";

function Modal(props: any) {
  return (
    <Styled>
    <div
      className="modal"
      onClick={() => (props.onClose ? props.onClose() : "")}
    >
      <div
        className="modal-content custom-scroll"
        onClick={(event) => event.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
    </Styled>
  );
}

export default Modal;
