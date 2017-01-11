import { Meteor } from 'meteor/meteor' 
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import Articles, {
  UPVOTE,
  DOWNVOTE,
} from '/imports/both/collections/articles'

Meteor.methods({
  'article/voteForInformation'(params){
    new SimpleSchema({
      articleSlug: {
        type: String,
      },

      link: {
        type: SimpleSchema.RegEx.Url,
      },

      vote: {
        type: Number,
        allowedValues: [UPVOTE, DOWNVOTE],
      },
    }).validate(params)

    if(!this.userId){
      throw new Meteor.Error(401, 'Unauthorized')
    }

    const hasUserAlreadyDownvoted = Articles.find({
      slug: params.articleSlug,
      'informations.link': params.link,
      'informations.voters.voterId': this.userId,
      'informations.voters.vote': DOWNVOTE,
      'informations.status': 'enabled',
    }).count()

    const hasUserAlreadyUpvoted = Articles.find({
      slug: params.articleSlug,
      'informations.link': params.link,
      'informations.voters.voterId': this.userId,
      'informations.voters.vote': UPVOTE,
      'informations.status': 'enabled',
    }).count()


    // Here we need to check if the user has already voted
    // and for what she/he voted for.
    //
    // Case 1: If the user has upvoted we need and is trying to
    // downvote this time we need to remove the upvote first.
    // Case 2: If the user has downvoted we need and is trying to
    // upvote this time we need to remove the downvote first.
    // Case 3: If the user has downvoted we need and is trying to
    // downvote again this time we need to remove the downvote do nothing.
    // Case 4: If the user has upvoted we need and is trying to
    // upvote again this time we need to remove the upvote do nothing.

    if(hasUserAlreadyDownvoted){
      Articles.update({
        slug: params.articleSlug,
        'informations.link': params.link,
        'informations.status': 'enabled',
      }, {
        $inc: {
          'informations.$.downVotes': -1,
        },
        $pull: {
          'informations.$.voters': {
            vote: DOWNVOTE,
            voterId: this.userId,
          },
        },
      })

      // Case 3
      if(params.vote === DOWNVOTE) return
    }

    if(hasUserAlreadyUpvoted){
      Articles.update({
        slug: params.articleSlug,
        'informations.link': params.link,
        'informations.status': 'enabled',
      }, {
        $inc: {
          'informations.$.upVotes': -1,
        },
        $pull: {
          'informations.$.voters': {
            vote: UPVOTE,
            voterId: this.userId,
          },
        },
      })

      // Case 4
      if(params.vote === UPVOTE) return
    }

    // Continue to the normal behavior.
    // Just add the respective vote and increases it counter.
    Articles.update({
      slug: params.articleSlug,
      'informations.link': params.link,
      'informations.status': 'enabled',
    }, {
      $inc: {
        ...( params.vote === UPVOTE ? {'informations.$.upVotes': 1} : {} ),
        ...( params.vote === DOWNVOTE ? {'informations.$.downVotes': 1} : {} ),
      },
      $addToSet: {
        'informations.$.voters': {
          voterId: this.userId,
          voterName: Meteor.user().profile.firstName,
          vote: params.vote,
          createdAt: new Date(),
        },
      },
    })
  },
})
