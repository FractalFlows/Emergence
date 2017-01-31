/*
 * Built by Astrocoders
 * @flow
 */

import composeWithTracker from 'compose-with-tracker'
import { compose } from 'recompose'
import { Meteor } from 'meteor/meteor'
import Articles from '/imports/both/collections/articles'
import { connect } from 'react-redux'
import * as actionsToProps from './actions'

export const redux = connect(
  ({ article }) => ({
    articleState: article,
  }),
  actionsToProps
)

export const meteor = composeWithTracker((props, onData) => {
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

export default compose(
  meteor,
  redux
)
