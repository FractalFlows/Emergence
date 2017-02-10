import elasticSearch from 'elasticsearch'
import { Meteor } from 'meteor/meteor'

const { elasticSearch: { url, user, password } } = Meteor.settings

const client = new elasticSearch.Client({
  host: `https://${user}:${password}@${url}`,
  log: 'trace',
})

export default client
