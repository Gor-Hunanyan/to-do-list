import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBoardId: 1,
  boards: [
    {
      id: 1,
      lists: [
        { name: "Backlog", cards: [] },
        { name: "In progress", cards: [] },
        { name: "Done", cards: [] },
      ],
    },
  ],
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addList: (state, action) => {
      const { boardId, name } = action.payload;
      const index = state.boards.findIndex((el) => el.id === boardId);
      state.boards[index].lists.push({ name, cards: [] });
    },
    addCard: (state, action) => {
      const { boardId, listIndex, name, description } = action.payload;
      const index = state.boards.findIndex((el) => el.id === boardId);
      state.boards[index].lists[listIndex].cards.push({ name, description });
    },
    editCard: (state, action) => {
      const { boardId, listIndex, cardIndex, name, description } =
        action.payload;
      const index = state.boards.findIndex((el) => el.id === boardId);
      state.boards[index].lists[listIndex].cards[cardIndex] = {
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
