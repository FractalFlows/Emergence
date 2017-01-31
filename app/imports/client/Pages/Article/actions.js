/*
 * Built by Astrocoders
 * @flow
 */

import {
  SEARCH_RELATED_ARTICLES,
  LOAD_RELATED_ARTICLES_RESULT,
  CLEAR_RELATEDS_SEARCH,
  ADD_RELATED_ARTICLE,
} from './constants'

export function searchRelatedArticles({ articleSlug, searchText }){
  return {
    type: SEARCH_RELATED_ARTICLES,
    payload: {
      articleSlug,
      searchText,
    },
  }
}

export function loadRelatedsSearchResult({ result }){
  return {
    type: LOAD_RELATED_ARTICLES_RESULT,
    payload: {
      result,
    },
  }
}

export function clearRelatedsSearch(){
  return {
    type: CLEAR_RELATEDS_SEARCH,
  }
}

export function addRelatedArticle({ DOI, source, sourceArticleSlug }){
  return {
    type: ADD_RELATED_ARTICLE,
    payload: {
      DOI,
      source,
      sourceArticleSlug,
    },
  }
}
