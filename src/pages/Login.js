import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userLogin } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      invalidInputs: true,
      isRedirect: false,
    };
  }

  verifyInputs = () => {
    const { email, password } = this.state;
    const magicNumber = 6;
    const rgx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
    if (email.match(rgx) && password.length >= magicNumber) {
      this.setState({ invalidInputs: false });
    } else {
      this.setState({ invalidInputs: true });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.verifyInputs);
  };

  handleLogin = () => {
    const { getEmail } = this.props;
    const { email } = this.state;
    this.setState({ isRedirect: true });
    getEmail(email);
  };

  render() {
    const { email, password, invalidInputs, isRedirect } = this.state;
    if (isRedirect) return <Redirect to="/carteira" />;
    return (
      <section>
        <input
          type="text"
          onChange={ this.handleChange }
          name="email"
          placeholder="Email"
          value={ email }
          data-testid="email-input"
        />
        <input
          type="password"
          onChange={ this.handleChange }
          name="password"
          placeholder="senha"
          value={ password }
          data-testid="password-input"
        />
        <button
          type="button"
          onClick={ this.handleLogin }
          disabled={ invalidInputs }
        >
          Entrar
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => dispatch(userLogin(email)),
});

Login.propTypes = {
  getEmail: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
