
import React, { useEffect, useState } from 'react';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';


const sharedStyles = {
  marginTop: '20%',
};

const App = (props) => {

  const { userSession, setUser } = props;

  const [authState, setAuthState] = useState();

  // generate random new user ID as uniqueID before overriding with email
  const newUserId = (Math.floor(Math.random() * 100000000)).toString();


  useEffect(() => onAuthUIStateChange((nextAuthState, authData) => {

    // user has signed in!
    window.scrollTo({ top: 0 });

    setAuthState(nextAuthState);
    setUser(authData);
  }), []);

  return authState === AuthState.SignedIn && userSession ? (

    <>
      <h1>Welcome, {userSession.nameFirst}!</h1>

      <p>Your account is being set up.</p>
    </>

  ) : (

    <>
      <AmplifyAuthenticator usernameAlias="email">
        <AmplifySignUp
          slot="sign-up"
          headerText="Create account"
          // usernameAlias="email"
          style={sharedStyles}
          formFields={[
            {
              type: 'username',
              label: '',
              placeholder: `ID: ${newUserId}`,
              value: newUserId,
              disabled: true,
              inputProps: { required: true },
            },
            {
              type: 'name',
              // label: 'First name *',
              placeholder: 'First name',
              inputProps: { required: true },
              // update the username property based on firstname
              // handleInputChange: (e) => console.log(e.target.value),
            },
            {
              type: 'family_name',
              // label: 'Last name *',
              placeholder: 'Last name',
              inputProps: { required: true },
            },
            {
              type: 'email',
              label: '',
              placeholder: 'Email address',
              inputProps: { required: true },
            },
            {
              type: 'password',
              label: '',
              placeholder: 'Password',
              inputProps: { required: true },
            },
          ]}
        />

        {/* <AmplifyConfirmSignUp
          slot="confirm-sign-up"
          headerText="Confirm sign up"
          // usernameAlias="email"
          formFields={[
            {
              type: 'email',
              label: '',
              placeholder: 'Email address',
              inputProps: { required: true },
            },
            // {
            //   type: 'username',
            //   label: 'ID',
            //   disabled: true,
            //   inputProps: { required: true },
            // },
            {
              type: 'code',
              label: '',
              placeholder: 'Code',
              inputProps: { required: true },
            },
          ]}
        /> */}

        <AmplifySignIn
          slot="sign-in"
          headerText="Sign in"
          usernameAlias="email"
          style={sharedStyles}
          formFields={[
            {
              type: 'email',
              label: '',
              placeholder: 'Email address',
              inputProps: { required: true },
            },
            {
              type: 'password',
              label: '',
              placeholder: 'Password',
              inputProps: { required: true },
            },
          ]}
        />

      </AmplifyAuthenticator>
    </>
  );

};

export default App;
