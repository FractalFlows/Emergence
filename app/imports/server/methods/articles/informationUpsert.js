import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import Articles from '/imports/both/collections/articles'
import { findLastIndex } from 'lodash/fp'

Meteor.methods({
  'article/informationUpsert'({ information, articleSlug }){
    new SimpleSchema({
      information: {
        type: new SimpleSchema({
          type: {
            type: String,
            allowedValues: ['pdf', 'github'],
          },
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
        $set: {
          [`informations.${existingInformationIndex}.link`]: information.link,
          [`informations.${existingInformationIndex}.type`]: information.type,
          [`informations.${existingInformationIndex}.updatedAt`]: new Date(),
        },
      })
    } else {
      // If is a new information create it
      Articles.update({_id: article._id}, {
        $addToSet: {
          informations: {
            ...information,
            updatedAt: new Date(),
            createdAt: new Date(),
            addedById: this.userId,
            addedByName: Meteor.user().profile.firstName,
            upVotes: 0,
            downVotes: 0,
            label: 'Emergence',
          },
        },
      })
    }

    return true
  },
})
