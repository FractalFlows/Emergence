import {
  Articles,
  hitButton,
  navigateToArticle,
} from '../helpers'

const host = 'http://localhost:3000'

describe('Articles', () => {
  describe('Share', () => {
    before(() => {
      server.call('dev/resetDatabase')
      server.call('dev/createArticles')
      browser.url(host)
    })

    it('share buttons should be visible to the user', () => {
      const article = Articles('findOne', {})

      navigateToArticle(host, article)
      browser.waitForVisible('.at-share-btn-elements')
    })

    it('a popup should be open after a facebook share button is clicked on', () => {
      const windowsOpen = browser.windowHandles().value.length

      hitButton('.at-share-btn-elements a[role=button]:first-child')

      expect(browser.windowHandles().value.length).to.be.above(windowsOpen)
    })
  })
})
