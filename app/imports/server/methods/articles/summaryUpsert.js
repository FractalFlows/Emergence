import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import Articles from '/imports/both/collections/articles'
import { findLastIndex } from 'lodash/fp'

Meteor.methods({
  'article/summaryUpsert'({ summary, articleSlug }){
    new SimpleSchema({
      summary: {
        type: new SimpleSchema({
          content: {
            type: String,
          },
        }),
      },
      articleSlug: { type: String },
    }).validate({ summary, articleSlug })

    if(!this.userId){
      throw new Meteor.Error(401, 'Unauthorized')
    }

    const article = Articles.findOne({
      slug: articleSlug,
    }, {
      fields: { summaries: 1 },
    })

    const existingSummaryIndex = findLastIndex({ authorId: this.userId }, article.summaries)

    if(existingSummaryIndex !== -1){
      // If is an existing summary update it
      Articles.update({_id: article._id}, {
        $set: {
          [`summaries.${existingSummaryIndex}.content`]: summary.content,
          [`summaries.${existingSummaryIndex}.updatedAt`]: new Date(),
        },
      })
    } else {
      // If is a new summary create it
      Articles.update({_id: article._id}, {
        $addToSet: {
          summaries: {
            ...summary,
            updatedAt: new Date(),
            createdAt: new Date(),
            authorId: this.userId,
            authorName: Meteor.user().profile.firstName,
            upVotes: 0,
            downVotes: 0,
            status: 'enabled',
          },
        },
      })
    }

    return true
  },
})
