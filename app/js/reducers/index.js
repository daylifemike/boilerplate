import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibility_filter'

const todo_app = combineReducers({
  todos,
  visibilityFilter
})

export default todo_app