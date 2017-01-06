import asAnUser from '../helpers/asAnUser'
import Articles from '../helpers/articles'

describe('Articles', () => {
  describe('Knowledge Bits', () => {
    describe('Upsert modal @watch', () => {
      const host = 'http://localhost:3000'
      before(() => {
        server.call('dev/resetDatabase')
        server.call('dev/createArticles')
        browser.url(host)
      })

      it('user should be able to add a new knowledge bit', () => {
        const article = Articles('findOne', {})

        asAnUser()
        navigateToArticle(article)
        clickOnAddKnowledgeProduct()

        function navigateToArticle(article){
          browser.url(`${host}/article/${article.slug}`)
        }

        function clickOnAddKnowledgeProduct(){
          browser.waitForVisible('button[data-name="add-knowledge-btn"]')
          browser.click('button[data-name="add-knowledge-btn"]')
        }
      })
    })
  })
})
