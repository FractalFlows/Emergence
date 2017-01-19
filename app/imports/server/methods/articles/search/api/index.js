// TODO: Transer searcher/api to npm package

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
        return Object.assign(...cleanedUpArticles)
      }),
      values
    )(results)
  },
})

export default ArticleSearcher
