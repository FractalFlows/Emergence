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
    const tabs = browser.elements('[data-name=dashboard-tabs-list] > div:not(:last-child)')

    expect(tabs.value.length).to.be.equal(2)
  })

  it('should list users and articles', () => {
    const users = browser.elements('[role=listbox] [role=option]:first-child tbody tr')
    const articles = browser.elements('[role=listbox] [role=option]:last-child tbody tr')

    expect(users.value.length && articles.value.length).to.be.ok
  })
})

function hitDashboardButton(){
  browser.waitForVisible('div[data-name=header-dropdown]')
  browser.click('div[data-name=header-dropdown]')
  browser.waitForVisible('a[data-name=dashboard-button]')
  browser.click('a[data-name=dashboard-button]')
}
