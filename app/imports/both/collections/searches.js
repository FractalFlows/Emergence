import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

const schema = new SimpleSchema({
  text: {
    type: String,
    index: 1,
  },
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
  lastSearchedAt: {
    type: Date,
  },
})

const Searches = new Mongo.Collection('searches')

Searches.attachSchema(schema)

export default Searches
