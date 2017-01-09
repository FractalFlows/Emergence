describe('Users', () => {
  describe('Sign up', () => {
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
        browser.waitForVisible('p[data-name=header-login-btn]')
        // Open the modal
        browser.click('p[data-name=header-login-btn]')
        // Wait `Register` link to be visible
        browser.waitForVisible('p[data-name=sign-in-register-link]')
        // Open the register modal
        browser.click('p[data-name=sign-in-register-link]')
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
})
