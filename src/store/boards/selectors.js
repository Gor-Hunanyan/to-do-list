
export const getCurrentBoard = (state) => {
    const currentBoardId = state.currentBoardId
    return state.boards.boards.find(el => el.id === currentBoardId)
}

export const getCurrentBoardList = (state) => {
    const currentBoard = getCurrentBoard(state)
    return currentBoard.lists
}