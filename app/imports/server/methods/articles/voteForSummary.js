import { Meteor } from 'meteor/meteor' 
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import Articles, {
  UPVOTE,
  DOWNVOTE,
} from '/imports/both/collections/articles'
import {
  hasUserAlreadyDownvoted,
  hasUserAlreadyUpvoted,
  undoDownvote,
  undoUpvote,
} from './votingSystemHelpers/summaries'

Meteor.methods({
  'article/voteForSummary'(params){
    new SimpleSchema({
      articleSlug: {
        type: String,
      },

      authorId: {
        type: SimpleSchema.RegEx.Id,
      },

      vote: {
        type: Number,
        allowedValues: [UPVOTE, DOWNVOTE],
      },
    }).validate(params)

    if(!this.userId){
      throw new Meteor.Error(401, 'Unauthorized')
    }

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

    if( hasUserAlreadyDownvoted({ userId: this.userId, params }) ){
      undoDownvote({ userId: this.userId, params })

      // Case 3
      if(params.vote === DOWNVOTE) return
    }

    if(hasUserAlreadyUpvoted({ userId: this.userId, params })){
      undoUpvote({ userId: this.userId, params })

      // Case 4
      if(params.vote === UPVOTE) return
    }

    // Continue to the normal behavior.
    // Just add the respective vote and increases it counter.
    Articles.update({
      slug: params.articleSlug,
      summaries: {
        $elemMatch: {
          authorId: params.authorId,
          status: 'enabled',
        },
      },
    }, {
      $inc: {
        ...( params.vote === UPVOTE ? {'summaries.$.upVotes': 1} : {} ),
        ...( params.vote === DOWNVOTE ? {'summaries.$.downVotes': 1} : {} ),
      },
      $addToSet: {
        'summaries.$.voters': {
          voterId: this.userId,
          voterName: Meteor.user().profile.firstName,
          vote: params.vote,
          createdAt: new Date(),
        },
      },
    })
  },
})
