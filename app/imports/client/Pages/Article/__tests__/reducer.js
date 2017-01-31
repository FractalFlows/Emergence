import reducer from '../reducer'
import {
  searchRelatedArticles,
  loadRelatedsSearchResult,
  clearRelatedsSearch,
} from '../actions'

test('should handle default', () => {
  const state = reducer({}, {})

  expect(state).toEqual({})
})

test('should handle SEARCH_RELATED_ARTICLES action', () => {
  const action = searchRelatedArticles({
    articleSlug: 'article-some',
  })
  const state = reducer({}, action)

  expect(state.isSearchingForRelatedArticles).toBeTruthy()
  expect(state).toMatchSnapshot()
})

test('should handle LOAD_RELATED_ARTICLES_RESULT action', () => {
  const action = loadRelatedsSearchResult({ result: [] })
  const state = reducer({}, action)

  expect(state.isSearchingForRelatedArticles).toBeFalsy()
  expect(state.relatedArticles).toEqual([])
  expect(state).toMatchSnapshot()
})

test('should handle CLEAR_RELATEDS_SEARCH action', () => {
  const action = clearRelatedsSearch()
  const state = reducer({ relateds: [{slug: 'something'}] }, action)

  expect(state.relatedArticles).toEqual([])
  expect(state).toMatchSnapshot()
})
