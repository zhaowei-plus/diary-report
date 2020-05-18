import { combineReducers, createStore } from 'redux'

import loading from './loading'

const reducers = combineReducers({
  loading,
})

export default createStore(reducers)
