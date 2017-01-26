import userIsLoggedIn from './userIsLoggedIn'

export default function(){
  browser.waitUntil(
    userIsLoggedIn,
    5000,
    'expected user to be logged in'
  )
}
