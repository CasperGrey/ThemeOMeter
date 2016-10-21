
export default function login(state, action) {
  if (typeof state == 'undefined') {
    state = {
      user: null
    }
  }
  switch (action.type) {
    case 'LOGIN':
      return Object.assign({}, state, {
        user: action.user
      })
  }
  return state
}
