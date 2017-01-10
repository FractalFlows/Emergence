import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export default function validateObject(schema, obj){
  const context = new SimpleSchema(schema).newContext()

  if(context.validate(obj)) return {}

  return context.invalidKeys().reduce((acc, field) => {
    return {
      ...acc,
      [field.name]: context.keyErrorMessage(field.name),
    }
  }, {})
}
