import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testes do componente Table', () => {
  it('Verifica o componente Table', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailLogin = screen.getByRole('textbox');
    const password = screen.getByPlaceholderText(/senha/i);
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailLogin, 'teste@teste.com');
    userEvent.type(password, '123456');
    userEvent.click(buttonLogin);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const fieldValue = screen.getByRole('textbox', { name: /valor:/i });
    userEvent.type(fieldValue, '10');

    const currency = screen.getByTestId('currency-input');
    expect(currency).toBeInTheDocument();

    await waitFor(() => { expect(currency).toHaveValue('USD'); });

    userEvent.selectOptions(currency, 'ETH');

    expect(fieldValue).toHaveValue('10');
    const description = screen.getByRole('textbox', { name: /descrição:/i });
    userEvent.type(description, 'teste');

    const buttonAddExpense = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(buttonAddExpense);

    const expenseText = await screen.findByRole('cell', { name: /teste/i });
    expect(expenseText).toHaveTextContent('teste');

    const editButton = await screen.findByRole('button', { name: /editar/i });
    userEvent.click(editButton);

    const editFormButton = screen.getByRole('button', { name: /editar despesa/i });
    expect(editFormButton).toBeInTheDocument();

    userEvent.type(description, 'testeEditado');
    userEvent.click(editFormButton);
    const expenseTestEdited = await screen.findByRole('cell', { name: /testeEditado/i });
    expect(expenseTestEdited).toHaveTextContent('testeEditado');

    const deleteBtn = await screen.findByRole('button', { name: /excluir/i });
    userEvent.click(deleteBtn);

    expect(expenseText).not.toBeInTheDocument();
  });
});
