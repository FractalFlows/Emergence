import userIsLoggedIn from './userIsLoggedIn'

export default function(){
  expect(userIsLoggedIn()).to.be.false
}
