import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  handleTotal = () => {
    const { getExpenses } = this.props;
    let total = 0;
    if (getExpenses.length > 0) {
      getExpenses.forEach((item) => {
        const converter = item.exchangeRates[item.currency].ask;
        total += item.value * converter;
      });
    }
    return total.toFixed(2);
  };

  render() {
    const { emailUser, getExpenses } = this.props;
    console.log(getExpenses);
    return (
      <header>
        <div>
          <div data-testid="email-field">
            E-mail:
            { emailUser }
          </div>

          <div>
            Despesa total:
            <div data-testid="total-field">
              { this.handleTotal() }
            </div>
          </div>

          <div data-testid="header-currency-field">BRL</div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  getExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  emailUser: PropTypes.string,
  getExpenses: PropTypes.func,
}.isRequired;
