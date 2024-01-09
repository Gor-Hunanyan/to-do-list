import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBoard: null,
  currentBoardId: null,
  boards: [],
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload;
      state.currentBoardId = state.boards?.[0].id;
    },
    setCurrentBoard: (state, action) => {
      const { id, lists } = action.payload;
      let currentBoard = state.boards.find((item) => item.id === id);
      state.currentBoard = {
        ...currentBoard,
        lists,
      };
    },
    setCurrentBoardTasks: (state, action) => {
      const { tasks, id } = action.payload;
      let listIndex = state.currentBoard.lists.findIndex(
        (item) => item.id === id
      );
      state.currentBoard.lists[listIndex].tasks = tasks;
    },
    setCurrentBoardUsers: (state, action) => {
      const { users } = action.payload;
      state.currentBoard.users = users;
    },
    setCurrentBoardId: (state, action) => {
      const { id } = action.payload;
      state.currentBoardId = id;
    },
    addBoard: (state, action) => {
      const { name } = action.payload;
      state.boards.push({
        id: Math.random(),
        name,
        lists: [],
      });
    },
    editBoardName: (state, action) => {
      const { boardId, boardName } = action.payload;
      const index = state.boards.findIndex((el) => el.id === boardId);
      state.boards[index].name = boardName;
    },
    removeBoard: (state, action) => {
      const { id } = action.payload;
      state.boards = state.boards.filter((el) => el.id !== id);
      if (id === state.currentBoardId && state.boards.length) {
        state.currentBoardId = state.boards[0]?.id;
      }
    },

    addList: (state, action) => {
      const { boardId, name } = action.payload;
      const index = state.boards.findIndex((el) => el.id === boardId);
      state.boards[index].lists.push({ name, tasks: [] });
    },
    editCard: (state, action) => {
      const { boardId, listIndex, cardIndex, name, description } =
        action.payload;
      const index = state.boards.findIndex((el) => el.id === boardId);
      state.boards[index].lists[listIndex].tasks[cardIndex] = {
        name,
        description,
      };
    },
    editListName: (state, action) => {
      const { listName, listIndex, boardId } = action.payload;
      const boardIndex = state.boards.findIndex((el) => el.id === boardId);
      state.boards[boardIndex].lists[listIndex].name = listName;
    },
    removeList: (state, action) => {
      const { boardId, listName } = action.payload;
      const boardIndex = state.boards.findIndex((el) => el.id === boardId);
      state.boards[boardIndex].lists = state.boards[boardIndex].lists.filter(
        (list) => list.name !== listName
      );
    },
  },
});