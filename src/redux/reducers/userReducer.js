const initialState = {
  single: null,
}

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'USER_SINGLE':
      return { ...state, single: payload }
    default:
      return state
  }
}
export default userReducer