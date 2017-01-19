import {
  FETCH_SEARCH,
  LOAD_SEARCH_RESULTS,
  CLEAR_SEARCH,
  FETCH_SELECTED_ARTICLE,
  LOAD_SELECTED_ARTICLE,
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
  isSearch: bool,
}

const initialState = {
  articlesFromSearch: [],
  searchText: '',
  isSearching: false,
}

export default function search(state: State = initialState, { type, payload }: Action){
  switch(type){
    case FETCH_SEARCH: 
      return {
        ...state,
        isSearching: true,
        searchText: payload.searchText,
      }
    case LOAD_SEARCH_RESULTS:
      return {
        ...state,
        isSearching: false,
        articlesFromSearch: payload.articles,
      }
    case CLEAR_SEARCH: 
      return {
        ...state,
        searchText: '',
        articlesFromSearch: [],
        isSearching: false,
      }
    case FETCH_SELECTED_ARTICLE: 
      return {
        ...state,
        isFetchingSelectedArticle: true,
      }
    case FETCH_SELECTED_ARTICLE: 
      return {
        ...state,
        isFetchingSelectedArticle: true,
      }
    case LOAD_SELECTED_ARTICLE: 
      return {
        ...state,
        isFetchingSelectedArticle: false,
      }
    default: return { ...state }
  }
} 
