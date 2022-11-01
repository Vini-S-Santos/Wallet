import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editItem } from '../redux/actions';

class Table extends React.Component {
  editExpense = (id) => {
    const { editFormDispatch } = this.props;
    const obj = { editor: true, id };
    editFormDispatch(obj);
  };

  render() {
    const { expenses, expenseDelete } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        <tbody>
          {
            expenses.map((expense) => {
              const { id,
                value,
                description,
                currency,
                method,
                tag,
                exchangeRates,
              } = expense;
              const converter = (value * exchangeRates[currency].ask).toFixed(2);
              const currencyName = exchangeRates[currency].name.split('/');
              const cambio = exchangeRates[currency].ask;
              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ Number(value).toFixed(2) }</td>
                  <td>{ `${currencyName[0]}/Real Brasileiro` }</td>
                  <td>{ Number(cambio).toFixed(2) }</td>
                  <td>{ converter }</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.editExpense(id) }
                    >
                      Editar
                    </button>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      name="delete-btn"
                      id="delete-btn"
                      onClick={ () => expenseDelete(id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  editFormDispatch: (payload) => dispatch(editItem(payload)),
  expenseDelete: (expenseId) => dispatch(deleteExpense(expenseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.number,
  value: PropTypes.string,
  description: PropTypes.string,
  currency: PropTypes.string,
  method: PropTypes.string,
  tag: PropTypes.string,
  exchangeRates: PropTypes.object,
  expenseDelete: PropTypes.func,
}.isRequired;
