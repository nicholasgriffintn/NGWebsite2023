import React from 'react';

import checkLoggedIn from '@src/utils/checkLoggedIn';
import redirect from '@src/utils/redirect';
import Metadata from '@src/components/Metadata';
import Wrap from '@src/components/Wrap';
import Title from '@src/components/Title';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      twofactor: null,
    };
  }

  componentDidMount() {
    checkLoggedIn()
      .then((loggedIn, user) => {
        if (!loggedIn) {
          redirect({}, '/login');
        } else if (user) {
          this.setState({ user: user });
        } else {
          redirect({}, '/login');
        }
      })
      .catch(() => {
        redirect({}, '/login');
      });
  }

  handleTwoFactorChange(e) {
    this.setState({ twofactor: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const verifyTwoFactorHeaders = new Headers();
    verifyTwoFactorHeaders.append('Authorization', `Bearer ${this.state.user.idToken.jwtToken}`);
    verifyTwoFactorHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      twofactor: this.state.twofactor,
    });

    const requestOptions = {
      method: 'POST',
      headers: verifyTwoFactorHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('/api/admin/verify-two-factor', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        this.setState({ qrcode_secret_url: result.secretURL });
      })
      .catch((error) => console.error('error', error));
  }

  render() {
    return (
      <>
        <Metadata />
        <Wrap>
          <div className="ng-prose ng-text-primary ng-mx-auto">
            <Title>Verify Two Factor Authentication</Title>

            {this.state.user && this.state.user.idToken ? (
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-control">
                  <input
                    type="twofactor"
                    value={this.state.twofactor}
                    placeholder="Two Factor Code"
                    onChange={this.handleTwoFactorChange.bind(this)}
                  />
                </div>
                <div className="form-control">
                  <input type="submit" />
                </div>
              </form>
            ) : (
              <p>Loading data</p>
            )}
          </div>
        </Wrap>
      </>
    );
  }
}
