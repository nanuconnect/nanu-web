const initialState = {
  single: null,
  username: null,
}

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'USER_SINGLE':
      return { ...state, single: payload }
    case 'USER_SET':
      return { ...state, username: payload }
    default:
      return state
  }
}
export default userReducer