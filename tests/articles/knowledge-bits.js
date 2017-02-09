import asAnUser from '../helpers/asAnUser'
import Articles from '../helpers/articles'
import setFieldWithReduxForm from '../helpers/setFieldWithReduxForm'
import sleep from '../helpers/sleep'

const host = 'http://localhost:3000'
describe('Articles', () => {
  describe('Knowledge Bits', () => {
    describe('Upsert modal', () => {
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

    describe('Ranking system', () => {
      before(() => {
        server.call('dev/resetDatabase')
        server.call('dev/createArticles')
        browser.url(host)
      })

      it('user should be able to upvote a knowledge bit', () => {
        const article = Articles('findOne', {'informations.upVotes': 0})

        asAnUser()
        navigateToArticle(article)
        clickOnUpvoteBtnFor(article.informations[0])

        // Hang a sec to wait ops complete
        sleep(2000)

        const updatedArticle = Articles('findOne', {_id: article._id})

        expect(updatedArticle.informations[0].voters).to.be.an('array')
        expect(updatedArticle.informations[0].voters).to.have.property('length', 1)
        expect(updatedArticle.informations[0].voters[0].vote).to.equal(1)
      })

      it('user should be able to downvote a knowledge bit', () => {
        const article = Articles('findOne', {'informations.upVotes': 1})

        asAnUser()
        navigateToArticle(article)
        clickOnDownvoteBtnFor(article.informations[0])

        // Hang a sec to wait ops complete
        sleep(2000)

        const updatedArticle = Articles('findOne', {_id: article._id})

        expect(updatedArticle.informations[0].voters).to.be.an('array')
        expect(updatedArticle.informations[0].voters).to.have.property('length', 1)
        expect(updatedArticle.informations[0].voters[0].vote).to.equal(-1)
      })

      it('user should be able to undo downvote for a knowledge bit', () => {
        const article = Articles('findOne', {'informations.downVotes': 1})

        asAnUser()
        navigateToArticle(article)

        // As last test already downvoted clicking again will undo it
        clickOnDownvoteBtnFor(article.informations[0])
        // Hang a sec to wait ops complete
        sleep(2000)

        const updatedArticle = Articles('findOne', {_id: article._id})

        expect(updatedArticle.informations[0].voters).to.be.an('array')
        expect(updatedArticle.informations[0].voters).to.have.property('length', 0)
      })

      it('user should be able to undo a upvote for a knowledge bit', () => {
        const article = Articles('findOne', {'informations.upVotes': 0})

        asAnUser()
        navigateToArticle(article)

        clickOnUpvoteBtnFor(article.informations[0])
        // Hang a sec to wait ops complete
        sleep(2000)
        // Click again to undo
        clickOnUpvoteBtnFor(article.informations[0])
        // Hang a sec to wait ops complete
        sleep(2000)

        const updatedArticle = Articles('findOne', {_id: article._id})

        expect(updatedArticle.informations[0].voters).to.be.an('array')
        expect(updatedArticle.informations[0].voters).to.have.property('length', 0)
      })
    })
  })
})

function navigateToArticle(article){
  browser.url(`${host}/article/${article.slug}`)
}

function clickOnAddKnowledgeProduct(){
  browser.waitForVisible('[data-name="add-knowledge-btn"]')
  browser.click('[data-name="add-knowledge-btn"]')
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

function clickOnUpvoteBtnFor(knowledgeBit){
  browser.waitForVisible(`[data-name="${knowledgeBit.link}-upvote-btn"]`)
  browser.click(`[data-name="${knowledgeBit.link}-upvote-btn"]`)
}

function clickOnDownvoteBtnFor(knowledgeBit){
  browser.waitForVisible(`[data-name="${knowledgeBit.link}-downvote-btn"]`)
  browser.click(`[data-name="${knowledgeBit.link}-downvote-btn"]`)
}
