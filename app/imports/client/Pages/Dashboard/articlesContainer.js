/*
 * Built by Astrocoders
 * @flow
 */

import composeWithTracker from 'compose-with-tracker'
import { Meteor } from 'meteor/meteor'
import Articles from '/imports/both/collections/articles'

export default composeWithTracker((props, onData) => {
  const handle = Meteor.subscribe('articles.all')

  if(handle.ready()){
    onData(null, {
      articles: Articles.find().fetch(),
    })
  } else {
    onData(null, {
      isLoading: true,
    })
  }
}, {

})
