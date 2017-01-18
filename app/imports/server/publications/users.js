import { Meteor } from 'meteor/meteor'

Meteor.publish('users.all', function(){
  if(this.userId){
    return Meteor.users.find()
  }
})
