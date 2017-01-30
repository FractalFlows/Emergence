import Articles, {
  UPVOTE,
  DOWNVOTE,
} from '/imports/both/collections/articles'

export const hasUserAlreadyVoted = ({ vote, userId, params }) => Articles.find({
  slug: params.articleSlug,
  informations: {
    $elemMatch: {
      link: params.link,
      status: 'enabled',
      voters: {
        $elemMatch: {
          voterId: userId,
          vote,
        },
      },
    },
  },
}).count()

export const hasUserAlreadyDownvoted = ({ userId, params }) => hasUserAlreadyVoted({
  userId,
  params,
  vote: DOWNVOTE,
}) 

export const hasUserAlreadyUpvoted = ({ userId, params }) => hasUserAlreadyVoted({
  userId,
  params,
  vote: UPVOTE,
})

export const undoVote = ({ userId, decreaseAt, voteValue, params }) => Articles.update({
  slug: params.articleSlug,
  informations: {
    $elemMatch: {
      link: params.link,
      status: 'enabled',
    },
  },
}, {
  $inc: {
    [`informations.$.${decreaseAt}`]: -1,
  },
  $pull: {
    'informations.$.voters': {
      vote: voteValue,
      voterId: userId,
    },
  },
})

export const undoDownvote = ({ userId, params }) => undoVote({
  userId,
  params,
  decreaseAt: 'downVotes',
  voteValue: DOWNVOTE,
})

export const undoUpvote = ({ userId, params }) => undoVote({
  userId,
  params,
  decreaseAt: 'upVotes',
  voteValue: UPVOTE,
})
