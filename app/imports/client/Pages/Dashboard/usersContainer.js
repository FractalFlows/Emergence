/*
 * Built by Astrocoders
 * @flow
 */

import composeWithTracker from 'compose-with-tracker'
import { Meteor } from 'meteor/meteor'

export default composeWithTracker((props, onData) => {
  const handle = Meteor.subscribe('users.all')

  if(handle.ready()){
    onData(null, {
      users: Meteor.users.find().fetch() || {},
    })
  } else {
    onData(null, {
      isLoading: true,
    })
  }
}, {

})
