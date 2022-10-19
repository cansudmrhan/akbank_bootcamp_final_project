import React from "react";
import type { FC } from "react";
import {
  useFetcher,
  useParams,
} from "react-router-dom";
import { User } from "types";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import {
  MemberList,
  MemberTd,
} from "./Member.styled";

const Member: FC<any> = (props) => {
  const { onClose, users, selectedBoard } = props;
  const { id: boardId } = useParams();
  const fetcher = useFetcher();

  const updateBoardMember = (username: string) => {
    const value = username;
    const formData = new FormData();
    formData.set("board-member", value);
    fetcher.submit(formData, {
      method: "post",
      action: `/board/${boardId}/board-member`,
    });
  };

  const deleteBoardMember = (userId: any) => {
    const user = selectedBoard.members.find((user: User) => user.id === userId);
    if (user) {
      const formData = {};
      fetcher.submit(formData, {
        method: "delete",
        action: `/board/${boardId}/board-member/${user.BoardMember.id}`,
      });
    }
  };
  const userIds = selectedBoard.members.map((user: User) => user.id);

  return (
    <Modal onClose={onClose}>
      <MemberList>
        <tbody>
          {users
            .filter((user: User) => user.id !== selectedBoard.ownerId)
            .map((user: User, index: number) => (
              <tr key={index}>
                <MemberTd>{user.username}</MemberTd>
                <td>
                  <fetcher.Form method="post">
                    {userIds.includes(user.id) ? (
                      <Button
                        type="submit"
                        onClick={() => deleteBoardMember(user.id)}
                      >
                        Delete from Board
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        onClick={() => updateBoardMember(user.username)}
                      >
                        Add to Board
                      </Button>
                    )}
                  </fetcher.Form>
                </td>
              </tr>
            ))}
        </tbody>
      </MemberList>
    </Modal>
  );
};

export default Member;
