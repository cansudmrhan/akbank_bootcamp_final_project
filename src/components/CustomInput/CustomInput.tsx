import React, { useState, useEffect, FC, PropsWithChildren } from "react";

import { X } from "react-feather";
import { useFetcher } from "react-router-dom";
import { Styled } from "./CustomInput.styled";
interface CustomInputProps {
  text: string;
  displayClass?: string;
  editClass?: string;
  placeholder?: string;
  buttonText?: string;
  method: "get" | "post" | "put" | "patch" | "delete";
  action: string;
  inputName: string;
}
const CustomInput: FC<PropsWithChildren<CustomInputProps>> = (props) => {
  const {
    text,
    displayClass,
    editClass,
    placeholder,
    buttonText,
    method,
    action,
    inputName = "custom-input",
    children = undefined,
  } = props;
  const [isCustomInput, setIsCustomInput] = useState(false);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "submitting") {
      setIsCustomInput(false);
    }
  }, [fetcher.state]);

  return (
    <Styled>
      <div className="custom-input">
        {isCustomInput ? (
          <fetcher.Form
            className={`custom-input-edit ${editClass ? editClass : ""}`}
            action={action}
            method={method}
          >
            {children}
            <input
              type="text"
              placeholder={placeholder || text}
              name={inputName}
              autoFocus
            />
            <div className="custom-input-edit-footer">
              <button type="submit">{buttonText || "Add"}</button>
              <X
                onClick={() => setIsCustomInput(false)}
                className="closeIcon"
              />
            </div>
          </fetcher.Form>
        ) : (
          <p
            className={`custom-input-display ${
              displayClass ? displayClass : ""
            }`}
            onClick={() => setIsCustomInput(true)}
          >
            {text}
          </p>
        )}
      </div>
    </Styled>
  );
};

export default CustomInput;
