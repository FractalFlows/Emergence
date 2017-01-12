import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import Articles from '/imports/both/collections/articles'

Meteor.methods({
  'article/removeRelated'(params){
    new SimpleSchema({
      DOI: {
        type: String,
      },

      articleSlug: {
        type: String,
      },
    }).validate(params)

    if(!this.userId){
      throw new Meteor.Error(401, 'Unauthorized')
    }

    Articles.update({
      slug: params.articleSlug,
    }, {
      $pull: {
        relatedArticles: {
          DOI: params.DOI, 
          addedById: this.userId,
        },
      },
    })

    return true
  },
})
