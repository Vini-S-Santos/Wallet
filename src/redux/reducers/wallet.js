import { GET_CURRENCIES,
  GET_EXPENSES,
  DELETE_EXPENSES,
  EDIT_ITEM,
  SAVE_EDIT } from '../actions/actionType';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const magicNumber = -1;

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.currencies)
        .filter((currency) => currency !== 'USDT'),
    };
  case GET_EXPENSES:
    return {
      ...state, expenses: [...state.expenses, action.expenses],
    };
  case DELETE_EXPENSES:
    return {
      ...state, expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case EDIT_ITEM:
    return {
      ...state,
      editor: action.payload.editor,
      idToEdit: action.payload.id,
    };
  case SAVE_EDIT:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.payload.expenses]
        .sort((a, b) => { if (a.id > b.id); return magicNumber; }),
      editor: action.payload.editor,
    };
  default:
    return state;
  }
};

export default wallet;
