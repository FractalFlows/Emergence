import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import Articles from '/imports/both/collections/articles'

Meteor.methods({
  'articles/addRelated'(params){
    new SimpleSchema({
      articleSlug: {
        type: String,
      },
      relatedArticleDOI: {
        type: String,
      },
    }).validate(params)

    if(!this.userId){
      throw new Meteor.Error(401, 'Unauthorized')
    }

    const relatedArticle = Articles.findOne({
      DOI: params.relatedArticleDOI,
    }, {
      fields: { title: 1, authors: 1, abstract: 1 },
    })

    if(!relatedArticle){
      throw new Meteor.Error(401, 'Invalid DOI')
    }

    Articles.update({
      slug: params.articleSlug,
    }, {
      $addToSet: {
        relatedArticles: {
          title: relatedArticle.title,
          DOI: params.relatedArticleDOI, 
          createdAt: new Date(),
          addedById: this.userId,
          addedByName: Meteor.user().profile.firstName,
          abstract: relatedArticle.abstract,
          authors: relatedArticle.authors,
        },
      },
    })

    return true
  },
})
