import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import Articles from '/imports/both/collections/articles'
import { Email } from 'meteor/email'

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
        inappropriatedContentReports: {
          message: params.message,
          createdAt: new Date(),
          authorId: this.userId,
          authorName: Meteor.user().profile.firstName,
        },
      },
    })

    const admins = Meteor.users.find({
      admin: true,
    }, {
      fields: { emails: 1 }
    }).fetch().map(({ emails }) => emails[0].address)

    Email.send({
      to: admins,
      from: 'no-reply@emergence',
      subject: 'An article was reported',
      html: `
        <p>
          <a href="https://emergence.io/article/${params.articleSlug}">This article</a> was reported by the user ${Meteor.user().profile.firstName}
        </p>
      `
    })

    return true
  },
})
