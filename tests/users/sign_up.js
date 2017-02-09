import sleep from '../helpers/sleep'
import setFieldWithReduxForm from '../helpers/setFieldWithReduxForm'

describe('Users', () => {
  describe('Sign up @watch', () => {
    before(() => {
      server.call('dev/resetDatabase')
      browser.url('http://localhost:3000')
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
        browser.waitForVisible('[data-name=header-login-btn]')
        // Open the modal
        browser.click('[data-name=header-login-btn]')
        // Wait `Register` link to be visible
        browser.waitForVisible('[data-name=sign-in-register-link]')
        // Open the register modal
        browser.click('[data-name=sign-in-register-link]')
        sleep(2000)
      }

      function fillupSignUpForm({ name, email }){
        browser.waitForVisible('form[data-name=signUp] [name=fullName]')
        browser.setValue('form[data-name=signUp] [name=fullName]', name)
        browser.setValue('form[data-name=signUp] [name=email]', email)
      }

      function hitSignUpFormSubmit(){
        browser.click('form[data-name=signUp] button[type=submit]')
      }
    })
  })
})
