import _ from 'lodash'

export default function buildValidatorEmail(userId, options) {
  const user = Meteor.users.findOne(userId)
  const to = _.get(user, 'emails[0].address')
  const profile = _.get(user, 'profile')
  const data = Object.assign({email: to}, profile)

  return Object.assign({to, data}, options)
}