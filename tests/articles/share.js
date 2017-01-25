import Articles from '../helpers/articles'

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

      navigateToArticle(article)
      browser.waitForVisible('.at-share-btn-elements')
    })

    it('a popup should be open after a facebook share button is clicked on', () => {
      const windowsOpen = browser.windowHandles().value.length

      browser.click('.at-share-btn-elements a[role=button]:first-child')

      expect(browser.windowHandles().value.length).to.be.above(windowsOpen)
    })
  })
})

function navigateToArticle(article){
  browser.url(`${host}/article/${article.slug}`)
}
