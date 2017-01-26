const host = 'http://localhost:3000'

describe('Home page', () => {
  before(() => {
    browser.url(host)
  })

  it('should show copyright', () => {
    browser.getText('p*=All Rights Reserved')
  })
})
