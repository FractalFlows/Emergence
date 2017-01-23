import {
  FETCH_SEARCH,
  LOAD_SEARCH_RESULTS,
  CLEAR_SEARCH,
  FETCH_SELECTED_ARTICLE,
  LOAD_SELECTED_ARTICLE,
} from './constants'

export function fetchSearch({ searchText }){
  return {
    type: FETCH_SEARCH,
    payload: {
      searchText,
    },
  }
}

export function clearSearch(){
  return {
    type: CLEAR_SEARCH,
  }
}

export function loadSearchResults({ results }){
  return {
    type: LOAD_SEARCH_RESULTS,
    payload: {
      articles: results,
    },
  }
}

export function fetchSelectedArticle({ DOI, source }){
  return {
    type: FETCH_SELECTED_ARTICLE,
    payload: {
      DOI,
      source,
    },
  }
}

export function loadSelectedArticle(){
  return {
    type: LOAD_SELECTED_ARTICLE,
  }
}
