import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import { Accounts } from 'meteor/accounts-base'

Meteor.methods({
  'dev/createUsers'(){
    if (Meteor.users.find().count() > 0) return
   ([
      {
        name: 'Admin User',
        email: 'admin@gmail.com',
        admin: true,
      },
      {
        name: 'Normal User',
        email: 'normal@gmail.com',
      },
    ]).forEach(user => {
      const userId = Accounts.createUser({
        username: user.email.split('@')[0],
        email: user.email,
        password: 'defaultpassword',
        profile: {
          firstName: user.name,
        }
      })

      if(user.admin) Roles.addUsersToRoles(userId, 'admin')
    })
  },
})

