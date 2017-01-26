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
  describe('Report @watch', () => {
    before(() => {
      server.call('dev/resetDatabase')
      server.call('dev/createArticles')
      browser.url(host)
    })

    it('user should be able to report an article', () => {
      const article = Articles('findOne', {})

      asAnUser()
      navigateToArticle(host, article)
      hitButton('[data-name=report-btn]')
      const formDoc = fillUpReportForm()
      submitForm('[data-name=form-reportArticle]')

      sleep(2000)

      const updatedArticle = Articles('findOne', {})

      expect(updatedArticle).to.have.property('inappropriatedContentReports')
      expect(updatedArticle.inappropriatedContentReports).to.be.an('array')
      expect(updatedArticle.inappropriatedContentReports[0]).to.have.property('message', formDoc.message)
    })
  })
})

function fillUpReportForm(){
  const doc = {
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  }

  setFieldWithReduxForm({
    field: 'message',
    value: doc.message,
    form: 'reportArticle',
  })

  return doc
}
