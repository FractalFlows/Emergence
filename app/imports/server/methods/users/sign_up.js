import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

Meteor.methods({
  'users/signUp'(user){
    new SimpleSchema({
      name: { type: String },
      email: { type: SimpleSchema.RegEx.Email },
    }).validate(user)

    const userId = Accounts.createUser({
      username: values.email.split('@')[0] + Math.random().toString().slice(2, 6),
      password: 'defaultpassword',
      profile: {
        name: values.fullName,
      },
    })

    return true
  },
})
