import React, { useEffect, useState } from "react";
import type { FC } from "react";
import {
  Form,
  useFetcher,
  useParams,
  useLocation,
  useSubmit,
} from "react-router-dom";
import { User } from "contexts/BoardContext/types";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import {
  MemberList,
  MemberBox,
  Memberli,
  Memberul,
  MemberTd,
} from "./Member.styled";
import { useAppContext } from "contexts/AppContext/AppContext";

const Member: FC<any> = (props) => {
  const { onClose, users, selectedBoard } = props;
  const { id: boardId } = useParams();
  const { labels } = useAppContext();

  const location = useLocation();
  const fetcher = useFetcher();

  const itemFetcher = useFetcher();
  let submit = useSubmit();

  const updateBoardMember = (username: any) => {
    const value = username;
    console.log({ value });
    const formData = new FormData();
    formData.set("board-member", value);
    formData.set("title", selectedBoard.title);
    fetcher.submit(formData, {
      method: "patch",
      action: `/board/${boardId}/`,
    });
  };
  return (
    <Modal onClose={onClose}>
      <MemberList>
        <tbody>
          {users.map((user: User, index: number) => (
            <tr key={index}>
              {/*                 <td>
                  <input
                    type="checkbox"
                    value={
                      user.id
                    } 
                  />
                </td> */}
              <MemberTd>{user.username}</MemberTd>
              <td>
                <fetcher.Form method="patch" name="board-member">
                  <Button
                    type="submit"
                    onClick={updateBoardMember(user.username)}
                  >
                    Add to Board
                  </Button>
                </fetcher.Form>
              </td>
            </tr>
          ))}
        </tbody>
        {/*  <Button>Add Member</Button> */}
      </MemberList>
    </Modal>
  );
};

export default Member;
