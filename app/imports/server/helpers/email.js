import { Email } from 'meteor/email'
import handlebars from 'handlebars'
import fs from 'fs'

export function send({ to, from = 'Competipedia <support@competipedia.io>', subject, view, data }){
  const path = Assets.absoluteFilePath(`emailViews/${view}.hbs`)
  const source = fs.readFileSync(path, 'utf8')
  const template = handlebars.compile(source)
  const html = template(data)

  Email.send({
    to,
    from,
    subject,
    html,
  })
}
