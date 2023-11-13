
export const getCurrentBoard = (state) => {
    const currentBoardId = state.boards.currentBoardId
    return state.boards.boards.find(el => el.id === currentBoardId)
}

export const getBoards = (state) => {
    return state.boards.boards
}
