const host = 'http://localhost:3000'

describe('Sign up', () => {
  before(() => {
    server.call('dev/resetDatabase')
    browser.url(host)
  })

  it('should be able to go to sign up modal through login one', () => {
    accessSignUpForm()
    fillupSignUpForm({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
    })
    hitSignUpFormSubmit()

    browser.waitUntil(() => {
      const doesUserExist = browser
        .execute(() => {
          return !!Meteor.user()
        }).value

      return doesUserExist
    }, 5000, 'expected Meteor.user() to be not null')


    function accessSignUpForm(){
      // Wait `Login` button on header to be visible
      browser.waitForVisible('a[data-name=header-login-btn]')
      // Open the modal
      browser.click('a[data-name=header-login-btn]')
      // Wait `Register` link to be visible
      browser.waitForVisible('a[data-name=sign-in-register-link]')
      // Open the register modal
      browser.click('a[data-name=sign-in-register-link]')
    }

    function fillupSignUpForm({ name, email }){
      browser.waitForVisible('input[name=fullName]')
      browser.setValue('input[name=fullName]', name)
      browser.setValue('input[name=email]', email)
    }

    function hitSignUpFormSubmit(){
      browser.click('form button[type=submit]')
    }
  })
})
