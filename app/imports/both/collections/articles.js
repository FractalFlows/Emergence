import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

const Articles = new Mongo.Collection('articles')

const ArticleVoteSchema = new SimpleSchema({
  vote: {
    type: Number,
    allowedValues: [-1, 1],
  },
  voterId: {
    type: SimpleSchema.RegEx.Id,
  },
  voterName: {
    type: String,
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
  addedById: {
    type: SimpleSchema.RegEx.Email,
  },
  addedByName: {
    type: String,
  },
  createdAt: {
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
})

Articles.attachSchema(schema)

export default Articles
