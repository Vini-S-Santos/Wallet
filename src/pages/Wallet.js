import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currenciesThunk } from '../redux/actions';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  componentDidMount() {
    const { currencies } = this.props;
    currencies();
  }

  render() {
    return (
      <div>
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currencies: (currencies) => dispatch(currenciesThunk(currencies)),
});

export default connect(null, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  currencies: PropTypes.func,
}.isRequired;
