import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentBoard } from "../../store/boards/selectors";
import { boardsSlice } from "../../store/boards";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import styles from "./List.module.css";

function List(props) {
  const { data, index } = props;
  const dispatch = useDispatch();
  const currentBoard = useSelector(getCurrentBoard);
  const [mode, setMode] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [newCardName, setNewCardName] = useState("");
  const [newCardDesc, setNewCardDesc] = useState("");
  const [listName, setListName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onEditName = () => {
    dispatch(
      boardsSlice.actions.editListName({
        listName,
        listIndex: index,
        boardId: currentBoard.id,
      })
    );
    closeModal();
  };

  const onRemove = () => {
    dispatch(
      boardsSlice.actions.removeList({
        boardId: currentBoard.id,
        listName: data.name,
      })
    );
  };

  const addCard = () => {
    if (newCardName) {
      dispatch(
        boardsSlice.actions.addCard({
          boardId: currentBoard.id,
          listIndex: index,
          name: newCardName,
          description: newCardDesc,
        })
      );
      closeModal();
    }
  };

  const editCard = () => {
    dispatch(
      boardsSlice.actions.editCard({
        boardId: currentBoard.id,
        listIndex: index,
        cardIndex: editIndex,
        name: newCardName,
        description: newCardDesc,
      })
    );
    closeModal();
  };

  const openModal = (mode, index) => {
    setMode(mode);
    setIsModalOpen(true);

    if (mode === "edit") {
      setEditIndex(index);
      setNewCardName(data.cards[index].name);
      setNewCardDesc(data.cards[index].description);
    }
  };

  const closeModal = () => {
    setNewCardName("");
    setNewCardDesc("");
    setListName("");
    setIsModalOpen(false);
  };

  let modalTitle = "";
  if (mode === "edit") {
    modalTitle = "Edit Card";
  }
  if (mode === "add") {
    modalTitle = "Add New Card";
  }

  if (mode === "edit-list-name") {
    modalTitle = "Edit List Name";
  }

  return (
    <div className={styles.container}>
      <h3
        className={styles.listTitle}
        onClick={() => {
          openModal("edit-list-name");
        }}
      >
        {data.name}
      </h3>
      {data.cards.map((card, index) => (
        <Card
          key={index}
          data={card}
          onClick={() => openModal("edit", index)}
        />
      ))}
      <button onClick={() => openModal("add")}>+ Add Card</button>
      <button className={styles.removeButton} onClick={onRemove}>
        Remove
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {mode === "edit-list-name" ? (
          <>
            <input
              type="text"
              placeholder="List Name"
              defaultValue={data.name}
              onChange={(e) => setListName(e.target.value)}
            />
            <button onClick={onEditName}>Confirm</button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Card Name"
              value={newCardName}
              onChange={(e) => setNewCardName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Card Description"
              value={newCardDesc}
              onChange={(e) => setNewCardDesc(e.target.value)}
            />
            <button onClick={mode === "edit" ? editCard : addCard}>
              Confirm
            </button>
          </>
        )}
      </Modal>
    </div>
  );
}

export default List;
