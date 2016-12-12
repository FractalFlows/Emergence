import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { Meteor } from 'meteor/meteor'
import './methods'
import './collections'

if (Meteor.settings.public.env === 'development'){
  SimpleSchema.debug = true
}
