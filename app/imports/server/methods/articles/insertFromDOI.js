import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import Future from 'fibers/future'
import CrossRef from 'crossref'

import Articles from '/imports/both/collections/articles'
import elasticSearch from '/imports/server/helpers/elasticSearch'
import normalizeArticle from './search/api/normalizeArticle'

Meteor.methods({
  'articles/insertFromDOI'(params){
    new SimpleSchema({
      DOI: {
        type: String,
      },
      source: {
        type: String,
        allowedValues: ['DataCite', 'CrossRef'],
      },
    }).validate(params)

    const wasAlreadyAddedDoc = Articles.findOne({
      DOI: params.DOI,
    }, {
      fields: {
        slug: 1,
      },
    })

    if(wasAlreadyAddedDoc){
      return wasAlreadyAddedDoc.slug
    }

    // If the article wasn't added before
    // We're going to refetch its data from the source
    // and index it to ElasticSearch and put it in our
    // database.

    const article = fetchArticleFromRightSource(params)

    if(article === null) throw new Meteor.Error(404, `Article not found in ${source}`)

    elasticSearch.index({
      index: 'articles',
      type: 'publication',
      body: {
        authors: article.authors,
        title: article.title,
        abstract: article.abstract,
        DOI: article.DOI,
      },
    })

    const articleId = Articles.insert({
      authors: article.authors,
      title: article.title,
      abstract: article.abstract,
      DOI: article.DOI,
    })

    return Articles.findOne(articleId, {
      fields: {
        slug: 1,
      },
    }).slug
  },
})

function fetchArticleFromRightSource({ DOI, source }){
  const future = new Future()
  switch(source){
    case 'CrossRef': 
      CrossRef.work(DOI, (error, article) => {
        if(error) future.throw(error)
        else future.return(normalizeArticle({ article, source: 'CrossRef' }))
      })
      break;
    case 'DataCite':
      future.return(null)
      break;
    default:
      future.return(null)
  }

  return future.wait()
}
