import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

Meteor.users.schema = new SimpleSchema({
  updatedAt: {
    type: Date,
    autoValue() {
      if (this.isUpdate) return new Date()
    },
    denyInsert: true,
    optional: true,
  },

  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) return new Date()
    },
    denyUpdate: true,
    optional: true,
  },

  username: {
    label: 'Username',
    type: String,
    optional: true,
  },
  emails: {
    type: [Object],
    optional: true
  },
  'emails.$.address': {
    label: 'Email',
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  'emails.$.verified': {
    type: Boolean,
    optional: true
  },
  profile: {
    type: Object
  },

  'profile.name': {
    label:'First name',
    type: String,
    optional: true,
    custom() {
      if (this.userId && !this.value) return 'required'
    }
  },

  'profile.phone': {
    label:'Phone number',
    type: String,
    optional: true,
    custom() {
      if (this.userId && !this.value) return 'required'
    }
  },

  'profile.description': {
    label: 'Description (optional)',
    type: String,
    optional: true
  },

  'profile.facebook': {
    label:'Link facebook',
    type: String,
    optional: true
  },

  'profile.linkedin': {
    label:'Link linkedin',
    type: String,
    optional: true
  },

  'profile.website': {
    label:'Website',
    type: String,
    optional: true
  },

  'profile.toBeValidator': {
    label:'if the user applied to be a validator',
    type: Boolean,
    optional: true
  },

  'profile.location': {
    optional: true,
    type: new SimpleSchema({
      address: {
        label: 'Address',
        type: String,
        custom() {
          if (this.userId && !this.value) return 'required'
        }
      },
      lat: {
        label: 'Latitude',
        type: String
      },
      lng: {
        label: 'Longitude',
        type: String
      }
    })
  },

  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: [String],
    optional: true
  },
})

Meteor.users.attachSchema(Meteor.users.schema)
