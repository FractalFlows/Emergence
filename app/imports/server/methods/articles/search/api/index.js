// TODO: Transer searcher/api to npm package

import unanimity from 'api-unanimity'
import getCrossRefWorkSearcherForParam from'./get_crossref_searcher'
import getDataCiteSearcher from './get_datacite_searcher'
import dataMerger from './merger'

const ArticleSearcher = unanimity([
  getCrossRefWorkSearcherForParam({ param: 'query.title' }),
  getCrossRefWorkSearcherForParam({ param: 'query.author' }),
  getDataCiteSearcher(),
], {
  dataMerger,
})

export default ArticleSearcher
