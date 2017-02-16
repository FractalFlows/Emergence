/*
 * Built by Astrocoders
 * @flow
 */

import { createLogic } from 'redux-logic'
import { Meteor } from 'meteor/meteor'
import {
  SEARCH_RELATED_ARTICLES,
  ADD_RELATED_ARTICLE,
} from './constants'
import {
  loadRelatedsSearchResult,
} from './actions'
import requireLoginBefore from '/imports/client/Utils/requireLoginBefore'

export const searchRelatedArticlesLogic = createLogic({
  type: SEARCH_RELATED_ARTICLES,
  debounce: 1000,
  latest: true,
  process({ getState, action }, dispatch, done) {
    Meteor.call('articles/searchForRelateds', {
      articleSlug: action.payload.articleSlug,
      searchText: action.payload.searchText,
    }, (error, result) => {
      if(error){
        console.error(error)
        return
      }

      dispatch(loadRelatedsSearchResult({ result }))
      done()
    })
  },
})

export const addRelatedArticleLogic = createLogic({
  type: ADD_RELATED_ARTICLE,
  latest: true,
  debounce: 200,
  process({ getState, action }, dispatch, done) {
    requireLoginBefore(() => {
      const { payload: { DOI, source } } = action
      Meteor.call('articles/insertFromDOI', {
        DOI,
        source,
      }, (error, slug) => {
        Meteor.call('articles/addRelated', {
          articleSlug: action.payload.sourceArticleSlug,
          relatedArticleDOI: DOI,
        }, () => done())
      })
    })
  },
})

export default [
  searchRelatedArticlesLogic,
  addRelatedArticleLogic,
]
