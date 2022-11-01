import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchCurrencies from '../redux/api/fetchCurrencies';
import { getExpenses, deleteExpense, saveEdit } from '../redux/actions';

const tagAlimentacao = 'Alimentação';

class FormExpenses extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: tagAlimentacao,
      expenses: {},
    };
  }

  handleSave = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { expensesEvent } = this.props;
    const fetchAPI = await fetchCurrencies();
    const { id, value, description, currency, method, tag } = this.state;
    this.setState({
      expenses: {
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: fetchAPI,
      },
    }, () => {
      const { expenses } = this.state;
      expensesEvent(expenses);
      this.setState((preview) => ({
        id: preview.id + 1,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: tagAlimentacao,
      }));
    });
  };

  saveEdit = async (event) => {
    event.preventDefault();
    const fetchAPI = await fetchCurrencies();
    const { wallet, saveEditDispatch, deleteItemDispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;

    const obj = { expenses: {
      id: wallet.idToEdit,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: fetchAPI,
    },
    editor: false };
    deleteItemDispatch(wallet.idToEdit);
    saveEditDispatch(obj);
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <div>
          <label htmlFor="value-input">
            Valor:
            <input
              type="text"
              data-testid="value-input"
              id="value-input"
              value={ value }
              name="value"
              onChange={ this.handleSave }
            />
          </label>

          <label htmlFor="description-input">
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              id="description-input"
              value={ description }
              name="description"
              onChange={ this.handleSave }
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              data-testid="currency-input"
              id="currency"
              value={ currency }
              name="currency"
              onChange={ this.handleSave }
            >
              {
                currencies.map((coin, index) => (
                  <option key={ index } value={ coin }>{coin}</option>
                ))
              }
            </select>
          </label>

          <label htmlFor="method-pay">
            Forma de Pagamento:
            <select
              data-testid="method-input"
              id="method-pay"
              value={ method }
              name="method"
              onChange={ this.handleSave }
            >
              <option name="dinheiro">Dinheiro</option>
              <option name="credito">Cartão de crédito</option>
              <option name="dedito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag-input">
            Categoria:
            <select
              data-testid="tag-input"
              id="tag-input"
              value={ tag }
              name="tag"
              onChange={ this.handleSave }
            >
              <option name="alimentacao">Alimentação</option>
              <option name="lazer">Lazer</option>
              <option name="trabalho">Trabalho</option>
              <option name="transporte">Transporte</option>
              <option name="saude">Saúde</option>
            </select>
          </label>

          {editor ? (
            <button
              type="button"
              data-testid="btn-edit-expense"
              onClick={ this.saveEdit }
            >
              Editar despesa

            </button>
          ) : (
            <button
              className="buttonsExpense"
              type="button"
              onClick={ this.handleClick }
            >
              Adicionar despesa
            </button>
          )}

        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  expensesEvent: (value) => dispatch(getExpenses(value)),
  saveEditDispatch: (payload) => dispatch(saveEdit(payload)),
  deleteItemDispatch: (payload) => dispatch(deleteExpense(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormExpenses);

FormExpenses.propTypes = {
  currencies: PropTypes.string,
  expensesEvent: PropTypes.func,
}.isRequired;
