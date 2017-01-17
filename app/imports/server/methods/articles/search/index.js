import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import ArticleSearcher from './api'
import Future from 'fibers/future'
import Articles from '/imports/both/collections/articles'

Meteor.methods({
  'article/search'(params){
    const future = new Future()

    new SimpleSchema({
      searchText: {
        type: String,
      },
    }).validate(params)

    ArticleSearcher
      .search(params.searchText)
      .then(results => {
        future.return(results)
      })
      .catch(error => {
        future.throw(new Meteor.Error(500, error))
      })

    return future.wait()
  },

  'article/searchForRelateds'(params){
    new SimpleSchema({
      searchText: {
        type: String,
      },
      articleSlug: { type: String }
    }).validate(params)

    const article = Articles.findOne({
      slug: params.articleSlug,
    })
    const relatedArticles = article.relatedArticles || []

    return Articles.find({
      title: {
        $regex: `.*${params.searchText}.*`,
        $options: 'si',
      },
      DOI: {
        $nin: relatedArticles.map(({ DOI }) => DOI),
      },
    }).fetch()
  },
})
