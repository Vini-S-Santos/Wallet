import fetchCurrencies from '../api/fetchCurrencies';
import { USER_LOGIN,
  GET_CURRENCIES,
  GET_EXPENSES,
  DELETE_EXPENSES,
  FETCH_ERROR,
  EDIT_ITEM,
  SAVE_EDIT } from './actionType';

export function userLogin(value) {
  return {
    type: USER_LOGIN,
    value,
  };
}

export function getCurrencies(currencies) {
  return {
    type: GET_CURRENCIES,
    currencies,
  };
}

export function getExpenses(expenses) {
  return {
    type: GET_EXPENSES,
    expenses,
  };
}

export function deleteExpense(expenseId) {
  return {
    type: DELETE_EXPENSES,
    id: expenseId,
  };
}

export function fetchError(error) {
  return {
    type: FETCH_ERROR,
    error,
  };
}

export const editItem = (payload) => ({
  type: EDIT_ITEM,
  payload,
});

export const saveEdit = (payload) => ({
  type: SAVE_EDIT,
  payload,
});

export function currenciesThunk() {
  return async (dispatch) => {
    try {
      const response = await fetchCurrencies();

      dispatch(getCurrencies(response));
    } catch (error) {
      return error;
    }
  };
}
