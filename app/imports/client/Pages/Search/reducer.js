import {
  FETCH_SEARCH,
  LOAD_SEARCH_RESULTS,
  CLEAR_SEARCH,
} from './constants'

type Article = {
  slug: string,
  DOI: string,
  abstract: string,
  authors: Array<string>,
}

type State = {
  articlesFromSearch: Array<Article>,
  searchText: string,
  lastSelectedArticleDOI: string,
  isSearch: bool,
}

const initialState = {
  articlesFromSearch: [],
  searchText: '',
  isSearching: false,
  lastSelectedArticleDOI: '',
}

export default function search(state: State = initialState, { type, payload }: Action){
  switch(type){
    case FETCH_SEARCH: 
      return {
        ...state,
        isSearching: true,
        searchText: payload.searchText,
      }
    case CLEAR_SEARCH: 
      return {
        ...state,
        searchText: '',
        articlesFromSearch: [],
        isSearching: false,
      }
    case LOAD_SEARCH_RESULTS:
      return {
        ...state,
        isSearching: false,
        articlesFromSearch: payload.articles,
      }
    default: return state
  }
} 
