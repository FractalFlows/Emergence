/* @flow */
import { combineReducers } from 'redux'

import { reducer as form } from 'redux-form'

// Pages Reducers
import user from './Pages/User/reducer'
import article from './Pages/Article/reducer'

export default combineReducers({
  user,
  article,
  form,
})
