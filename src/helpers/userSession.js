
const { Auth } = require('aws-amplify');


// simplify the auth data before storing
function storeUserAuth(userAuth) {
  return {
    username: userAuth.username,
    email: userAuth.attributes.email,
    email_verified: userAuth.attributes.email_verified,
    nameFirst: userAuth.attributes.name,
    auth: {
      access_token: userAuth.signInUserSession.accessToken.jwtToken,
      // refreshToken: userAuth.signInUserSession.refreshToken.token,
    },
  };
}


async function getUserSession() {

  try {
    return storeUserAuth(await Auth.currentAuthenticatedUser());
  } catch (err) {
    console.log(err); // TODO
    return null;
  }

}


module.exports = {
  getUserSession,
};
