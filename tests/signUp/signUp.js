import {
  ensureThatUserIsLoggedIn,
  hitButton,
  fillUpForm,
  submitForm,
} from '../helpers'

const host = 'http://localhost:3000'

describe('Sign up', () => {
  before(() => {
    server.call('dev/resetDatabase')
    browser.url(host)
  })

  it('should be able to go to sign up modal through login one', () => {
    hitButton('a[data-name=header-login-btn]')
    hitButton('a[data-name=sign-in-register-link]')
    fillUpForm('form[data-name=form-signUp]', {
      fullName: 'John Doe',
      email: 'johndoe@gmail.com',
    })
    submitForm('form[data-name=form-signUp]')
    ensureThatUserIsLoggedIn()
  })
})
