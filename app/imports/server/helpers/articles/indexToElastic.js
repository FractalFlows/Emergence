import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { Meteor } from 'meteor/meteor'
import { ELASTIC_SEARCH_INDEX, ELASTIC_SEARCH_TYPE } from '/imports/both/collections/articles'
import elasticSearch from '/imports/server/helpers/elasticSearch'

export default function indexArticleToElastic({ authors, title, abstract, DOI }){
  new SimpleSchema({
    authors: { type: [String] },
    title: { type: String },
    abstract: { type: String },
    DOI: { type: String },
  }).validate({ authors, title, abstract, DOI })

  Meteor.defer(() => {
    elasticSearch.index({
      index: ELASTIC_SEARCH_INDEX,
      type: ELASTIC_SEARCH_TYPE,
      body: {
        authors,
        title,
        abstract,
        DOI,
      },
    })
  })

  return true
}
