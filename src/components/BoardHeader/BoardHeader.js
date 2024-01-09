import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentBoard } from "../../store/boards/selectors";
import { getAllUsers } from "../../store/user/selectors";
import { userSlice } from "../../store/user";
import { boardsSlice } from "../../store/boards";
import {
  fetchAllUsers,
  addBoardUser,
  removeBoardUser,
  fetchBoardUsers,
} from "../../api";
import Modal from "../Modal/Modal";
import styles from "./BoardHeader.module.css";

const BoardHeader = () => {
  const dispatch = useDispatch();
  const currentBoard = useSelector(getCurrentBoard);
  const allUsers = useSelector(getAllUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    initAllUsers();
  }, []);

  console.log("allUsers", allUsers);
  console.log("currentBoard", currentBoard);

  const initAllUsers = async () => {
    const users = await fetchAllUsers();
    dispatch(userSlice.actions.setUsers(users));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onAddUsers = () => {
    setIsModalOpen(true);
  };

  const onAdd = async (id) => {
    await addBoardUser(currentBoard.id, id);
    const users = await fetchBoardUsers(currentBoard.id);
    dispatch(boardsSlice.actions.setCurrentBoardUsers({ users }));
  };

  const onRemove = async (id) => {
    await removeBoardUser(currentBoard.id, id);
    const users = await fetchBoardUsers(currentBoard.id);
    dispatch(boardsSlice.actions.setCurrentBoardUsers({ users }));
  };

  if (!currentBoard) {
    return null;
  }

  return (
    <div>
      {currentBoard?.users?.map((user) => {
        return <span className={styles.userName}>{user.full_name}</span>;
      })}

      <button onClick={onAddUsers}>Add Users</button>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Add Users">
        <div>
          {allUsers?.map((user) => {
            const exist = currentBoard.users?.find((el) => el.id === user.id);
            return (
              <div key={user.id}>
                {user.full_name}{" "}
                <button disabled={exist} onClick={() => onAdd(user.id)}>
                  Add
                </button>{" "}
                <button disabled={!exist} onClick={() => onRemove(user.id)}>
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default BoardHeader;
