import { useState, useEffect } from "react";
import styles from "./BoardsNav.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getBoards, getCurrentBoard, getCurrentBoardId } from "../../store/boards/selectors";
import { boardsSlice } from "../../store/boards";
import Modal from "../Modal/Modal";
import { fetchBoards, fetchBoardLists, fetchBoardUsers } from "../../api";

const BoardsNav = () => {
  const dispatch = useDispatch();
  const boards = useSelector(getBoards);
  const currentBoard = useSelector(getCurrentBoard);
  const currentBoardId = useSelector(getCurrentBoardId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [boardName, setBoardName] = useState("");
  const [mode, setMode] = useState(null);

  useEffect(() => {
    initBoards();
  }, []);

  useEffect(() => {
    if (boards.length && currentBoardId && (!currentBoard || currentBoard.id !== currentBoardId)) {
      initBoard();
    }
  }, [currentBoardId, boards]);


  const initBoards = async () => {
    const boards = await fetchBoards();
    dispatch(boardsSlice.actions.setBoards(boards));
  };

  const initBoard = async () => {
    const lists = await fetchBoardLists(currentBoardId)
    dispatch(boardsSlice.actions.setCurrentBoard({lists, id: currentBoardId}));
    const users = await fetchBoardUsers(currentBoardId)
    dispatch(boardsSlice.actions.setCurrentBoardUsers({users}));
  };

  const onClick = async (id) => {
    dispatch(boardsSlice.actions.setCurrentBoardId({id}));
  };

  const openModal = (mode, editId) => {
    setMode(mode);
    setIsModalOpen(true);

    if (mode === "edit") {
      setEditId(editId);
      const board = boards.find((el) => el.id === editId);
      setBoardName(board.name);
    }
  };

  const closeModal = () => {
    setBoardName("");
    setIsModalOpen(false);
  };

  const addBoard = () => {
    if (boardName) {
      dispatch(
        boardsSlice.actions.addBoard({
          name: boardName,
        })
      );
      closeModal();
    }
  };

  const editBoardName = () => {
    dispatch(
      boardsSlice.actions.editBoardName({
        boardId: editId,
        boardName,
      })
    );
    closeModal();
  };

  const onRemove = (id) => {
    dispatch(
      boardsSlice.actions.removeBoard({
        id,
      })
    );
  };

  let modalTitle = "";
  if (mode === "edit") {
    modalTitle = "Edit Board Name";
  }
  if (mode === "add") {
    modalTitle = "Add New Board";
  }

  if (!boards.length) {
    return <span>Empty</span>;
  }

  return (
    <div className={styles.sidebar}>
      <nav>
        <ul>
          {boards.map((board) => {
            return (
              <li key={board.id}>
                <span
                  style={{
                    color: board.id === currentBoard?.id ? "blue" : "black",
                  }}
                  onClick={() => onClick(board.id)}
                >
                  {board.name}
                </span>
                <button onClick={() => openModal("edit", board.id)}>
                  edit
                </button>
                <button onClick={() => onRemove(board.id)}>remove</button>
              </li>
            );
          })}
        </ul>
        <button onClick={() => openModal("add")}>Add New Board</button>
      </nav>
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        <>
          <input
            type="text"
            placeholder="Board Name"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
          <button onClick={mode === "edit" ? editBoardName : addBoard}>
            Confirm
          </button>
        </>
      </Modal>
    </div>
  );
};

export default BoardsNav;