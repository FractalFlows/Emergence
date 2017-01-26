import {
  asAnUser,
  ensureThatUserIsLoggedIn,
  ensureThatUserIsNotLoggedIn,
  hitButton,
  userIsLoggedIn,
} from '../helpers'

const host = 'http://localhost:3000'

describe('Logout', () => {
  before(() => {
    server.call('dev/resetDatabase')
    server.call('dev/createUsers')
    browser.url(host)
  })

  it('user should be able to logout', () => {
    asAnUser()
    ensureThatUserIsLoggedIn()
    hitButton('div[data-name=header-dropdown]')
    hitButton('a[data-name=logout-button]')
    ensureThatUserIsNotLoggedIn()
  })
})
