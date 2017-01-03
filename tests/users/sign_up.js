describe('Users', () => {
  describe('Sign up', () => {
    before(() => {
      server.call('dev/resetDatabase')
      browser.url('http://localhost:3000')
    })

    it('should be able to go to sign up modal through login one', () => {
      browser.waitForVisible('p[data-name=header-login-btn]')
    })
  })
})
