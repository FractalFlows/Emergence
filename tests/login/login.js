import {
  fillUpForm,
  ensureThatUserIsLoggedIn,
  submitForm,
  hitButton,
  userIsLoggedIn,
} from '../helpers'

const host = 'http://localhost:3000'

describe('Login', () => {
  before(() => {
    server.call('dev/resetDatabase')
    server.call('dev/createUsers')
    browser.url(host)
  })

  it('when clicking on "login" should open a modal', () => {
    hitButton('a[data-name=header-login-btn]')
    browser.waitForVisible('div.modal')
  })

  it('user should be able to login using email', () => {
    fillUpForm('form[data-name=form-login]', {
      email: 'normal@gmail.com',
    })
    submitForm('form[data-name=form-login]')
    ensureThatUserIsLoggedIn()
  })
})
