import axios from "axios";

const api = axios.create({
  baseURL: "https://trello-back-064098635aa0.herokuapp.com",
});

export const fetchBoards = async () => {
  const res = await api.get(`boards`);
  return res.data;
};

export const fetchBoardLists = async (id) => {
  const res = await api.get(`boards/${id}/board_lists`);
  return res.data;
};

export const fetchBoardUsers = async (id) => {
  const res = await api.get(`boards/${id}/users`);
  return res.data;
};

export const fetchAllUsers = async () => {
  const res = await api.get(`users`);
  return res.data;
};

export const fetchTasks = async (boardId, listId) => {
  const res = await api.get(
    `boards/${boardId}/board_lists/${listId}/list_tasks`
  );
  return res.data;
};

export const addTask = async (boardId, listId, body) => {
  const res = await api.post(
    `boards/${boardId}/board_lists/${listId}/list_tasks`,
    body
  );
  return res.data;
};

export const addBoardUser = async (boardId, userID) => {
  const res = await api.post(`boards/${boardId}/assign_user`, {
    board_user: {
      user_id: userID,
    },
  });
  return res.data;
};

export const removeBoardUser = async (boardId, userID) => {
  const res = await api.delete(`boards/${boardId}/unassign_user`, {
    data: {
      board_user: {
        user_id: userID,
      },
    },
  });
  return res.data;
};