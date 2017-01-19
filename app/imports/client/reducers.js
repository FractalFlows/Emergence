/* @flow */
import { combineReducers } from 'redux'

import { reducer as form } from 'redux-form'
import { routerReducer as routing} from 'react-router-redux'

// Pages Reducers
import user from './Pages/User/reducer'
import article from './Pages/Article/reducer'
import search from './Pages/Search/reducer'

export default combineReducers({
  user,
  article,
  form,
  search,
  routing,
})
