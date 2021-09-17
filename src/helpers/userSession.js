
const { Auth } = require('aws-amplify');


// simplify the auth data before storing
function formatUserAuth(userAuth) {

  if (!userAuth) { return null; }

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


/**
 * Get user session from AWS Amplify
 * NOTE - this is only used when site is loaded to check if user is logged in
 *
 * @returns {Promise<Object>}
 */
async function getSessionFromAmplify() {
  try {
    return await Auth.currentAuthenticatedUser();
  } catch (err) {
    return null;
  }
}


export {
  formatUserAuth,
  getSessionFromAmplify,
};
