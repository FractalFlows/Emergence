import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import Articles from '/imports/both/collections/articles'
import { findLastIndex } from 'lodash/fp'

Meteor.methods({
  'article/deleteInformation'({ information, articleSlug }){
    new SimpleSchema({
      information: {
        type: new SimpleSchema({
          link: {
            type: SimpleSchema.RegEx.Url,
          },
        }),
      },
      articleSlug: { type: String },
    }).validate({ information, articleSlug })

    if(!this.userId){
      throw new Meteor.Error(401, 'Unauthorized')
    }

    const article = Articles.findOne({
      slug: articleSlug,
    }, {
      fields: { informations: 1 },
    })

    const existingInformationIndex = findLastIndex({ link: information.link }, article.informations)

    if(existingInformationIndex !== -1){
      // If is an existing information update it
      Articles.update({_id: article._id}, {
        $pull: {
          informations: information,
        },
      })
    }

    return true
  },
})
