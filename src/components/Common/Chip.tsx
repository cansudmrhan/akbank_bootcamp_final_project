import React from "react";
import { X } from "react-feather";
import { Form } from "react-router-dom";
import { UnstyledButton } from "components/Common/Button";

export default function Chip(props: any) {
  const { item, action } = props;

  return (
    <label style={{ backgroundColor: item.color, color: "#fff" }}>
      <div>
        {item.title}
        {
          <Form method="delete" action={action}>
            <UnstyledButton type="submit">
              <X />
            </UnstyledButton>
          </Form>
        }
      </div>
    </label>
  );
}
