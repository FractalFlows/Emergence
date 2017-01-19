import { createLogic } from 'redux-logic'
import {
  FETCH_SEARCH,
  LOAD_SEARCH_RESULTS,
  FETCH_SELECTED_ARTICLE,
} from './constants'
import router from 'react-router-redux'
import {
  loadSearchResults,
  loadSelectedArticle,
} from './actions'
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
      done()
    })
  }
})

const fetchSelectedArticleLogic = createLogic({
  type: FETCH_SELECTED_ARTICLE,
  latest: true,
  debounce: 200,
  process({ action }, dispatch, done){
    const { DOI, source } = action.payload

    Meteor.call('articles/insertFromDOI', {
      DOI,
      source,
    }, (error, slug) => {
      if(error){
        console.warn(error)
        return
      }

      dispatch(loadSelectedArticle())
      dispatch(router.push({
        pathname: `/article/${slug}`,
      }))
      done()
    })
  },
})

export default [
  fetchSearchLogic,
  fetchSelectedArticleLogic,
]
