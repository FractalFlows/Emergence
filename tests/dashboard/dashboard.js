import {
  asAnUser,
  hitButton,
} from '../helpers'

const host = 'http://localhost:3000'

describe('Dashboard', () => {
  before(() => {
    server.call('dev/resetDatabase')
    server.call('dev/createArticles')
    browser.url(host)
    asAnUser()
  })

  it('should redirect user to /dashboard via header button', () => {
    hitButton('div[data-name=header-dropdown]')
    hitButton('a[data-name=dashboard-button]')

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
