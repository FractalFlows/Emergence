import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import Articles from '/imports/both/collections/articles'

Meteor.methods({
  'article/deleteSummary'({ summary, articleSlug }){
    new SimpleSchema({
      summary: {
        type: new SimpleSchema({
          authorId: {
            type: SimpleSchema.RegEx.Id,
          },
        }),
      },
      articleSlug: { type: String },
    }).validate({ summary, articleSlug })

    if(!this.userId){
      throw new Meteor.Error(401, 'Unauthorized')
    }

    Articles.update({
      slug: articleSlug,
      'summaries.authorId': this.userId,
    }, {
      $set: {
        [`summaries.$.status`]: 'disabled',
        [`summaries.$.updatedAt`]: new Date(),
      },
    })

    return true
  },
})
