import { Meteor } from 'meteor/meteor'

const {username, password, server, port} = Meteor.settings.smtp

process.env.MAIL_URL = `smtp://${username}:${password}@${server}:${port}`
