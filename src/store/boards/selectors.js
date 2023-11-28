
export const getCurrentBoard = (state) => {
    return state.boards.currentBoard;
}

export const getCurrentBoardId = (state) => {
    return state.boards.currentBoardId;
}

export const getBoards = (state) => {
    return state.boards.boards
}