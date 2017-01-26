import {
  Articles,
  asAnUser,
  hitButton,
  navigateToArticle,
  sleep,
} from '../../helpers'

const host = 'http://localhost:3000'

describe('Articles', () => {
  describe('Summaries', () => {
    describe('Ranking system', () => {
      before(() => {
        server.call('dev/resetDatabase')
        server.call('dev/createArticles')
        browser.url(host)
      })

      it('user should be able to upvote a summary', () => {
        const article = Articles('findOne', {'summaries.upVotes': 0})

        asAnUser()
        navigateToArticle(host, article)
        hitUpvoteButton(article.summaries[0])

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
        navigateToArticle(host, article)
        hitDownvoteButton(article.summaries[0])

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
        navigateToArticle(host, article)

        // As last test already downvoted clicking again will undo it
        hitDownvoteButton(article.summaries[0])
        // Hang a sec to wait ops complete
        sleep(2000)

        const updatedArticle = Articles('findOne', {_id: article._id})

        expect(updatedArticle.summaries[0].voters).to.be.an('array')
        expect(updatedArticle.summaries[0].voters).to.have.property('length', 0)
      })

      it('user should be able to undo a upvote for a summary', () => {
        const article = Articles('findOne', {'summaries.upVotes': 0})

        asAnUser()
        navigateToArticle(host, article)
        hitUpvoteButton(article.summaries[0])
        // Hang a sec to wait ops complete
        sleep(2000)
        // Click again to undo
        hitUpvoteButton(article.summaries[0])
        // Hang a sec to wait ops complete
        sleep(2000)

        const updatedArticle = Articles('findOne', {_id: article._id})

        expect(updatedArticle.summaries[0].voters).to.be.an('array')
        expect(updatedArticle.summaries[0].voters).to.have.property('length', 0)
      })
    })
  })
})

function hitUpvoteButton(summary){
  hitButton(`[data-name="${summary.authorId}-upvote-btn"]`)
}

function hitDownvoteButton(summary){
  hitButton(`[data-name="${summary.authorId}-downvote-btn"]`)
}
