import {
  Articles,
  asAnUser,
  navigateToArticle,
} from '../../helpers'

const host = 'http://localhost:3000'

describe('Articles', () => {
  describe('Summaries', () => {
    describe('Upsert modal', () => {
      before(() => {
        server.call('dev/resetDatabase')
        server.call('dev/createArticles')
        browser.url(host)
      })

      it('should be visible button "create a new summary" when none exists', () => {
        //This article doesn't contain any summary
        const article = Articles('findOne', {DOI: '10.1109/FIE.2000.896576'})

        asAnUser()
        navigateToArticle(host, article)

        browser.getText('button=Create a new summary')
      })

      it('should have expandable items', () => {

      })
    })
  })
})
