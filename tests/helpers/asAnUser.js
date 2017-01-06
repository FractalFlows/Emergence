export default function(){
  // Sign in
  browser
    .timeoutsAsyncScript(3000)
    .executeAsync(done => {
      Meteor.loginWithPassword('normal@gmail.com', 'defaultpassword', error => {
        done(error)
      })
    })
}
