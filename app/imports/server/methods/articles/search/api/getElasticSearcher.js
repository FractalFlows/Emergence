import Articles, {
  ELASTIC_SEARCH_INDEX as ARTICLES_INDEX,
  ELASTIC_SEARCH_TYPE as ARTICLES_INDEX_TYPE,
} from '/imports/both/collections/articles'
import normalizeArticle from './normalizeArticle'
import elasticSearch from '/imports/server/helpers/elasticSearch'

export default function elasticArticlesSearcher(params){
  return elasticSearch
    .search({
      index: ARTICLES_INDEX,
      type: ARTICLES_INDEX_TYPE,
      size: 30,
      body: {
        query: {
          match: { abstract: params.searchText },
        },
      },
    })
    .then(response => {
      future.return(normalizeArticle(response.hits.hits))
    })
}
