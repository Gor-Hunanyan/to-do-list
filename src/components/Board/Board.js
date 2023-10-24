import React, { useState } from "react";
import List from "../List/List";
import Modal from "../Modal/Modal";
import styles from "./Board.module.css";

function Board() {
  const [lists, setLists] = useState(["Backlog", "In progress", "Done"]);
  const [newListName, setNewListName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addList = () => {
    if (newListName) {
      setLists((prevLists) => [...prevLists, newListName]);
      setNewListName("");
      setIsModalOpen(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewListName("");
  };

  const onEditName = (name, editIndex) => {
    const updatedLists = lists.map((el, index) => {
      if (index === editIndex) {
        return name;
      }
      return el;
    });
    setLists(updatedLists);
  };

  return (
    <div>
      <div className={styles.container}>
        {lists.map((listName, index) => (
          <List
            key={index}
            name={listName}
            onEditName={(name) => onEditName(name, index)}
          />
        ))}
        <button onClick={() => setIsModalOpen(true)}>+ Add New List</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Add New List">
        <input
          type="text"
          placeholder="New List Name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button onClick={addList}>Confirm</button>
      </Modal>
    </div>
  );
}

export default Board;
