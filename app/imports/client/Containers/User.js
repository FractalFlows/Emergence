import composeWithTracker from 'compose-with-tracker'
import { Meteor } from 'meteor/meteor'

export default composeWithTracker((props, onData) => {
  onData(null, {
    isLoggingIn: Meteor.loggingIn(),
    user: Meteor.user() || {},
  })
})
