import {
} from '../../helpers'

const host = 'http://localhost:3000'

describe('Articles', () => {
  describe('Summaries', () => {
    describe('Upsert modal', () => {
      before(() => {
        server.call('dev/resetDatabase')
        browser.url(host)
      })

      it('should be visible button "create a new summary" when none exists', () => {


      })

      it('should have expandable items', () => {

      })
    })
  })
})
