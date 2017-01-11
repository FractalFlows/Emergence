import asAnUser from '../helpers/asAnUser'
import Articles from '../helpers/articles'
import sleep from '../helpers/sleep'

const host = 'http://localhost:3000'
describe('Articles', () => {
  describe('Summaries', () => {
    describe('Upsert modal', () => {
      before(() => {
        server.call('dev/resetDatabase')
        server.call('dev/createArticles')
        browser.url(host)
      })

      it('user should be able to add a new summary', () => {
        const article = Articles('findOne', {})

        asAnUser()
        navigateToArticle(article)
        clickOnAddSummary()
        fillUpSummaryForm()

        // Send form
        browser.click('button[type="submit"]')
        sleep(2000)

        const updatedArticle = Articles('findOne', {_id: article._id})

        expect(updatedArticle.summaries.length).to.equal(1)
      })
    })

    describe('Ranking system @watch', () => {
      before(() => {
        server.call('dev/resetDatabase')
        server.call('dev/createArticles')
        browser.url(host)
      })

      it('user should be able to upvote a summary', () => {
        const article = Articles('findOne', {'summaries.upVotes': 0})

        asAnUser()
        navigateToArticle(article)
        clickOnUpvoteBtnFor(article.summaries[0])

        // Hang a sec to wait ops complete
        sleep(2000)

        const updatedArticle = Articles('findOne', {_id: article._id})

        expect(updatedArticle.summaries[0].voters).to.be.an('array')
        expect(updatedArticle.summaries[0].voters).to.have.property('length', 1)
        expect(updatedArticle.summaries[0].voters[0].vote).to.equal(1)
      })

      it('user should be able to downvote a summary', () => {
        const article = Articles('findOne', {'summaries.upVotes': 1})

        asAnUser()
        navigateToArticle(article)
        clickOnDownvoteBtnFor(article.summaries[0])

        // Hang a sec to wait ops complete
        sleep(2000)

        const updatedArticle = Articles('findOne', {_id: article._id})

        expect(updatedArticle.summaries[0].voters).to.be.an('array')
        expect(updatedArticle.summaries[0].voters).to.have.property('length', 1)
        expect(updatedArticle.summaries[0].voters[0].vote).to.equal(-1)
      })

      it('user should be able to undo downvote for a summary', () => {
        const article = Articles('findOne', {'summaries.downVotes': 1})

        asAnUser()
        navigateToArticle(article)

        // As last test already downvoted clicking again will undo it
        clickOnDownvoteBtnFor(article.summaries[0])
        // Hang a sec to wait ops complete
        sleep(2000)

        const updatedArticle = Articles('findOne', {_id: article._id})

        expect(updatedArticle.summaries[0].voters).to.be.an('array')
        expect(updatedArticle.summaries[0].voters).to.have.property('length', 0)
      })

      it('user should be able to undo a upvote for a summary', () => {
        const article = Articles('findOne', {'summaries.upVotes': 0})

        asAnUser()
        navigateToArticle(article)

        clickOnUpvoteBtnFor(article.summaries[0])
        // Hang a sec to wait ops complete
        sleep(2000)
        // Click again to undo
        clickOnUpvoteBtnFor(article.summaries[0])
        // Hang a sec to wait ops complete
        sleep(2000)

        const updatedArticle = Articles('findOne', {_id: article._id})

        expect(updatedArticle.summaries[0].voters).to.be.an('array')
        expect(updatedArticle.summaries[0].voters).to.have.property('length', 0)
      })
    })
  })
})

function navigateToArticle(article){
  browser.url(`${host}/article/${article.slug}`)
}

function clickOnAddSummary(){
  browser.waitForVisible('button[data-name="add-summary-btn"]')
  browser.click('button[data-name="add-summary-btn"]')
}

function fillUpSummaryForm(){
  browser.waitForVisible('[name="content"]')
  browser.setValue('[name="content"]', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
}

function clickOnUpvoteBtnFor(summary){
  browser.waitForVisible(`[data-name="${summary.authorId}-upvote-btn"]`)
  browser.click(`[data-name="${summary.authorId}-upvote-btn"]`)
}

function clickOnDownvoteBtnFor(summary){
  browser.waitForVisible(`[data-name="${summary.authorId}-downvote-btn"]`)
  browser.click(`[data-name="${summary.authorId}-downvote-btn"]`)
}
