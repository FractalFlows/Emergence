import { Meteor } from 'meteor/meteor' 
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import Articles, {
  UPVOTE,
  DOWNVOTE,
} from '/imports/both/collections/articles'
import {
  hasUserAlreadyDownvoted,
  hasUserAlreadyUpvoted,
  undoDownvote,
  undoUpvote,
} from './votingSystemHelpers/informations'

export default new ValidatedMethod({
  name: 'article/voteForInformation',
  validate: new SimpleSchema({
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
  }).validator(),

  run(params){
    if(!this.userId){
      throw new Meteor.Error(401, 'Unauthorized')
    }

    // Here we need to check if the user has already voted
    // and for what she/he voted for.
    //
    // Case 1: If the user has upvoted and is trying to
    // downvote this time we need to remove the upvote first.
    // Case 2: If the user has downvoted is trying to
    // upvote this time we need to remove the downvote first.
    // Case 3: If the user has downvoted and is trying to
    // downvote again this time we need to remove the downvote do nothing.
    // Case 4: If the user has upvoted and is trying to
    // upvote again this time we need to remove the upvote do nothing.

    if( hasUserAlreadyDownvoted({ userId: this.userId, params }) ){
      undoDownvote({
        userId: this.userId,
        params,
      })

      // Case 3
      if(params.vote === DOWNVOTE) return
    }

    if( hasUserAlreadyUpvoted({ params, userId: this.userId }) ){
      undoUpvote({
        userId: this.userId,
        params,
      })

      // Case 4
      if(params.vote === UPVOTE) return
    }

    console.log({
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

    // Continue to the normal behavior.
    // Just add the respective vote and increases it counter.
    Articles.update({
      slug: params.articleSlug,
      informations: {
        $elemMatch: {
          link: params.link,
          status: 'enabled',
        },
      },
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
