import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentBoard } from "../../store/boards/selectors";
import { boardsSlice } from "../../store/boards";
import List from "../List/List";
import Modal from "../Modal/Modal";
import styles from "./Board.module.css";

function Board() {
  const dispatch = useDispatch();
  const currentBoard = useSelector(getCurrentBoard);
  const [newListName, setNewListName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addList = () => {
    if (newListName) {
      dispatch(
        boardsSlice.actions.addList({
          boardId: currentBoard.id,
          name: newListName,
        })
      );
      setNewListName("");
      setIsModalOpen(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewListName("");
  };

  return (
    <div className={styles.board}>
      <div className={styles.container}>
        {currentBoard ? (
          <>
            {currentBoard.lists.map((item, index) => (
              <List key={index} data={item} index={index} />
            ))}
            <button onClick={() => setIsModalOpen(true)}>+ Add New List</button>
          </>
        ) : (
          "Loading..."
        )}
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