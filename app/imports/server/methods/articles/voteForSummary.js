import { Meteor } from 'meteor/meteor' 
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import Articles, {
  UPVOTE,
  DOWNVOTE,
} from '/imports/both/collections/articles'

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

    const hasUserAlreadyDownvoted = Articles.find({
      slug: params.articleSlug,
      summaries: {
        $elemMatch: {
          authorId: params.authorId,
          status: 'enabled',
          voters: {
            $elemMatch: {
              voterId: this.userId,
              vote: DOWNVOTE,
            },
          },
        },
      },
    }).count()

    const hasUserAlreadyUpvoted = Articles.find({
      slug: params.articleSlug,
      summaries: {
        $elemMatch: {
          authorId: params.authorId,
          status: 'enabled',
          voters: {
            $elemMatch: {
              voterId: this.userId,
              vote: UPVOTE,
            },
          },
        },
      },
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
        'summaries.authorId': params.authorId,
        'summaries.status': 'enabled',
      }, {
        $inc: {
          'summaries.$.downVotes': -1,
        },
        $pull: {
          'summaries.$.voters': {
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
        'summaries.authorId': params.authorId,
        'summaries.status': 'enabled',
      }, {
        $inc: {
          'summaries.$.upVotes': -1,
        },
        $pull: {
          'summaries.$.voters': {
            vote: UPVOTE,
            voterId: this.userId,
          },
        },
      })

      // Case 4
      if(params.vote === UPVOTE) return
    }

    console.log('Including vote', params.vote)
    // Continue to the normal behavior.
    // Just add the respective vote and increases it counter.
    Articles.update({
      slug: params.articleSlug,
      'summaries.authorId': params.authorId,
      'summaries.status': 'enabled',
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
