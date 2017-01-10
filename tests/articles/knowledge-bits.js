import asAnUser from '../helpers/asAnUser'
import Articles from '../helpers/articles'
import setFieldWithReduxForm from '../helpers/setFieldWithReduxForm'
import sleep from '../helpers/sleep'

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
        fillUpKnowledgeProductForm()

        // Send form
        browser.click('button[type="submit"]')
        sleep(2000)

        const updatedArticle = Articles('findOne', {_id: article._id})

        expect(updatedArticle.informations.length).to.equal(1)
      })
    })
  })
})

function navigateToArticle(article){
  browser.url(`${host}/article/${article.slug}`)
}

function clickOnAddKnowledgeProduct(){
  browser.waitForVisible('button[data-name="add-knowledge-btn"]')
    browser.click('button[data-name="add-knowledge-btn"]')
}

function fillUpKnowledgeProductForm(){
  browser.waitForVisible('[name="type"]')

  // SelectField is a "pure" React component
  // so we're not able to manipulate it here as we
  // can with a ordinary HTML5 field.
  // We put redux-form to do the job here.
  setFieldWithReduxForm({
    field: 'type',
    value: 'github',
    form: 'informationUpsert',
  })
  browser.setValue('[name="link"]', 'https://github.com/FractalFlows/Emergence')
}
