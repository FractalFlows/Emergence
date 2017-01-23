import MailingList from '/imports/both/collections/mailingList'
import { Meteor } from 'meteor/meteor'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export default new ValidatedMethod({
  name: 'users/addToMailingList',
  validate: new SimpleSchema({
    email: {
      type: SimpleSchema.RegEx.Email,
    },
    name: {
      type: String,
    },
  }).validator(),
  run({ email, name }){
    try {
      MailingList.insert({
        email,
        name,
      })
    } catch(e){
      throw new Meteor.Error(401, 'Email already in the list')
    }

    return true
  },
})

