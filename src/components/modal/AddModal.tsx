import React, { useState } from "react";
import { Collection, Tracks } from "../../types/types";
import { AddbyExisting } from "./AddbyExisting";
import { AddByUrl } from "./AddByUrl";
import { Confirm } from "./Confirm";
import { Modal as ModalWrapper } from "./index";

interface IAddModalProps {
  id: string;
  handleClick: () => void;
}

export const AddModal: React.FC<IAddModalProps> = ({ id, handleClick }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [data, setData] = useState<Collection>();

  const handleFetch = async (collection: Collection) => {
    debugger;
    setData(collection);
    setIsConfirmOpen(true);
  };

  return (
    <ModalWrapper title={"Add tracks"} handleClick={handleClick}>
      {isConfirmOpen ? (
        <Confirm data={data} />
      ) : (
        <>
          <AddByUrl id={id} handleFetch={handleFetch} />
          <AddbyExisting />
        </>
      )}
    </ModalWrapper>
  );
};
