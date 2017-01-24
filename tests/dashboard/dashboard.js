import asAnUser from '../helpers/asAnUser'

const host = 'http://localhost:3000'

describe('Dashboard', () => {
  before(() => {
    server.call('dev/resetDatabase')
    server.call('dev/createUsers')
    browser.url(host)
    asAnUser()
  })

  it('should redirect user to /dashboard via header button', () => {
    hitDashboardButton()

    browser.waitUntil(() => {
      return browser.getUrl() === `${host}/dashboard`
    }, 5000, 'expected user to be redirected')
  })

  it('dashboard page should contain two tabs', () => {

  })

  it('should list users and articles', () => {
    
  })
})

function hitDashboardButton(){
  browser.waitForVisible('div[data-name=header-dropdown]')
  browser.click('div[data-name=header-dropdown]')
  browser.waitForVisible('a[data-name=dashboard-button]')
  browser.click('a[data-name=dashboard-button]')
}
