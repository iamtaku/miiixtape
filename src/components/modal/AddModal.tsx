import React from "react";
import { AddbyExisting } from "./AddbyExisting";
import { AddByUrl } from "./AddByUrl";
import { Modal as ModalWrapper } from "./index";

interface IAddModalProps {
  id: string;
  handleClick: () => void;
}
export const AddModal: React.FC<IAddModalProps> = ({ id, handleClick }) => {
  return (
    <ModalWrapper title={"Add tracks"} handleClick={handleClick}>
      <AddByUrl id={id} />
      <AddbyExisting />
    </ModalWrapper>
  );
};
