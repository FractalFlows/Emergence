import {
  FETCH_SEARCH,
  LOAD_SEARCH_RESULTS,
  CLEAR_SEARCH,
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
