import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

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
        <h1>Wallet</h1>
        <h2>
          {`E-mail: ${emailUser}`}
        </h2>
        <h2>{`Despesa total: ${this.handleTotal()} BRL`}</h2>
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
