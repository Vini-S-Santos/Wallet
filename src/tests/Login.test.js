import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testando comportamentos da página de Login', () => {
  it('Testa se os elementos do componente Login estão presente: ', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByRole('textbox');
    const password = screen.getByPlaceholderText(/senha/i);
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });
    const { pathname } = history.location;

    const regexEmail1 = /\S+@\S+\.\S+/;
    const emailVerification = regexEmail1.test(email.value);
    expect(emailVerification).toBe(false);

    userEvent.type(email, 'teste@test.com');
    userEvent.type(password, '123456');

    const regexEmail2 = /\S+@\S+\.\S+/;
    const verifiedEmail2 = regexEmail2.test(email.value);

    expect(email).toBeInTheDocument();
    expect(verifiedEmail2).toBe(true);

    expect(password).toBeInTheDocument();
    expect(password.value.length).toBe(6);

    expect(buttonLogin).toBeInTheDocument();
    expect(pathname).toBe('/');

    userEvent.click(buttonLogin);
    await waitFor(() => { expect(history.location.pathname).toBe('/carteira'); });
  });
});
