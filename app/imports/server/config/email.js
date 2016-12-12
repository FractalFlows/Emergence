import { Accounts } from 'meteor/accounts-base'

Accounts.emailTemplates.siteName = 'Competipedia'

Accounts.emailTemplates.from = 'Competipedia <support@competipedia.io>'

Accounts.emailTemplates.verifyEmail.subject =(user) =>
  'Welcome to Competipedia! Please verify your email'

Accounts.emailTemplates.verifyEmail.html =  (user, url) =>
  `Hello dear user,

  Please verify your email by simply clicking the link below:

  ${url}
  `