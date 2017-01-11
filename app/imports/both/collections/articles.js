import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

const Articles = new Mongo.Collection('articles')

export const UPVOTE = 1
export const DOWNVOTE = -1

const ArticleVoteSchema = new SimpleSchema({
  vote: {
    type: Number,
    allowedValues: [DOWNVOTE, UPVOTE],
  },
  voterId: {
    type: SimpleSchema.RegEx.Id,
  },
  voterName: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
})

export const ArticleSummarySchema = new SimpleSchema({
  authorId: {
    type: String,
  },
  content: {
    type: String,
  },
  date: {
    type: Date,
  },
  upVotes: {
    type: Number,
  },
  downVotes: {
    type: Number,
  },
  voters: {
    type: [ArticleVoteSchema],
    optional: true,
  },
})

export const ArticleKnowledgeBitSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['pdf', 'github'],
  },
  link: {
    type: SimpleSchema.RegEx.Url,
  },
  label: {
    type: String,
  },
  addedById: {
    type: SimpleSchema.RegEx.Email,
  },
  addedByName: {
    type: String,
  },
  status: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  upVotes: {
    type: Number,
    optional: true,
  },
  downVotes: {
    type: Number,
    optional: true,
  },
  voters: {
    type: [ArticleVoteSchema],
    optional: true,
  },
})

const schema = new SimpleSchema({
  createdAt: {
    type: Date,
    optional: true,
    autoValue() {
      if (this.isInsert) {
        return new Date()
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() }
      } else {
        this.unset()
      }
    },
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue() {
      if (this.isUpdate) {
        return new Date()
      }
    },
    denyInsert: true,
  },
  title: {
    label: 'Article name',
    index: true,
    type: String,
    max: 150,
    unique: true,
  },
  authors: {
    type: [String],
  },
  DOI: {
    type: String,
    unique: true,
  },
  abstract: {
    type: String,
  },
  summaries: {
    type: [ArticleSummarySchema],
    optional: true,
  },
  informations: {
    type: [ArticleKnowledgeBitSchema],
    optional: true,
  },
  relatedArticles: {
    type: [SimpleSchema.RegEx.Id],
    optional: true,
  },
  slug: {
    type: String,
    optional: true,
  },
})

Articles.attachSchema(schema)
Articles.friendlySlugs('title')

export default Articles
