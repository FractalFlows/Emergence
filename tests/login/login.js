const host = 'http://localhost:3000'

describe('Login', () => {
  before(() => {
    server.call('dev/resetDatabase')
    server.call('dev/createUsers')
    browser.url(host)
  })

  it('when clicking on "login" should open a modal', () => {
    hitLoginButton()
    browser.waitForVisible('div.modal')

    function hitLoginButton(){
      browser.waitForVisible('a[data-name=header-login-btn]')
      browser.click('a[data-name=header-login-btn]')
    }
  })

  it('user should be able to login using email', () => {
    fillupLoginForm({
      email: 'normal@gmail.com',
    })
    hitLoginFormSubmit()
    checkIfUserIsLoggedIn()

    function fillupLoginForm({ email }) {
      browser.waitForVisible('input[data-name=email-login]')
      browser.setValue('input[data-name=email-login]', email)
    }

    function hitLoginFormSubmit(){
      browser.click('form[data-name=form-login] button[type=submit]')
    }

    function checkIfUserIsLoggedIn(){
      browser.waitUntil(() => {
        const userIsLoggedIn = browser
          .execute(() => {
            return !!Meteor.user()
          }).value

        return userIsLoggedIn
      }, 5000, 'expected Meteor.user() to be not null')
    }
  })
})
