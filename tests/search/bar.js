import {
  asAnUser,
  ensureThatUserIsLoggedIn,
  ensureThatUserIsNotLoggedIn,
  hitButton,
  userIsLoggedIn,
} from '../helpers'

const host = 'http://localhost:3000'

describe('Search', () => {
  describe('Bar', () => {
    before(() => {
      server.call('dev/resetDatabase')
      server.call('dev/createArticles')
      browser.url(host)
    })

    it('should show dropdown with results', () => {
      browser.setValue('[data-name=input-search]', 'a')

      browser.waitUntil(() => {
        return !browser.isVisible('[data-name=spinner-search]')
      }, 50000)

      const dropdownIsVisible = browser.isVisible('[data-name=dropdown-search]')

      expect(dropdownIsVisible).to.be.true
    })
  })
})
