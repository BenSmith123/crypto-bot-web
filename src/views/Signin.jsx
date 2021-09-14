
import React, { useEffect } from 'react';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn } from '@aws-amplify/ui-react';
import { onAuthUIStateChange } from '@aws-amplify/ui-components';


const App = (props) => {

  // generate random new user ID as uniqueID before overriding with email
  const newUserId = (Math.floor(Math.random() * 100000000)).toString();

  useEffect(() => onAuthUIStateChange((nextAuthState, authData) => {
    props.setUser(authData);
  }), []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <AmplifyAuthenticator usernameAlias="email">
        <AmplifySignUp
          slot="sign-up"
          headerText="Create account"
          // usernameAlias="email"
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
    </div>
  );

};

export default App;
