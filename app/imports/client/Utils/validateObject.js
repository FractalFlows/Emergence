import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export default function validateObject(schema, obj, customMessages = {}){
  const ss = new SimpleSchema(schema)
  const context = ss.newContext()

  ss.messages(customMessages)

  if(context.validate(obj)) return {}

  return context.invalidKeys().reduce((acc, field) => {
    return {
      ...acc,
      [field.name]: context.keyErrorMessage(field.name),
    }
  }, {})
}
