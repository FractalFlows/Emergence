/*
 * Built by Astrocoders
 * @flow
 */

import composeWithTracker from 'compose-with-tracker'
import Articles from '/imports/both/collections/articles'

export default composeWithTracker((props, onData) => {
  const slug = props.params.slug
  const handle = Meteor.subscribe('articles.bySlug', slug)

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
