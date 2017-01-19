import { createLogic } from 'redux-logic'
import {
  FETCH_SEARCH,
  LOAD_SEARCH_RESULTS,
} from './constants'
import { loadSearchResults } from './actions'
import { Meteor } from 'meteor/meteor'

const fetchSearchLogic = createLogic({
  type: FETCH_SEARCH,
  latest: true,
  debounce: 1000,
  process({ action }, dispatch, done){
    const { searchText } = action.payload

    Meteor.call('article/search', { searchText }, (error, results) => {
      if(error){
        console.warn('Error in article/search', error)
        return
      }

      dispatch(loadSearchResults({
        results,
      }))
    })
  }
})

export default [
  fetchSearchLogic,
]
