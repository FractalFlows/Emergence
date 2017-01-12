import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import Articles from '/imports/both/collections/articles'

Meteor.methods({
  'article/report'(params){
    new SimpleSchema({
      articleSlug: { type: String },
      message: { type: String },
    })

    if(!this.userId){
      throw new Meteor.Error(401, 'Unauthorized')
    }

    const alreadyReported = Articles.find({
      'unappropriatedContentReports.authorId': this.userId,
    }).count()

    if(alreadyReported) return true

    Articles.update({
      slug: params.articleSlug,
    }, {
      $addToSet: {
        unappropriatedContentReports: {
          message: params.message,
          createdAt: new Date(),
          authorId: this.userId,
          authorName: Meteor.user().profile.firstName,
        },
      },
    })

    return true
  },
})
