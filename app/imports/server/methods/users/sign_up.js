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
      username: user.email.split('@')[0] + Math.random().toString().slice(2, 6),
      password: 'defaultpassword',
      email: user.email,
      profile: {
        firstName: user.name,
      },
    })

    return true
  },
})
