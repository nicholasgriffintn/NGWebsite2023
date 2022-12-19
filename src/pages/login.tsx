import { useState, useEffect } from 'react';
import { Auth } from '@aws-amplify/auth';

import Metadata from '@src/components/Metadata';
import Wrap from '@src/components/Wrap';
import Title from '@src/components/Title';
import checkLoggedIn from '@src/utils/checkLoggedIn';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState('init');

  const validateForm = () => {
    return email && email.length > 0 && password && password.length > 0;
  };

  const login = async () => {
    if (email && password) {
      try {
        await Auth.signIn(email, password);
      } catch (error) {
        console.error(`Error logging in: ${error}`);
      }
    }
  };

  const logout = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.error(`Error logging in: ${error}`);
    }
  };

  useEffect(() => {
    checkLoggedIn()
      .then((value) => {
        setAlreadyLoggedIn(value);
      })
      .catch((value) => {
        setAlreadyLoggedIn(value);
      });
  }, []);

  return (
    <>
      <Metadata />
      <Wrap>
        <div className="ng-prose ng-text-primary ng-mx-auto">
          {alreadyLoggedIn === 'init' ? (
            <p>Checking your authentication status....</p>
          ) : alreadyLoggedIn === false ? (
            <>
              <Title>Log in with your account</Title>
              <p>Currently, this is really just for me!</p>
              <hr></hr>
              <div className="Login">
                <form>
                  <div>
                    <label>Email</label>
                    <input
                      autoFocus
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Password</label>
                    <input
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <br></br>
                  <div>
                    <button
                      className="button button-prime"
                      disabled={!validateForm()}
                      type="button"
                      onClick={() => login()}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : alreadyLoggedIn === true ? (
            <>
              <strong>You&apos;ve already logged in!</strong>
              <br></br>
              <br></br>
              <br></br>
              <button
                className="button button-prime-inverted"
                onClick={() => logout()}
                type="button"
              >
                Logout?
              </button>
            </>
          ) : null}
        </div>
      </Wrap>
    </>
  );
}
