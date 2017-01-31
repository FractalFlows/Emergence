import {
  loadRelatedsSearchResult,
  searchRelatedArticles,
  clearRelatedsSearch,
  addRelatedArticle,
} from '../actions'
import {
  LOAD_RELATED_ARTICLES_RESULT,
  SEARCH_RELATED_ARTICLES,
  CLEAR_RELATEDS_SEARCH,
  ADD_RELATED_ARTICLE,
} from '../constants'

it('loadRelatedsSearchResult should return the proper action object', () => {
  const action = loadRelatedsSearchResult({
    result: [ {DOI: '0000/000', name: 'Something'} ]
  })

  expect(action.type).toBe(LOAD_RELATED_ARTICLES_RESULT)
  expect(action).toMatchSnapshot()
})

it('searchRelatedArticles should return the proper action object', () => {
  const action = searchRelatedArticles({
    articleSlug: 'some-slug',
    searchText: 'some text',
  })

  expect(action.type).toEqual(SEARCH_RELATED_ARTICLES)
  expect(action.payload.searchText).toEqual('some text')
  expect(action).toMatchSnapshot()
})

it('clearRelatedsSearch should return the proper action object', () => {
  const action = clearRelatedsSearch()

  expect(action.type).toEqual(CLEAR_RELATEDS_SEARCH)
})

it('addRelatedArticle should return the proper action object', () => {
  const action = addRelatedArticle()

  expect(action.type).toEqual(ADD_RELATED_ARTICLE)
})
