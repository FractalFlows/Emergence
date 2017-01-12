import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import Articles from '/imports/both/collections/articles'

Meteor.methods({
  'article/search'(params){
    new SimpleSchema({
      searchText: {
        type: String,
      },
    }).validate(params)

    return Articles.find({
      title: {
        $regex: `.*${params.searchText}.*`,
        $options: 'si',
      },
    }).fetch()
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
