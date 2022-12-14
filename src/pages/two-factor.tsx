import React from 'react';
import QRCode from 'qrcode.react';

import checkLoggedIn from '@src/utils/checkLoggedIn';
import redirect from '@src/utils/redirect';
import Metadata from '@src/components/Metadata';
import Wrap from '@src/components/Wrap';
import Title from '@src/components/Title';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      title: '',
      description: '',
      tags: '',
      thumbnail: '',
      header: '',
      content: '',
      qrcode_secret_url: null,
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

  generateTwoFactorCode() {
    if (this.state.user && this.state.user.idToken.jwtToken) {
      const grabTwoFactorSecretHeaders = new Headers();
      grabTwoFactorSecretHeaders.append(
        'Authorization',
        `Bearer ${this.state.user.idToken.jwtToken}`
      );
      grabTwoFactorSecretHeaders.append('Content-Type', 'application/json');

      const requestOptions = {
        method: 'POST',
        headers: grabTwoFactorSecretHeaders,
        redirect: 'follow',
      };

      fetch('/api/admin/two-factor', requestOptions)
        .then((response) => response.text())
        .then((result) => {
          result = JSON.parse(result);
          this.setState({ qrcode_secret_url: result.secretURL });
        })
        .catch((error) => console.error('error', error));
    }
  }

  render() {
    return (
      <>
        <Metadata />
        <Wrap>
          <div className="ng-prose ng-text-primary ng-mx-auto">
            <Title>Setup Two Factor Authentication</Title>

            {this.state.user && this.state.user.idToken ? (
              <React.Fragment>
                <button className="btn btn-primary" onClick={() => this.generateTwoFactorCode()}>
                  Generate Code
                </button>
                {this.state.qrcode_secret_url && (
                  <div className="qrcode-wrap">
                    <QRCode value={this.state.qrcode_secret_url} />
                  </div>
                )}
              </React.Fragment>
            ) : (
              <p>Loading data</p>
            )}
          </div>
        </Wrap>
      </>
    );
  }
}
