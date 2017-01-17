import {
  groupBy,
  flow,
  mapValues,
  flatten,
  values,
  omitBy,
  isUndefined,
  isNull,
} from 'lodash/fp'
import unanimity from 'api-unanimity'
import striptags from 'striptags'
import getCrossRefWorkSearcherForParam from'./get_crossref_searcher'
import getDataCiteSearcher from './get_datacite_searcher'

const isNothing = v => isUndefined(v) || isNull(v)
const ArticleSearcher = unanimity([
  getCrossRefWorkSearcherForParam({ param: 'query.title' }),
  getCrossRefWorkSearcherForParam({ param: 'query.author' }),
  getDataCiteSearcher(),
], {
  dataMerger(results){
    return flow(
      flatten,
      groupBy('DOI'),
      mapValues(sameDOIArticles => {
        const cleanedUpArticles = sameDOIArticles.map(omitBy(isNothing))
        const unifiedArticle = Object.assign(...cleanedUpArticles)
        return {
          ...unifiedArticle,
          abstract: striptags(unifiedArticle.abstract),
        }
      }),
      values
    )(results)
  },
})

export default ArticleSearcher
