import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testando componente Wallet', () => {
  it('Testa comportamento do Wallet', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailLogin = screen.getByRole('textbox');
    const passLogin = screen.getByPlaceholderText(/senha/i);
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailLogin, 'teste@text.com');
    userEvent.type(passLogin, '123456');
    userEvent.click(buttonLogin);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
    const fieldEmail = screen.getByTestId('email-field');
    const totalExpenses = screen.getByTestId('total-field');
    const realCurrency = screen.getByText(/brl/i);

    const description = screen.getByRole('textbox', { name: /descrição:/i });
    const currencyValue = screen.getByRole('textbox', { name: /valor:/i });
    userEvent.type(currencyValue, '10');
    expect(currencyValue.value).not.toBe('');

    const currency = screen.getByRole('combobox', { name: /moeda:/i });

    const payMethod = screen.getByRole('combobox', { name: /forma de pagamento:/i });

    const categorie = screen.getByRole('combobox', { name: /categoria:/i });

    const descriptionText = screen.getByRole('textbox', { name: /descrição:/i });
    const fieldDescrip = screen.getByRole('textbox', { name: /descrição:/i });
    userEvent.type(fieldDescrip, 'teste');
    expect(fieldDescrip.value).not.toBe('');

    const buttonaddExpense = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(buttonaddExpense);

    expect(fieldEmail).toBeInTheDocument();
    expect(totalExpenses).toBeInTheDocument();
    expect(realCurrency).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currencyValue).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(payMethod).toBeInTheDocument();
    expect(categorie).toBeInTheDocument();
    expect(descriptionText).toBeInTheDocument();
    expect(fieldDescrip).toBeInTheDocument();
    expect(buttonaddExpense).toBeInTheDocument();
  });
});
