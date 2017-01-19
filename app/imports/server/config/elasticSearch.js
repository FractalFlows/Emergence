import elasticSearch from '../helpers/elasticSearch'
import { ELASTIC_SEARCH_INDEX as ARTICLES_INDEX } from '/imports/both/collections/articles'

elasticSearch.ping({
  requestTimeout: 3000,
}, error => {
  if(error){
    console.log('ElasticSearch cluster is down\n', error)
    return
  }

  console.log('ElasticSearch booted successfully')
  createArticlesIndex()
})

function createArticlesIndex(){
  elasticSearch.indices
    .exists({ index: ARTICLES_INDEX })
    .then(itExists => {
      console.log('Articles index already exists, skipping creation')
      if(itExists)
      return

      elasticSearch.indices.create({ index: 'articles' }, (error, response) => {
        if(error) {
          console.log(error)
          return
        }

        console.log('Articles ElasticSearch index was created\n', response)
      })
    })
}
