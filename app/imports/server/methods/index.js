import { Meteor } from 'meteor/meteor'
import './users'
import './articles'

if(Meteor.settings.public.env === 'development'){
  require('./dev')
  console.log(' ============ WARNING ============ ')
  console.log(' ==== Dev methods were loaded ==== ')
}
