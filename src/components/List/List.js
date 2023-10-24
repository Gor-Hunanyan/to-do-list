import React, { useState } from "react";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import styles from "./List.module.css";

function List({ name, onEditName }) {
  const [cards, setCards] = useState([]);
  const [mode, setMode] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [newCardName, setNewCardName] = useState("");
  const [newCardDesc, setNewCardDesc] = useState("");
  const [listName, setListName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addCard = () => {
    if (newCardName) {
      setCards((prevCards) => [
        ...prevCards,
        { name: newCardName, description: newCardDesc },
      ]);
      setNewCardName("");
      setNewCardDesc("");
      setIsModalOpen(false);
    }
  };

  const editCard = () => {
    let updatedCards = [...cards];
    updatedCards[editIndex].name = newCardName;
    updatedCards[editIndex].description = newCardDesc;
    setCards(updatedCards);
    setIsModalOpen(false);
  };

  const editListName = () => {
    onEditName(listName);
    setIsModalOpen(false);
  };

  const openModal = (mode, index) => {
    setMode(mode);
    setIsModalOpen(true);

    if (mode === "edit") {
      setEditIndex(index);
      setNewCardName(cards[index].name);
      setNewCardDesc(cards[index].description);
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
        {name}
      </h3>
      {cards.map((card, index) => (
        <Card
          key={index}
          data={card}
          onClick={() => openModal("edit", index)}
        />
      ))}
      <button onClick={() => openModal("add")}>+ Add Card</button>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {mode === "edit-list-name" ? (
          <>
            <input
              type="text"
              placeholder="List Name"
              defaultValue={name}
              onChange={(e) => setListName(e.target.value)}
            />
            <button onClick={editListName}>Confirm</button>
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
