import elasticSearch from 'elasticsearch'
import { Meteor } from 'meteor/meteor'

const { elasticSearch: { user, password } } = Meteor.settings

const client = new elasticSearch.Client({
  host: `https://${user}:${password}@e39fe5ed9579d46b459db0fec2cd7c47.us-east-1.aws.found.io:9243`,
  log: 'trace',
})

export default client
