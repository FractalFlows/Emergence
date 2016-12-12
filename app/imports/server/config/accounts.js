import { ServiceConfiguration } from 'meteor/service-configuration'
import { Meteor } from 'meteor/meteor'
import _ from 'lodash'

const { settings } = Meteor

ServiceConfiguration.configurations.upsert(
  { service: 'github' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: _.get(settings, 'github.clientId'),
      secret: _.get(settings, 'github.secret'),
    }
  }
)

ServiceConfiguration.configurations.upsert(
  { service: 'facebook' },
  {
    $set: {
      loginStyle: 'popup',
      appId: _.get(settings, 'facebook.appId'),
      secret: _.get(settings, 'facebook.secret'),
    }
  }
)

ServiceConfiguration.configurations.upsert(
  { service: 'twitter' },
  {
    $set: {
      loginStyle: 'popup',
      consumerKey: _.get(settings, 'twitter.consumerKey'),
      secret: _.get(settings, 'twitter.secret'),
    }
  }
)

ServiceConfiguration.configurations.upsert(
  { service: 'google' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: _.get(settings, 'google.clientId'),
      secret: _.get(settings, 'google.secret'),
    }
  }
)