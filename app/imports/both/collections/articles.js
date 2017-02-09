import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

const Articles = new Mongo.Collection('articles')

export const UPVOTE = 1
export const DOWNVOTE = -1
export const ELASTIC_SEARCH_INDEX = 'articles'
export const ELASTIC_SEARCH_TYPE = 'publications'

export const ArticleReportSchema = new SimpleSchema({
  message: {
    type: String,
  },
  authorId: {
    type: SimpleSchema.RegEx.Id,
  },
  authorName: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
})

export const ArticleVoteSchema = new SimpleSchema({
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
  authorName: {
    type: String,
  },
  content: {
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
  },
  downVotes: {
    type: Number,
  },
  voters: {
    type: [ArticleVoteSchema],
    optional: true,
  },
  status: {
    type: String,
    allowedValues: ['enabled', 'disabled'],
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
    allowedValues: ['enabled', 'disabled'],
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

export const ArticleRelatedArticleSchema = new SimpleSchema({
  DOI: {
    type: String,
  },
  title: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  addedById: {
    type: SimpleSchema.RegEx.Id,
  },
  addedByName: {
    type: String,
  },
  authors: {
    type: [String],
  },
  abstract: {
    type: String,
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
    type: String,
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
    type: [ArticleRelatedArticleSchema],
    optional: true,
  },
  slug: {
    type: String,
    optional: true,
  },
  inappropriatedContentReports: {
    type: [ArticleReportSchema],
    optional: true,
  },
})

Articles.attachSchema(schema)
Articles.friendlySlugs('title')

export default Articles
