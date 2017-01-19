import elasticSearch from 'elasticsearch'
import { Meteor } from 'meteor/meteor'

const { elasticSearch: { user, password } } = Meteor.settings

const client = new elasticSearch.Client({
  host: `https:\/\/${user}:${password}@4d0208d5dc50761cd2dbaf5460637daa.sa-east-1.aws.found.io:9243`,
  log: 'trace',
})

export default client
