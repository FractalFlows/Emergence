import {
  Articles,
  asAnUser,
  hitButton,
  navigateToArticle,
  setFieldWithReduxForm,
  sleep,
  submitForm,
} from '../helpers'

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
        navigateToArticle(host, article)
        hitButton('button[data-name="add-knowledge-btn"]')
        fillUpKnowledgeProductForm()
        submitForm('form[data-name=form-knowledgeBit]')
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
        navigateToArticle(host, article)
        hitUpvoteButton(article.informations[0])

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
        navigateToArticle(host, article)
        hitDownvoteButton(article.informations[0])

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
        navigateToArticle(host, article)

        // As last test already downvoted clicking again will undo it
        hitDownvoteButton(article.informations[0])
        // Hang a sec to wait ops complete
        sleep(2000)

        const updatedArticle = Articles('findOne', {_id: article._id})

        expect(updatedArticle.informations[0].voters).to.be.an('array')
        expect(updatedArticle.informations[0].voters).to.have.property('length', 0)
      })

      it('user should be able to undo a upvote for a knowledge bit', () => {
        const article = Articles('findOne', {'informations.upVotes': 0})

        asAnUser()
        navigateToArticle(host, article)

        hitUpvoteButton(article.informations[0])
        // Hang a sec to wait ops complete
        sleep(2000)
        // Click again to undo
        hitUpvoteButton(article.informations[0])
        // Hang a sec to wait ops complete
        sleep(2000)

        const updatedArticle = Articles('findOne', {_id: article._id})

        expect(updatedArticle.informations[0].voters).to.be.an('array')
        expect(updatedArticle.informations[0].voters).to.have.property('length', 0)
      })
    })
  })
})

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

function hitUpvoteButton(knowledgeBit){
  hitButton(`[data-name="${knowledgeBit.link}-upvote-btn"]`)
}

function hitDownvoteButton(knowledgeBit){
  hitButton(`[data-name="${knowledgeBit.link}-downvote-btn"]`)
}
