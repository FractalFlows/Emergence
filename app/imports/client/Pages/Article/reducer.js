/*
 * Built by Astrocoders
 * @flow
 */

import {
  LOAD_RELATED_ARTICLES_RESULT,
  SEARCH_RELATED_ARTICLES,
  CLEAR_RELATEDS_SEARCH,
} from './constants'

const initialState = {
  relatedArticles: [],
  isSearchingForRelatedArticles: false,
}

export default function article(state = initialState, { type, payload }) {
  switch (type) {
    case SEARCH_RELATED_ARTICLES:
      return {
        ...state,
        isSearchingForRelatedArticles: true,
      }
    case LOAD_RELATED_ARTICLES_RESULT:
      return {
        ...state,
        isSearchingForRelatedArticles: false,
        relatedArticles: payload.result,
      }
    case CLEAR_RELATEDS_SEARCH:
      return {
        ...state,
        isSearchingForRelatedArticles: false,
        relatedArticles: [],
      }

    default:
      return { ...state }
  }
}
