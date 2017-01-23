import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

const schema = new SimpleSchema({
  email: {
    type: SimpleSchema.RegEx.Email,
    unique: true,
    index: 1,
  },
  name: {
    type: String,
  },
})

const MailingList = new Mongo.Collection('mailingList')

MailingList.attachSchema(schema)

export default MailingList
