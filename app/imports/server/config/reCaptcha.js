import { reCAPTCHA } from 'meteor/astrocoders:recaptcha'
import { meteor } from 'meteor/meteor'

const { reCAPTCHAPrivateKey } = Meteor.settings

reCAPTCHA.config({
  privatekey: reCAPTCHAPrivateKey,
  hl: 'en_us',
});