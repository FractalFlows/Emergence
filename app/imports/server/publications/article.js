import { Meteor } from 'meteor/meteor'
import Articles from '/imports/both/collections/articles'

Meteor.publish('articles.bySlug', slug => (
  Articles.find({ slug }, {
    fields: {
      'informations.voters': 0,
      unappropriatedContentReports: 0,
    },
  })
))

// If the user has reported already it'll send only that very
// entry added by the user so we can detect the state in the client
Meteor.publish('articles.hasUserReported', function(slug){
  return Articles.find({
    slug,
  }, {
    fields: {
      'unappropriatedContentReports': {
        $elemMatch: { authorId: this.userId },
      },
    },
  })
})
