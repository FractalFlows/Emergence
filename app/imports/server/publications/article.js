import { Meteor } from 'meteor/meteor'
import Articles from '/imports/both/collections/articles'

Meteor.publish('articles.bySlug', slug => Articles.findOne({ slug }))
