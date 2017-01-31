import {
  Articles,
  asAnUser,
  fillUpForm,
  hitButton,
  navigateToArticle,
  sleep,
  submitForm,
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

      it('user should be able to add a new summary', () => {
        const article = Articles('findOne', {})

        asAnUser()
        navigateToArticle(host, article)
        hitButton('button[data-name=add-summary-btn]')
        fillUpForm('form[data-name=form-articleSummary]', {
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        })
        submitForm('form[data-name=form-articleSummary]')
        sleep(2000)

        const updatedArticle = Articles('findOne', {_id: article._id})

        expect(updatedArticle.summaries.length).to.equal(1)
      })
    })
  })
})
