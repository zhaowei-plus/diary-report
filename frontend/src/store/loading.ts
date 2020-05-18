export default (state = false, action: { type: string; payload: boolean }) => {
  switch (action.type) {
    case 'SET_LOADING':
      return action.payload
    default:
      return state
  }
}
