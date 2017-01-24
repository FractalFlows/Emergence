import asAnUser from '../helpers/asAnUser'

const host = 'http://localhost:3000'

describe('Logout', () => {
  before(() => {
    server.call('dev/resetDatabase')
    server.call('dev/createUsers')
    browser.url(host)
  })

  it('user should be able to logout', () => {
    asAnUser()

    browser.waitUntil(
      userIsLoggedIn,
      5000,
      'expected user to be logged in'
    )

    hitLogoutButton()
    expect(userIsLoggedIn()).to.be.false
  })
})

function hitLogoutButton(){
  browser.waitForVisible('div[data-name=header-dropdown]')
  browser.click('div[data-name=header-dropdown]')
  browser.waitForVisible('a[data-name=logout-button]')
  browser.click('a[data-name=logout-button]')
}

function userIsLoggedIn(){
  const isLoggedIn = browser
    .execute(() => {
      return !!Meteor.user()
    }).value

  return isLoggedIn
}
