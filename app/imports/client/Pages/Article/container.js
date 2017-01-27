/*
 * Built by Astrocoders
 * @flow
 */

import composeWithTracker from 'compose-with-tracker'
import { Meteor } from 'meteor/meteor'
import Articles from '/imports/both/collections/articles'

export default composeWithTracker((props, onData) => {
  const slug = props.params.slug
  const handle = Meteor.subscribe('articles.bySlug', slug)

  // Checks
  Meteor.subscribe('articles.hasUserReported', slug)

  if(handle.ready()){
    onData(null, {
      article: Articles.findOne({ slug }) || {},
    })
  } else {
    onData(null, {
      isLoading: true,
    })
  }
}, {
  propsToWatch: 'params',
  pure: true,
})
