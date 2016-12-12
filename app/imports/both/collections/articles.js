import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

const Articles = new Mongo.Collection('articles')


Articles.schema = new SimpleSchema({
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
  name: {
    label: 'Article name',
    index: true,
    type: String,
    max: 150,
    unique: true,
  },
})

Articles.attachSchema(Articles.schema)
export default Articles

