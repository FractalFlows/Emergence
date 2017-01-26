export default function(){
  const userIsLoggedIn = browser
    .execute(() => {
      return !!Meteor.user()
    }).value

  return userIsLoggedIn
}
